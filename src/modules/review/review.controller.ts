import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";

const createReview = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

export const reviewController = {
    createReview
}