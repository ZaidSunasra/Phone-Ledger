import { Router } from "express"
import {
  createPaymentOrderController,
  verifyPaymentController,
} from "./payment.controller.js"
import authenticate from "../../middlewares/auth.middleware.js"

const paymentRouter = Router()

paymentRouter.post("/orders", authenticate, createPaymentOrderController)
paymentRouter.post("/verify", authenticate, verifyPaymentController)

export default paymentRouter
