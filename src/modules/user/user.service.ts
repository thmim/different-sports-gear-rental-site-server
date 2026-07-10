import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

const createUserIntoDb = async (payload: RegisterUserPayload) => {
    const { name, email, password } = payload;
    const isUserExist = await prisma.users.findUniqueOrThrow({
        where: {
            email: email
        }
    })
    // if (isUserExist) {
    //     throw new Error("user already exist for this email")
    // }
    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_round))

    const createUser = await prisma.users.create({
        data: {
            name,
            email,
            password: hashPassword,
            
          
        },
        
        omit: { password: true },

    })
    return createUser;
}

// get all users by admin
const getAllUserFromDb = async ()=>{
   const allUser = await prisma.users.findMany() ;
   return allUser; 

}

// get me service
const getMeFromDb = async(userId:string)=>{
    const user = await prisma.users.findUniqueOrThrow({
        where:{
            id:userId
        },
        omit:{password:true}
    })
    return user;

}

// update user role and status from db through admin
const updateUserFromDb = async(userId:string,payload:any) =>{
  const {status,role} = payload;
  const updateUser = await prisma.users.update({
    where:{
        id:userId
    },
    data:{
       
            role,
            status
        
    },
    omit:{password:true}
  })
  return updateUser;
}

export const userServices = {
    createUserIntoDb,
    getMeFromDb,
    updateUserFromDb,
    getAllUserFromDb
}