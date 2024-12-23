import database from "../sqlite/database";

database.connect();

export async function storeArticleMapping(title: string, id: string) {
  try {
    await database.addArticle(title, id);
    console.log(`Mapped title "${title}" to ID "${id}"`);
  } catch (error) {
    console.error("Failed to store mapping:", error);
  }
}

export async function getIdByTitle(title: string) {
  try {
    const article = await database.findArticle("title", title);
    if (article) {
      return article.id;
    }
    return null;
  } catch (error) {
    console.error("Failed to find article:", error);
    return null;
  }
}

export async function getTitleById(id: string) {
  try {
    const article = await database.findArticle("id", id);
    if (article) {
      return article.title;
    }
    return null;
  } catch (error) {
    console.error("Failed to find article:", error);
    return null;
  }
}
