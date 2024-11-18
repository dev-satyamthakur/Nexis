import mongoose, { Document, Schema } from "mongoose";
import sanitizeHtml from "sanitize-html";

// Section interface
type IArticleSection = {
  id: string;
  heading: string;
  body: string; // This will now contain HTML with images, headings, etc.
};

// Article interface
export interface IArticle extends Document {
  title: string;
  body: IArticleSection[];
  imageUrl: string;
  author: number;
  postDate: number;
  readTime: number;
  topics: string[];
}

// Sanitization options - allowing rich HTML content
const sanitizeOptions = {
  allowedTags: [
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "img",
    "figure",
    "figcaption",
    "strong",
    "em",
    "blockquote",
  ],
  allowedAttributes: {
    img: ["src", "alt", "width", "height", "class"],
    figure: ["class"],
    figcaption: ["class"],
    "*": ["class"], // Allow classes on all elements for styling
  },
  allowedSchemes: ["http", "https"],
  allowedSchemesAppliedToAttributes: ["src"],
};

// Section schema with enhanced sanitization
const articleSectionSchema = new Schema<IArticleSection>({
  id: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    set: (content: string) => sanitizeHtml(content, sanitizeOptions),
  },
});

const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: [articleSectionSchema],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: Number,
    required: true,
  },
  postDate: {
    type: Number,
    required: true,
  },
  readTime: {
    type: Number,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
});

const Article = mongoose.model<IArticle>("Article", articleSchema);
export default Article;
