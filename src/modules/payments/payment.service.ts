import axios from "axios";
import { RentalOrder, Users } from "../../../generated/prisma/browser";
import config from "../../config"
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";


const initiatePayment = async (order: RentalOrder, user: JwtPayload) => {
    const tranId = `TRNX_ID_${Date.now()}`;
    const paymentData = {
        store_id: config.sslc_stored_id,
        store_passwd: config.sslc_stored_password,
        total_amount: order.total_amount,
        currency: "BDT",
        tran_id: tranId,
        success_url: `${config.app_url}/api/payment?orderId=${order.id}&tranId=${tranId}&status=success`,
        fail_url: `${config.app_url}/api/payment?orderId=${order.id}&tranId=${tranId}&status=fail`,
        cancel_url: `${config.app_url}/api/payment?orderId=${order.id}&tranId=${tranId}&status=cancel`,
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",

    }

    const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
    );
    const data = await response.data;
    const paid_at = data.validated_on;
    await prisma.payments.create({
    data: {
      transaction_id:tranId,
      rentalOrder_id: order.id,
      customer_id: order.customer_id,
      amount: order.total_amount,
      currency:data.currency,
      paid_at:paid_at
    },
  });
   
    const GatewayPageURL = data.GatewayPageURL;

    return GatewayPageURL;
};

const validatePayment = async (
  orderId: string,
  tranId: string,
  status: string,
  payload: Record<string, unknown>,
) => {
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config.sslc_stored_id}&store_passwd=${config.sslc_stored_password}&format=json`,

    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  console.log("response theke",response)
  const data = response.data;
  if (data.status === "VALID") {
    await prisma.rentalOrder.update({
      where: { id: orderId },
      data: {
        status: "ACTIVE",
      },
    });
    // decrese quantity after rent
    await prisma.payments.update({
      where: { transaction_id:tranId },
      data: {
        status: "COMPLETED",
        
      },
    });
}
}

export const paymentServices = {
    initiatePayment,
    validatePayment
}