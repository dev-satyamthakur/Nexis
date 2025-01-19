import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db";
import { protect } from "./middleware/authMiddleware";
import { Request, Response } from "express";

// Routes
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import {
  getIdByTitle,
  storeArticleMapping,
} from "./services/articleTitleIdMappingDb";
import { testConnversionFromHTMLString } from "./utils/testing";
import Article from "./models/Article";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

// Test to check the protected route using route
app.get("/api/protected", protect, (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the protected route!",
    user: (req as any).user,
  });
});
// Routes
app.get("/test", async (req, res) => {
  res.json({ message: "It works" });
});

app.post("/test-conversion", async (req, res) => {
  console.log("Test conversion hit", req.body);
  const html_string = req.body.html_string;
  const imageUrl = req.body.imageUrl;
  const articleTitle = req.body.articleTitle;
  const resp = await testConnversionFromHTMLString(
    html_string,
    imageUrl,
    articleTitle
  );
  const articleData = new Article(resp);
  const savedArticle = await articleData.save();

  await storeArticleMapping(
    savedArticle.title,
    (savedArticle._id as any).toString()
  );

  res.status(200).json({ message: "Conversion works", id: savedArticle._id });
});

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/favorite", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
