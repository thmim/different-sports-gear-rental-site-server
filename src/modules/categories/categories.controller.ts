import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { categoriesServices } from "./categories.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategories = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const categoryInfo = req.body;
    const result = await categoriesServices.createCategoriesIntoDb(categoryInfo)

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User Registered successfully",
    data:{result}
})

})

export const categoriesController = {
    createCategories
}