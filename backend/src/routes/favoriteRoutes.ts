import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addToFavorites,
  getUserFavoriteArticles,
} from "../controllers/favoriteController";

const router = Router();

router.post("/", protect, addToFavorites);
router.get("/", protect, getUserFavoriteArticles);

export default router;
