import { Router } from "express";
import { gearItemsController } from "./gearItem.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// item create api
router.post("/gear",auth(Role.PROVIDER),gearItemsController.createGearItem);

export const gearItemRoute = router;