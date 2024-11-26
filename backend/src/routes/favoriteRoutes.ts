import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addOrRemoveToFavorites,
  checkIfFavorite,
  getUserFavoriteArticles,
} from "../controllers/favoriteController";

const router = Router();

router.post("/", protect, addOrRemoveToFavorites);
router.get("/", protect, getUserFavoriteArticles);
router.get("/check/:articleId", protect, checkIfFavorite);

export default router;
