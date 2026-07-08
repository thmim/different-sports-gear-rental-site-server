import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { gearItemsServices } from "./gearItem.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createGearItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const itemsInfo = req.body;
    const id = req.user?.id!;

    const createItem = await gearItemsServices.createGearItemIntoDb(itemsInfo, id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product Created successfully",
        data: { createItem }
    })

})

// update controller

const updateGearItem = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const item_id = req.params.id;
    const payload = req.body;
    const provider_id = req.user?.id;

    if(!item_id){
        throw new Error("item_id is required")
    }

    const result = await gearItemsServices.updateGearItemFromDb(payload,item_id as string,provider_id as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"GearItem updated successfully",
        data:result
    })
})



export const gearItemsController = {
    createGearItem,
    updateGearItem
}