import { Router } from "express";
import { authUser } from "../controllers/authController";
import { refreshToken } from "../controllers/authController";

const router = Router();

router.post("/", authUser);
router.post("/refresh", refreshToken);

export default router;
