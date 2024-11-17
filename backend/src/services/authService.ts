import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  name: string
): Promise<IUser> => {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    name: name,
  });
  return newUser.save();
};
