import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  picture: string;
  subId: string;
  favoriteArticles: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: true,
  },
  subId: {
    type: String,
    required: true,
  },
  favoriteArticles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;

//6744dc8456da53f76ff6f634
