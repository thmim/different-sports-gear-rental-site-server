import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { rentalOrderServices } from "./rentOrder.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createOrder = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const payload = req.body;
const customer_id = req.user?.id;
const customer = req.user;

if (!customer_id || req.user?.role !== 'CUSTOMER') {
    throw new Error("You are not customer")
    }

const {newOrder,paymentUrl} = await rentalOrderServices.createOrderIntoDb(payload,customer as JwtPayload);
sendResponse(res,{
    success:true,
        statusCode:httpStatus.OK,
        message:"Rental Order Created successfully",
        data:{newOrder,paymentUrl}
})
})

// get all rental order for admin
const getAllRentalOrder = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
    const result = await rentalOrderServices.getAllRentalOrderFromDb();
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All Rental Order retrived successfully",
        data:result
    })

})

// get rental order for provider own gear
const getRentalOrder = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const provider_id = req.user?.id;
    const result = await rentalOrderServices.getRentalOrderFromDb(provider_id as string);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Get own gear rental order successfully",
        data:result
    })

})

// get rental details
const getRentalOrderDetails = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const orderId = req.params.id;
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) {
      throw new Error("please login")
    }

    const result = await rentalOrderServices.getAllRentalOrderDetailsFromDb(orderId as string, userId, role as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Get own gear rental order details successfully",
        data:result
    })
});

export const rentalOrderController = {
    createOrder,
    getAllRentalOrder,
    getRentalOrder,
    getRentalOrderDetails
}