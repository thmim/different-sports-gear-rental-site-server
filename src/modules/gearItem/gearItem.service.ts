import { prisma } from "../../lib/prisma";
import { IGearItems } from "./gearItem.interface"

const createGearItemIntoDb = async (payload:IGearItems,id:string)=>{
   const {name,description,category_id,brand,daily_price,quantity} = payload;
   const provider_id = id;
   console.log(provider_id)

//    const isCategoryExist = await prisma.categories.findUniqueOrThrow({
//     where:{
//         id:category_id
//     }
//    })

   const createGearItem = await prisma.gearitems.create({
    data:{
        name,
        description,
        category_id,
        provider_id,
        brand,
        daily_price:daily_price ,
        quantity
    }
   })

   return createGearItem;
   
}

export const gearItemsServices = {
    createGearItemIntoDb
}