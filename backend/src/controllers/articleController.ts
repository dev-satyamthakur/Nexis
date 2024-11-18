import { Request, Response } from "express";
import Article from "../models/Article";

// @desc   Get all articles (only accessible to logged-in users)
// @route  GET /api/articles
// @access Private
export const getArticles = async (req: Request, res: Response) => {
  try {
    const currentEpochTime = Math.floor(Date.now());
    const articles = await Article.find({
      postDate: { $lte: currentEpochTime },
    })
      .sort({ postDate: -1 }) // Sort by postDate descending
      .limit(3); // Limit to 5 articles

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create a new article
// @route POST /api/articles
export const postArticle = async (req: Request, res: Response) => {
  try {
    const { title, body, imageUrl, author, postDate, readTime, topics } =
      req.body;
    const articleRespose = await Article.create({
      title: title,
      body: body,
      imageUrl: imageUrl,
      author: author,
      postDate: postDate,
      readTime: readTime,
      topics: topics,
    });

    res
      .status(201)
      .json({ message: "Article Created", id: articleRespose._id });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get related articles
// @route GET /api/articles/related/:articleId
export const getRelatedArticles = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  try {
    // Find the article by its ID
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Get the topics of the current article
    const { topics } = article;

    // Find other articles that share at least one topic with the current article
    const relatedArticles = await Article.find({
      // _id: { $ne: articleId }, // Exclude the current article
      // topics: { $in: topics }, // Match articles that have at least one topic in the topics array
    });

    res.status(200).json({ relatedArticles });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get a single article by ID
// @route GET /api/articles/:articleId
export const getArticleById = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  try {
    // Find the article by its ID
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Delete an article by ID
// @route DELETE /api/articles/:articleId
export const deleteArticle = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  try {
    // Attempt to delete the article by its ID
    const deletedArticle = await Article.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ success: true, message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
