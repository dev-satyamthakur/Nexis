import sqlite3 from "sqlite3";

sqlite3.verbose();

class Database {
  private db: sqlite3.Database | null = null;

  connect(): sqlite3.Database {
    if (this.db) {
      return this.db;
    }

    try {
      this.db = new sqlite3.Database("src/sqlite/blog.db", (err) => {
        if (err) {
          console.error("Error opening database:", err);
          throw err; // Propagate the error
        }
        console.log("Connected to SQLite database");
        this.init();
      });

      // Setup error handling for the database connection
      this.db.on("error", (err) => {
        console.error("Database error:", err);
      });

      return this.db;
    } catch (error) {
      console.error("Failed to create database connection:", error);
      throw error;
    }
  }

  private init(): void {
    if (!this.db) return;

    // Use serialize to ensure operations run in sequence
    this.db.serialize(() => {
      const createTable = `
        CREATE TABLE IF NOT EXISTS articles (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL UNIQUE
        )`;

      const createIndex = `
        CREATE INDEX IF NOT EXISTS idx_articles_title 
        ON articles(title)`;

      // Wrap in transaction for atomicity
      if (this.db) {
        this.db.run("BEGIN TRANSACTION");

        try {
          this.db.run(createTable);
          this.db.run(createIndex);
          this.db.run("COMMIT");
        } catch (error) {
          this.db.run("ROLLBACK");
          console.error("Database initialization failed:", error);
        }
      }
    });
  }

  // Helper method to find article by either title or id
  findArticle(searchBy: "title" | "id", value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not connected"));
      }

      const query =
        searchBy === "title"
          ? "SELECT * FROM articles WHERE title = ?"
          : "SELECT * FROM articles WHERE id = ?";

      this.db.get(query, [value], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  addArticle(
    title: string,
    id: string
  ): Promise<{ title: string; id: string }> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error("Database not connected"));
      }

      this.db.run(
        "INSERT INTO articles (title, id) VALUES (?, ?)",
        [title, id],
        function (err) {
          if (err) {
            // Cast err to any to access SQLite specific error properties
            const sqliteError = err as any;
            if (sqliteError.errno === 19) {
              // SQLITE_CONSTRAINT error code
              reject(new Error("Title or ID already exists"));
            } else {
              reject(err);
            }
            return;
          }
          resolve({ title, id });
        }
      );
    });
  }
}

const database = new Database();
export default database;
