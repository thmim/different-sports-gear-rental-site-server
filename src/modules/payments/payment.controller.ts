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

  if (response === "success") {
    res.redirect("https://linkedin.com");
  } else if (response === "fail") {
    res.redirect("https://www.facebook.com");
  } else if (response === "cancel") res.redirect("https://www.youtube.com");
  
});

export const paymentController = {
    verifyPayment
}