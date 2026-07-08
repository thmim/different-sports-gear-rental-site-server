import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";


const createUser = catchAsync( async(req:Request,res:Response,next:NextFunction) =>{
const user = req.body;
const result = await userServices.createUserIntoDb(user)

sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User Registered successfully",
    data:{result}
})

})

// get all user by admin
const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await userServices.getAllUserFromDb();
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All User retrived successfully",
        data:result
    })

})

// get me controller
const getMe = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  
  const result = await userServices.getMeFromDb(req.user?.id as string)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Login user retrived successfully",
    data:result
  })
})

// update user controller
const updateUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const id = req.params.id;
  
  const payload = req.body;
  const result = await userServices.updateUserFromDb(id as string,payload);

  sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User Updated successfully",
        data:result
    })
})


export const userController = {
    createUser,
    getMe,
    updateUser,
    getAllUser
}