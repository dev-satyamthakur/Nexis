import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db";
import { protect } from "./middleware/authMiddleware";
import { Request, Response } from "express";

// Routes
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Test to check the protected route using route
app.get("/api/protected", protect, (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the protected route!",
    user: (req as any).user,
  });
});
// Routes
app.use("/test", (req, res) => {
  res.json({ message: "It works" });
});
app.use("/api/test", (req, res) => {
  res.json({ message: "It works" });
});
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/favorite", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
