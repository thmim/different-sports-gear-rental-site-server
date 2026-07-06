import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// register api
router.post("/register",userController.createUser)

export const userRouter = router;