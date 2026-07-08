import { Router } from "express";
import { gearItemsController } from "./gearItem.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// item create api
router.post("/gear",auth(Role.PROVIDER),gearItemsController.createGearItem);
// item update api
router.put("/:id", auth(Role.PROVIDER) ,gearItemsController.updateGearItem);
router.delete("/:id", auth(Role.PROVIDER,Role.ADMIN) ,gearItemsController.deleteGearItem);

export const gearItemRoute = router;