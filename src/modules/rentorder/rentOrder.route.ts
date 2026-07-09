import { Router } from "express";
import { rentalOrderController } from "./rentOrder.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/rentals", auth(Role.CUSTOMER) ,rentalOrderController.createOrder);

// get all rental orders for admin
router.get("/order",auth(Role.ADMIN),rentalOrderController.getAllRentalOrder);
// for provider own gear order
router.get("/own/orders",auth(Role.PROVIDER),rentalOrderController.getRentalOrder);

export const rentalOrderRoute = router;