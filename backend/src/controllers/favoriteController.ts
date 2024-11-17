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
export const addToFavorites = async (req: Request, res: Response) => {
  const { userId } = (req as any).user;
  const { articleId } = req.body;

  try {
    const user = await User.findById(userId);
    const article = await Article.findById(articleId);

    if (!user || !article) {
      return res.status(404).json({ message: "User or Article not found" });
    }

    // Check if article is not already in favorites
    if (!user.favoriteArticles.includes(articleId)) {
      user.favoriteArticles.push(articleId);
      await user.save();
      return res.status(200).json({ message: "Article added to favorites" });
    } else {
      return res.status(400).json({ message: "Article already in favorites" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
