import { User, VerificationRequest } from "../../generated/prisma/client.js";
import { prisma } from "../../configs/prisma.js"
import { addTime } from "../../utils/dateFns.js";
import type { SignupSchema } from "zs-phone-common";
import { compareHash } from "../../utils/bcrypt.js";
import { AppError } from "../../utils/appError.js";

export const findExistingEmailService = async (email: string): Promise<User | null> => {
    const user = prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export const addUserService = async ({ name, email, password }: SignupSchema): Promise<void> => {
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}

export const resetPasswordService = async (password: string, verificationid: string): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        const emailToUpdate = await tx.verificationRequest.findUnique({
            where: {
                id: verificationid
            }
        });
        await tx.user.update({
            where: {
                email: emailToUpdate?.email
            },
            data: {
                password
            }
        })
    })
}

export const verifyOtpService = async (otp: string, verificationId: string): Promise<VerificationRequest> => {
    const verificationRequest = await getVerificationDetailService(verificationId);

    if (!verificationRequest) {
        throw new AppError(
            "The verification request could not be found. Please request a new verification code and try again.",
            400
        );
    }

    if (verificationRequest.expiresAt < new Date()) {
        throw new AppError(
            "Your verification code has expired. Please request a new one and try again.",
            400
        );
    }

    const isValidOtp = await compareHash(otp, verificationRequest?.otpHash);

    if (!isValidOtp) {
        throw new AppError(
            "The verification code you entered is incorrect. Please try again.",
            400
        );
    }

    return verificationRequest;
}

export const generateVerificationIdService = async (name: string | null, email: string, password: string | null, otp: string): Promise<{id: string, resendAvailableAt: Date}> => {
    const verification = await prisma.$transaction(async (tx) => {
        await tx.verificationRequest.deleteMany({
            where: {
                email
            }
        })
        const verificationData = await tx.verificationRequest.create({
            data: {
                name,
                email,
                passwordHash: password,
                otpHash: otp,
                expiresAt: addTime({ minutes: 10 }),
                resendAvailableAt: addTime({ minutes: 1 })
            },
            select: {
                id: true,
                resendAvailableAt: true
            }
        })
        return verificationData;
    })
    return verification;
}

export const getVerificationDetailService = async (id: string): Promise<VerificationRequest | null> => {
    const verification = await prisma.verificationRequest.findUnique({
        where: {
            id
        }
    });
    return verification;
}

export const updateVerificationIdService = async (id: string, otp: string): Promise<VerificationRequest | null> => {
    const verification = await prisma.verificationRequest.update({
        where: {
            id
        },
        data: {
            otpHash: otp,
            createdAt: new Date(),
            expiresAt: addTime({ minutes: 10 }),
            resendAvailableAt: addTime({ minutes: 1 })
        }
    });
    return verification
}

export const deleteVerificationDetailService = async (id: string): Promise<void> => {
    await prisma.verificationRequest.delete({
        where: {
            id
        }
    })
}