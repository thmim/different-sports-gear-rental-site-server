import { Prisma } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";
import { ICreateRentalOrderInput } from "./rentOrder.interface"

const createOrderIntoDb = async (payload: ICreateRentalOrderInput, customerId: string) => {

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
            customer_id: customerId,
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
    return newOrder;
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
    getRentalOrderFromDb
}