import express from "express";
import { forgotPasswordController, loginController, resendOtpController, resetPasswordController, signupController, verifyEmailController, verifyResetOtpController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/verify-reset-otp", verifyResetOtpController);
authRouter.patch("/reset-password", resetPasswordController);
authRouter.patch("/resend-otp", resendOtpController);

export default authRouter;