import express from "express"
import authenticate from "../../middlewares/auth.middleware.js"
import { createShopController, getShopsController } from "./shop.controller.js"
import checkSubscription from "../../middlewares/subscription.middleware.js"

const shopRouter = express.Router()

shopRouter.post("/", authenticate, checkSubscription, createShopController)
shopRouter.get("/", authenticate, getShopsController)

export default shopRouter
