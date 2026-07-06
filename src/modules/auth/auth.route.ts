import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// login route
router.post("/login",authController.loginUser)

export const authRoute = router;