import { z } from "zod/v4"
import type { SuccessResponse } from "./common.types.js"
import type { PaymentStatus } from "./enums.js"

export const createPaymentOrderSchema = z.object({
  planId: z.uuid("Invalid Plan Id"),
})

export const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),
  razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay signature is required"),
})

export type CreatePaymentOrder = z.infer<typeof createPaymentOrderSchema>

export type VerifyPayment = z.infer<typeof verifyPaymentSchema>

export type CreatePaymentOrderOutput = {
  paymentId: string
  razorpayOrderId: string
  amount: string
  currency: string
  plan: {
    id: string
    name: string
    code: string
    price: string
    billingDays: number
  }
}

export type CreatePaymentOrderSuccessResponse = SuccessResponse & {
  order: CreatePaymentOrderOutput
}

export type VerifyPaymentOutput = {
  paymentId: string
  subscriptionId: string | null
  status: PaymentStatus
  alreadyProcessed: boolean
  subscription: {
    id: string
    planId: string
    status: string
    startsAt: Date
    endsAt: Date
  } | null
}

export type VerifyPaymentSuccessResponse = SuccessResponse & {
  payment: VerifyPaymentOutput
}
