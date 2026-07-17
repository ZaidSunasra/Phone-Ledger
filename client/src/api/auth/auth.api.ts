import type { ForgotPasswordSchema, LoginSchema, ResendOtpSchema, ResetPasswordSchema, SignupSchema, VerifyOtpSchema } from "zs-phone-common";
import axiosInstance from "../axiosInstance";

export const login = async (data: LoginSchema): Promise<any> => {
	const response = await axiosInstance.post("/auth/login", data);
	return response.data;
};

export const signup = async (data: SignupSchema) : Promise<any> => {
    const response = await axiosInstance.post("/auth/signup", data);
	return response.data;
}

export const verifyEmail = async (data: VerifyOtpSchema) : Promise<any> => {
    const response = await axiosInstance.post("/auth/verify-email", data);
	return response.data;
}

export const forgotPassword = async (data: ForgotPasswordSchema) : Promise<any> => {
    const response = await axiosInstance.post("/auth/forgot-password", data);
	return response.data;
}

export const verifyResetPassword = async (data: VerifyOtpSchema) : Promise<any> => {
    const response = await axiosInstance.post("/auth/verify-reset-otp", data);
	return response.data;
}

export const resetPassword = async (data: ResetPasswordSchema) : Promise<any> => {
    const response = await axiosInstance.patch("/auth/reset-password", data);
	return response.data;
}

export const resendOtp = async (data: ResendOtpSchema) : Promise<any> => {
    const response = await axiosInstance.patch("/auth/resend-otp", data);
	return response.data;
}