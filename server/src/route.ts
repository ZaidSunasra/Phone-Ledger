import express from "express";
import authRouter from "./modules/auth/auth.routes.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;