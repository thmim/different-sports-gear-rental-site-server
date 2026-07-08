import { Router } from "express";
import { categoriesController } from "./categories.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// create category route
router.post("/categories",auth(Role.ADMIN),categoriesController.createCategories);

// get all category
router.get("/categories",categoriesController.getAllCategories);

export const categoriesRoute = router;