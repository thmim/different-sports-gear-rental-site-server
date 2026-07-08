import { prisma } from "../../lib/prisma";
import { IGearFilterQuery, IGearItems, IUpdateItems } from "./gearItem.interface"

const createGearItemIntoDb = async (payload:IGearItems,id:string)=>{
   const {name,description,category_id,brand,daily_price,quantity,product_image = "Not provided",condition} = payload;
   const provider_id = id;
   

   const isCategoryExist = await prisma.categories.findUniqueOrThrow({
    where:{
        id:category_id
    }
   })

   const createGearItem = await prisma.gearitems.create({
    data:{
        name,
        description,
        category_id,
        provider_id,
        product_image,
        brand,
        condition:condition,
        daily_price:daily_price ,
        quantity
    }
   })

   return createGearItem;
   
}

// get all gear item by admin
const getAllGearFromDb = async ()=>{
   const allGear = await prisma.gearitems.findMany() ;
   return allGear; 

}

// get gear details by id
const getGearDetailsFromDb = async (gearId:string)=>{
   const singleGearDetails = await prisma.gearitems.findUniqueOrThrow({
    where:{
        id:gearId
    }
   })
   return singleGearDetails;
}

// get all gear for everyone
const getGearForAllFromDb = async (query:IGearFilterQuery)=>{
  const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "created_at";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

    // get gear 
    const gears = await prisma.gearitems.findMany({
        where: {
            // filtering & searching combined using AND/OR
            AND: [
                {
                    is_available: true 
                },
                {
                    // searching
                    OR: [
                        {
                            name: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                        },
                        {
                            description: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                        }
                    ]
                },

                // filtering
                query.category ? { category_id: query.category } : {},
                query.brand ? { brand: { equals: query.brand, mode: "insensitive" } } : {},
                query.minPrice ? { daily_price: { gte: Number(query.minPrice) } } : {},
                query.maxPrice ? { daily_price: { lte: Number(query.maxPrice) } } : {}
            ]
        },

        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            category: true
        }
    });
    return gears;
}

// update item
const updateGearItemFromDb = async (payload:IUpdateItems,item_id:string,provider_id:string)=>{
      const item = await prisma.gearitems.findUniqueOrThrow({
        where: {
            id: item_id
        }
    })
    if ( provider_id !== item.provider_id) {
        throw new Error("you are not the owner of this item")
    }
    const result = await prisma.gearitems.update({
        where: {
            id: item_id
        },
        data: payload,
        include: {
            provider: {
                omit: {
                    password: true
                }
            },
            
        }
        
    })
    return result;

}

// delete gear item
const deleteGearItemFromDb = async (itemId:string,providerId:string,isAdmin:boolean)=>{
    const item = await prisma.gearitems.findUniqueOrThrow({
        where:{
            id:itemId
        }
    })

    if(!isAdmin && providerId !== item.provider_id){
        throw new Error("You don't have access to delete this item")
    }

    await prisma.gearitems.delete({
        where:{
            id:itemId
        }
    })
     
}

export const gearItemsServices = {
    createGearItemIntoDb,
    updateGearItemFromDb,
    deleteGearItemFromDb,
    getAllGearFromDb,
    getGearDetailsFromDb,
    getGearForAllFromDb
}