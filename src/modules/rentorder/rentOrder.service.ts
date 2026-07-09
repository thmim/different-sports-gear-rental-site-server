import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";
import { paymentServices } from "../payments/payment.service";
import { ICreateRentalOrderInput } from "./rentOrder.interface"

const createOrderIntoDb = async (payload: ICreateRentalOrderInput, customer: JwtPayload) => {

    const gearItem = await prisma.gearitems.findUniqueOrThrow({
        where: {
            id: payload.gearItem_id,
            is_available: true
        }
    });

    // price and date calculate
    const startDate = new Date(payload.start_date);
    const endDate = new Date(payload.end_date);

    const timeDifference = endDate.getTime() - startDate.getTime();
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (totalDays <= 0) {
        throw new Error("You have to take rent for minimum 1 days!");
    }

    const gearPrice = Number(gearItem.daily_price);
    const calculatedTotalAmount = gearPrice * totalDays;

    const newOrder = await prisma.rentalOrder.create({
        data: {
            gearItem_id: payload.gearItem_id,
            customer_id: customer.id,
            start_date: startDate,
            end_date: endDate,
            total_amount: new Prisma.Decimal(calculatedTotalAmount),
        },
        include: {
            gearItem: true,
            customer: {
                omit: {
                    password: true
                }
            }
        }
    });
    const paymentUrl = await paymentServices.initiatePayment(newOrder,customer)
    return {newOrder,paymentUrl};
}

// get all rentals order for admin
const getAllRentalOrderFromDb = async () => {

    const allRentalOrder = await prisma.rentalOrder.findMany({
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            gearItem: {
                select: {
                    id: true,
                    name: true,
                    daily_price: true,
                },
            },
        },
    });
    return allRentalOrder;
}

// get rental order details
const getAllRentalOrderDetailsFromDb = async (orderId: string, userId: string, role: string) =>{
    const order = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: orderId,
      // সিকিউরিটি চেক: 
      // যদি ইউজার CUSTOMER হয়, তবে চেক করবে customer_id === userId
      // যদি ইউজার PROVIDER হয়, তবে গিয়ারের ভেতরের provider_id === userId হতে হবে
      OR: [
        { customer_id: userId },
        {
          gearItem: {
            provider_id: userId
          }
        }
      ]
    },
    include: {
      gearItem: {
        include: {
          provider: { // প্রোভাইডারের বেসিক তথ্য (পাসওয়ার্ড ছাড়া)
            omit: { password: true }
          }
        }
      },
      customer: { // কাস্টমারের বেসিক তথ্য (পাসওয়ার্ড ছাড়া)
        omit: { password: true }
      }
    }
  
});
return order;
}

// get rental order for user own gear
const getRentalOrderFromDb = async (providerId: string) => {
    const ownOrder = await prisma.rentalOrder.findMany({
        where: {
            gearItem: {
                provider_id: providerId
            }
        },
        include: { 
            gearItem:{
                select: {
                    name: true,
                    daily_price: true,
                    brand:true,
                    description:true
                },
            }
         }
    })
    return ownOrder;


}

export const rentalOrderServices = {
    createOrderIntoDb,
    getAllRentalOrderFromDb,
    getRentalOrderFromDb,
    getAllRentalOrderDetailsFromDb
}