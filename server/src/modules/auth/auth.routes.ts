import express from "express";
import { signupController, verifyEmailController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/verify-email", verifyEmailController);
authRouter.post("/signup", signupController);

export default authRouter;