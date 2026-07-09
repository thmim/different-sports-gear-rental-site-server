import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { paymentServices } from "./payment.service";

const verifyPayment = catchAsync(async (req:Request, res:Response) => {

    const {orderId,tranId,status} = req.query;
  const payload = req.body;
  const response = await paymentServices.validatePayment(
    orderId as string,
    tranId as string,
    status as string,
    payload,
  );
  
});

export const paymentController = {
    verifyPayment
}