import express from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import { createShopController, getShopsController } from "./shop.controller.js";

const shopRouter = express.Router();

shopRouter.post("/create", authenticate, createShopController);
shopRouter.get("/", authenticate, getShopsController)

export default shopRouter;