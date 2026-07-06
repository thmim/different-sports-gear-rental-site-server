import { Request, Response } from "express";
import { IloginUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

const loginUserIntoDb = async (payload:IloginUser) =>{
  const {email,password} = payload;
  const findUser = await prisma.users.findUniqueOrThrow({
    where:{
        email
    },
    
  })

  const matchPassword = await bcrypt.compare(password,findUser.password);
  if(!matchPassword){
        throw new Error("Password is incorrect");
    }

    return findUser;
}

export const authServices = {
    loginUserIntoDb
}