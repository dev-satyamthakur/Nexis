import { Request, Response } from "express";
import User from "../models/User";
import Article from "../models/Article";

// (req as any).user has been set by the protect middleware that verifies the JWT Token

// @desc Get all the articles that user has marked as favorite
// @route GET /api/favorite
export const getUserFavoriteArticles = async (req: Request, res: Response) => {
  const { userId } = (req as any).user;

  try {
    const user = await User.findById(userId).populate("favoriteArticles"); // Populate the favoriteArticles field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated favorite articles
    res.status(200).json({ favoriteArticles: user.favoriteArticles });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Adds a particular article to the favoriteArticles list of the user, userId comes from JWT token
// @route POST /api/favorite
export const addOrRemoveToFavorites = async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { articleId } = req.body;

  try {
    const user = await User.findById(userId);
    const article = await Article.findById(articleId);

    if (!user || !article) {
      return res.status(404).json({ message: "User or Article not found" });
    }

    // Check if article is already in favorites
    const articleIndex = user.favoriteArticles.indexOf(articleId);
    if (articleIndex === -1) {
      // Add to favorites if not present
      user.favoriteArticles.push(articleId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Article added to favorites", isLiked: true });
    } else {
      // Remove from favorites if present
      user.favoriteArticles.splice(articleIndex, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Article removed from favorites", isLiked: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Check if an article is in user's favorites
// @route GET /api/favorite/check/:articleId
export const checkIfFavorite = async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { articleId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert string articleId to ObjectId before checking
    const isFavorite = user.favoriteArticles.some(
      (id) => id.toString() === articleId
    );
    return res.status(200).json({ isFavorite });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
