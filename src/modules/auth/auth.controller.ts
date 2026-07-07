import { catchAsync } from "../../utils/catchasync";
import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
const loginUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const payload = req.body;
    const {accessToken,refreshToken} = await authServices.loginUserIntoDb(payload);

//    set access token
    res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:false,
    sameSite:"none",
    maxAge:1000*60*60*24
   })
//   set refresh token
   res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"none",
    maxAge:1000*60*60*24*7
   });
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: {accessToken,refreshToken}
    })

})

export const authController = {
    loginUser
}