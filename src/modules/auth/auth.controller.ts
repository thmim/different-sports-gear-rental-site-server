import { catchAsync } from "../../utils/catchasync";
import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
const loginUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body;
    const loginResult = await authServices.loginUserIntoDb(payload);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User logedin Successfully",
        data:loginResult
    })

})

export const authController = {
    loginUser
}