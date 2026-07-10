import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { reviewServices } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createReview = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const reviewData = req.body;
    const customer_id = req.user?.id;
    const result = await reviewServices.createReviewIntoDb(reviewData,customer_id as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Review sent successfully",
        data:result
    })

})

export const reviewController = {
    createReview
}