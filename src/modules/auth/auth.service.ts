import { Request, Response } from "express";
import { IloginUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
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

//regenerate refresh token after expire
const regenerateRefreshToken = async (refreshToken:string)=>{
    const verifyRefreshToken = jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret)

    if(!verifyRefreshToken.success === true){
        throw new Error(verifyRefreshToken.error)
    }
    

    const {id} = verifyRefreshToken.data as JwtPayload;

    const user = await prisma.users.findUniqueOrThrow({
        where:{
            id
        }
    })

    if(user.status === "SUSPEND"){
        throw new Error("User is Suspend!")
    }

    const jwtPayload = {
        id,
        email:user.email,
        name:user.name,
        role:user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires as SignOptions)

    return accessToken;

}

export const authServices = {
    loginUserIntoDb,
    regenerateRefreshToken
}