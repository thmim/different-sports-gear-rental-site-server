import { prisma } from "../../lib/prisma";
import { Icategories } from "./categories.interface"

const createCategoriesIntoDb = async(payload:Icategories)=>{
   const {category_name,description,image} = payload;
   const isCategoryExist = await prisma.categories.findUnique({
   where:{
    category_name
   }
   })

   if(isCategoryExist){
    throw new Error("Category already exist")
   }

   const createCategory = await prisma.categories.create({
    data:{
        category_name,
        description,
        image
    }
   })
   return createCategory;
}

export const categoriesServices = {
    createCategoriesIntoDb
}