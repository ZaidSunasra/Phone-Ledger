import express from "express";
import { loginController, signupController, verifyEmailController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export default authRouter;