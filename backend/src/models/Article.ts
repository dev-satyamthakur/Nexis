import mongoose, { Document, Schema } from "mongoose";

// Section interface
type IArticleSection = {
  id: string;
  heading: string;
  body: string;
};

// Article interface
export interface IArticle extends Document {
  title: string;
  body: IArticleSection[];
  imageUrl: string;
  author: number;
  postDate: number;
  readTime: number; // in mins
  topics: string[];
}

// Section schema
const articleSectionSchema = new Schema<IArticleSection>({
  id: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// Article schema
const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: [articleSectionSchema], // Use the section schema for the array
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
