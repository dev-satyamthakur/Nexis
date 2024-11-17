import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, comparePassword } from "../services/authService";
import User from "../models/User";

// Register User
// export const registerUser = async (req: Request, res: Response) => {
//   const { username, email, password, name } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     user = await createUser(username, email, password, name);
//     if (!user) {
//       return res.status(500).json({ message: "User creation failed" });
//     }

//     const payload = { userId: user._id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
