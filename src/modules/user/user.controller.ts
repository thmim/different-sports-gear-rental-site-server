import { Request, Response } from "express"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

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

export const userController = {
    createUser
}