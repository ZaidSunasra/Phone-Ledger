import express from "express"
import {
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  resendOtpController,
  resetPasswordController,
  signupController,
  verifyEmailController,
  verifyResetOtpController,
} from "./auth.controller.js"
import authenticate from "../../middlewares/auth.middleware.js"

const authRouter = express.Router()

authRouter.post("/verify-email", verifyEmailController)
authRouter.post("/signup", signupController)
authRouter.post("/login", loginController)
authRouter.post("/forgot-password", forgotPasswordController)
authRouter.post("/verify-reset-otp", verifyResetOtpController)
authRouter.patch("/reset-password", resetPasswordController)
authRouter.patch("/resend-otp", resendOtpController)
authRouter.get("/me", authenticate, getMeController)
authRouter.post("/logout", authenticate, logoutController)

export default authRouter
