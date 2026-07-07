import { Request, Response } from "express"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";


const createUser = catchAsync( async(req:Request,res:Response) =>{
const user = req.body;
const result = await userServices.createUserIntoDb(user)

sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User Registered successfully",
    data:{result}
})

})

// get me controller
const getMe = catchAsync(async(req:Request,res:Response)=>{
  const {accessToken} = req.cookies;
  const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret)

  if(typeof verifiedToken === "string"){
    throw new Error(verifiedToken)
  }
  const result = await userServices.getMeFromDb(verifiedToken.id)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Login user retrived successfully",
    data:result
  })
})

export const userController = {
    createUser,
    getMe
}