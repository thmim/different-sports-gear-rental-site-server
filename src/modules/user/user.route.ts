import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// register api
router.post("/register",userController.createUser);
// get me
router.get("/me",auth(Role.ADMIN,Role.PROVIDER,Role.CUSTOMER),userController.getMe);

export const userRouter = router;