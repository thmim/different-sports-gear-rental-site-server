import { Router } from "express";
import { reviewController } from "./review.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/reviews", auth(Role.CUSTOMER), reviewController.createReview);

export const reviewRoute = router;