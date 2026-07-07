import { Request, Response } from "express";
import { IloginUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

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

    const jwtPayload = {
        id:findUser.id,
        name:findUser.name,
        email,
        role:findUser.role
    }

    const accessToken = jwtUtils. createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires as SignOptions
    )

    const refreshToken = jwtUtils. createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires as SignOptions
    );

    return {accessToken,refreshToken}
}

export const authServices = {
    loginUserIntoDb
}