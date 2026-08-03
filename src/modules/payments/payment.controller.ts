import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { paymentServices } from "./payment.service";
import config from "../../config";

const verifyPayment = catchAsync(async (req:Request, res:Response) => {

    const {orderId,tranId,status} = req.query;
  const payload = req.body;
  const response = await paymentServices.validatePayment(
    orderId as string,
    tranId as string,
    status as string,
    payload,
  );
// console.log(response,"paycontres")
// console.log(response === "success","paycontres")
// console.log((response as { success: boolean; message: string }).success,"paycontres")
  if ((response as { success: boolean; message: string }).success) {
    res.redirect("http://localhost:3000/customer-dashboard/rentals");
  } else if (!(response as { success: boolean; message: string }).success) {
    res.redirect("http://localhost:3000/customer-dashboard");
  } else{res.redirect("http://localhost:3000/customer-dashboard")};
  
});

export const paymentController = {
    verifyPayment
}