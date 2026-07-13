import type { Request, Response } from "express";
import { signupSchema } from "./auth.types.js";
import { addUserService, deleteVerificationDetailService, findExistingEmailService, generateVerificationIdService, getVerificationDetailService } from "./auth.service.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { compareHash, hashValue } from "../../utils/bcrypt.js";
import sendOtpEmail from "../../services/email.services.js";

export const verifyEmailController = async (req: Request, res: Response): Promise<any> => {

    const { otp } = req.body;
    const verificationId = req.cookies.verificationId;

    try {
        const verificationRequest = await getVerificationDetailService(verificationId);

        if (!verificationRequest) {
            return res.status(404).json({
                message: "The verification request could not be found. Please request a new verification code and try again.",
            });
        }

        if (verificationRequest.expiresAt < new Date()) {
            return res.status(400).json({
                message: "Your verification code has expired. Please request a new one and try again.",
            });
        }

        const isValidOtp = await compareHash(otp, verificationRequest?.otpHash);

        if (!isValidOtp) {
            return res.status(400).json({
                message: "The verification code you entered is incorrect. Please try again.",
            });
        }

        await addUserService({ name: verificationRequest.name!, email: verificationRequest?.email, password: verificationRequest.passwordHash! });
        await deleteVerificationDetailService(verificationId);
        res.clearCookie("verificationId")

        return res.status(200).json({
            message: "Account created successfully. Please login to your account",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

export const signupController = async (req: Request, res: Response): Promise<any> => {

    const { name, email, password } = req.body;

    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Input validation error",
            error: validation.error.issues
        })
    }

    try {

        const existingUser = await findExistingEmailService(email);
        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email address already exists. Please sign in or use a different email address.",
            })
        }

        const otp = generateOtp();

        const hashedOtp = await hashValue(otp, 10);
        const hashedPassword = await hashValue(password);

        const verificationId = await generateVerificationIdService(name, email, hashedPassword, hashedOtp);

        sendOtpEmail(email, otp);

        res.cookie("verificationId", verificationId, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        });

        return res.status(200).json({
            message:
                "Verification code has been sent to your email address.",
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
        });
    }
}