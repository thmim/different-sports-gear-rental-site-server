import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";

const createOrder = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

export const rentalOrderController = {
    createOrder
}