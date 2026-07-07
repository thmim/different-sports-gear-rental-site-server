import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// register api
router.post("/register",userController.createUser);
// get me
router.get("/me",userController.getMe);

export const userRouter = router;