import { Router } from "express";
import {
  getArticles,
  getRelatedArticles,
  postArticle,
  getArticleById,
} from "../controllers/articleController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Protected route to get articles
router.get("/", getArticles);
router.post("/", postArticle);
router.get("/related/:articleId", getRelatedArticles);
router.get("/:articleId", getArticleById);

export default router;
