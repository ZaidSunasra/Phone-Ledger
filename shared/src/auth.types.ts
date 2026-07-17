import z from "zod/v4";
import { SuccessResponse, VerificationRequest } from "./common.types";

const EmailJobType = ["verification-email" , "forgot-password-email"]

export const signupSchema = z.object({
    name: z.string().min(2, "Name should be at least 2 character").max(30, "Name should not exceed 30 characters"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(6, "Password should be greater than 6 characters")
});

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
});

export const forgotPasswordSchema = z.object({
   email: z.email("Please enter a valid email address")
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password should be greater than 6 characters"),
    confirmPassword: z.string().min(6, "Password should be greater than 6 characters")
}).refine((data) => !(data.password && data.confirmPassword) || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const verifyOtpSchema = z.object({
    otp: z.string().min(6, "OTP should be exactly of 6 characters").max(6, "OTP should be exactly of 6 characters")
})

export const resendOtpSchema = z.object({
    type: z.enum(EmailJobType)
})

export type SendOtpSuccessResponse = SuccessResponse & {
    resendAvailableAt: Date
}

export type LoginSuccessResponse = SuccessResponse & {
    userData: {
        name: string,
        email: string,
        id: string
    }
}

export type SendOtpOutput = Pick<VerificationRequest, "resendAvailableAt" | "id">

export type SignupSchema = z.infer<typeof signupSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;

export type EmailJobType = typeof EmailJobType[number];