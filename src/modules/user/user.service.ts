import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";

const createUserIntoDb = async (payload: RegisterUserPayload) => {
    const { name, email, password } = payload;
    const isUserExist = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (isUserExist) {
        throw new Error("user already exist for this email")
    }
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

export const userServices = {
    createUserIntoDb
}