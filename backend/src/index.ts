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
import {
  getIdByTitle,
  storeArticleMapping,
} from "./services/articleTitleIdMappingDb";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

// Test to check the protected route using route
app.get("/api/protected", protect, (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the protected route!",
    user: (req as any).user,
  });
});
// Routes
app.use("/test", async (req, res) => {
  res.json({ message: "It works" });
});
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/favorite", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
