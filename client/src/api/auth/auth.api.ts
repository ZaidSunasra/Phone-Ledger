import type { ForgotPasswordSchema, LoginSchema, LoginSuccessResponse, ResendOtpSchema, ResetPasswordSchema, SendOtpSuccessResponse, SignupSchema, SuccessResponse, VerifyOtpSchema } from "zs-phone-common";
import axiosInstance from "../axiosInstance";

export const login = async (data: LoginSchema): Promise<LoginSuccessResponse> => {
	const response = await axiosInstance.post("/auth/login", data);
	return response.data;
};

export const signup = async (data: SignupSchema) : Promise<SendOtpSuccessResponse> => {
    const response = await axiosInstance.post("/auth/signup", data);
	return response.data;
}

export const verifyEmail = async (data: VerifyOtpSchema) : Promise<SuccessResponse> => {
    const response = await axiosInstance.post("/auth/verify-email", data);
	return response.data;
}

export const forgotPassword = async (data: ForgotPasswordSchema) : Promise<SendOtpSuccessResponse> => {
    const response = await axiosInstance.post("/auth/forgot-password", data);
	return response.data;
}

export const verifyResetPassword = async (data: VerifyOtpSchema) : Promise<SuccessResponse> => {
    const response = await axiosInstance.post("/auth/verify-reset-otp", data);
	return response.data;
}

export const resetPassword = async (data: ResetPasswordSchema) : Promise<SuccessResponse> => {
    const response = await axiosInstance.patch("/auth/reset-password", data);
	return response.data;
}

export const resendOtp = async (data: ResendOtpSchema) : Promise<SendOtpSuccessResponse> => {
    const response = await axiosInstance.patch("/auth/resend-otp", data);
	return response.data;
}