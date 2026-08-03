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

// get all payment confirmed gear rental for customer
router.get("/confirmed/rental",auth(Role.CUSTOMER),rentalOrderController.getConfirmedRentalOrder);

// provider and customer can see rental order details
router.get("/:id",auth(Role.CUSTOMER,Role.PROVIDER) ,rentalOrderController.getRentalOrderDetails);

// update rental order status through provider
router.patch("/:id", auth(Role.PROVIDER),rentalOrderController.updateRentalOrderstatus);

export const rentalOrderRoute = router;