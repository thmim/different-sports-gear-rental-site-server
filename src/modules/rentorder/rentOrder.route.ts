import { Router } from "express";
import { rentalOrderController } from "./rentOrder.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/rentals", auth(Role.CUSTOMER) ,rentalOrderController.createOrder);

export const rentalOrderRoute = router;