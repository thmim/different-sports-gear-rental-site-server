import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { rentalOrderServices } from "./rentOrder.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createOrder = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const payload = req.body;
const customer_id = req.user?.id;

if (!customer_id || req.user?.role !== 'CUSTOMER') {
    throw new Error("You are not customer")
    }

const result = await rentalOrderServices.createOrderIntoDb(payload,customer_id as string);
sendResponse(res,{
    success:true,
        statusCode:httpStatus.OK,
        message:"Rental Order Created successfully",
        data:result
})
})

export const rentalOrderController = {
    createOrder
}