import { User, VerificationRequest } from "../../generated/prisma/client.js";
import { prisma } from "../../configs/prisma.js"
import { addTime } from "../../utils/dateFns.js";
import type{ SignupSchema } from "./auth.types.js";

export const findExistingEmailService = async (email: string): Promise<User | null> => {
    const user = prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export const generateVerificationIdService = async (name: string, email: string, password: string, otp: string): Promise<string > => {
    const verification = await prisma.$transaction(async (tx) => {
        await tx.verificationRequest.deleteMany({
            where: {
                email
            }
        })
        const id = await tx.verificationRequest.create({
            data: {
                name,
                email,
                passwordHash: password,
                otpHash: otp,
                expiresAt: addTime({minutes: 10})
            },
            select: {
                id: true
            }
        })
        return id.id;
    })
    return verification;
}

export const getVerificationDetailService = async (id: string) : Promise<VerificationRequest | null> => {
    const verification = await prisma.verificationRequest.findUnique({
        where: {
            id
        }
    });
    return verification;
}

export const addUserService = async({name, email, password} : SignupSchema) : Promise<void> => {
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    }) 
}

export const deleteVerificationDetailService = async (id: string)  :Promise<void> => {
    await prisma.verificationRequest.delete({
        where: {
            id
        }
    })
}