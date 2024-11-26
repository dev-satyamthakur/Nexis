import { Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import User from "../models/User";

// Login User path : /api/auth
export const authUser = async (req: Request, res: Response) => {
  const { name, email, picture, sub } = req.body;

  try {
    const user = await User.findOne({ email });
    let userId = "";
    if (!user) {
      // Create a new user if one does not exist
      console.log("User not found");
      const newUser = await User.create({
        name: name,
        email: email,
        picture: picture,
        subId: sub,
      });

      console.log(newUser);
      (userId as any) = newUser._id;

      console.log(newUser);
    } else {
      console.log("User found");
      (userId as any) = user._id;
    }

    const payload = { userId: userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Generate a refresh token
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, refreshToken });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Refresh Token path : /api/auth/refresh
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  try {
    // Verify the refresh token
    const userId = verifyRefreshToken(refreshToken);

    const payload = { userId: userId };
    const newToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Generate a new refresh token
    const newRefreshToken = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).send("Forbidden"); // Invalid refresh token
  }
};

const verifyRefreshToken = (token: string) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    return (decoded as any).userId;
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};
