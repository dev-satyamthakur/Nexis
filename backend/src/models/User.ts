import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  favoriteArticles: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteArticles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
