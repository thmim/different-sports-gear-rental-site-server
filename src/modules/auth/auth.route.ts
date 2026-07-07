import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// login route
router.post("/login",authController.loginUser);
// token regenerate route
router.post("/refresh-token",authController.createRefreshToken)

export const authRoute = router;