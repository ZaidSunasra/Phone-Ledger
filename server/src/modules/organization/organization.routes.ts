import express from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import { addOrganizationController } from "./organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/create", authenticate, addOrganizationController);

export default organizationRouter;