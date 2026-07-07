import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { gearItemsServices } from "./gearItem.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createGearItem = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const itemsInfo = req.body;
    const id = req.user?.id!;
    console.log(id)
    const createItem = await gearItemsServices.createGearItemIntoDb(itemsInfo,id);

    sendResponse(res,{
        success:true,
    statusCode:httpStatus.CREATED,
    message:"User Registered successfully",
    data:{createItem}
    })

})

export const gearItemsController = {
    createGearItem
}