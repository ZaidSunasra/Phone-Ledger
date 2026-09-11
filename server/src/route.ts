import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import organizationRouter from "./modules/organization/organization.routes.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/organization", organizationRouter);

export default mainRouter;