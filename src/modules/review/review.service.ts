
import { prisma } from "../../lib/prisma"
import { ICreateReviewsInput } from "./review.interface";

const createReviewIntoDb = async (payload: ICreateReviewsInput, customerId: string) => {
    const { rentalOrder_id, comment, rating } = payload;

    const findRental = await prisma.rentalOrder.findUniqueOrThrow({
        where: { id: rentalOrder_id }
    });


    if (customerId !== findRental.customer_id) {
        throw new Error("You can only review your own rental gear!");
    }

    if (findRental.status !== "RETURNED") {
        throw new Error("You can only provide a review after returning the gear!");
    }


    const createReview = await prisma.reviews.create({
        data: {
            item_id: findRental.gearItem_id,
            rating: rating,
            comment: comment,
            customer_id: customerId
        },
        include: {
            customer: {
                select: {
                    name: true,
                    email: true
                }
            },
            gearItem: {

                select: {
                    name: true,
                    brand: true,
                    condition: true,
                    daily_price: true,
                    category: {
                        select: {
                            category_name: true
                        }
                    }
                }
            }
        }
    });

    return createReview;
};

export const reviewServices = {
    createReviewIntoDb
}