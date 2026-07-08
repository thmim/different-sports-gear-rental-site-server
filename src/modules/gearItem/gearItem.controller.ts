import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { gearItemsServices } from "./gearItem.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createGearItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const itemsInfo = req.body;
    const id = req.user?.id!;

    const createItem = await gearItemsServices.createGearItemIntoDb(itemsInfo, id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product Created successfully",
        data: { createItem }
    })

})

// get all gear by admin
const getAllGearItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await gearItemsServices.getAllGearFromDb();
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Gear Item retrived successfully",
        data:result
    })

})

// get all gear for everyone
const getAllGearItemForAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
  const result = await gearItemsServices.getGearForAllFromDb(query);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Gear Item retrived successfully",
        data:result
    })

})

// get gear details by id
const getGearDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  const result = await gearItemsServices.getGearDetailsFromDb(id as string);

  sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Gear details retrived successfully",
        data:result
    })

})

// update controller
const updateGearItem = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const item_id = req.params.id;
    const payload = req.body;
    const provider_id = req.user?.id;

    if(!item_id){
        throw new Error("item_id is required")
    }

    const result = await gearItemsServices.updateGearItemFromDb(payload,item_id as string,provider_id as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"GearItem updated successfully",
        data:result
    })
})

// delete item 
const deleteGearItem = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const item_id = req.params.id;
    const provider_id = req.user?.id;
   const isAdmin = req.user?.role === "ADMIN";

//    j gear rent deya hoye gece oita delete kora jabe na aita iplement korte hobe must pore

   await gearItemsServices.deleteGearItemFromDb(item_id as string,provider_id as string,isAdmin);

   sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear Item deleted successfully",
        data: null
    })

})



export const gearItemsController = {
    createGearItem,
    updateGearItem,
    deleteGearItem,
    getAllGearItem,
    getGearDetails,
    getAllGearItemForAll
}