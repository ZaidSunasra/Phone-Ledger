import type { NextFunction, Request, Response } from 'express'
import {
  createPaymentOrderService,
  ensureUserHasNoActiveSubscription,
  verifyPaymentService,
} from './payment.service.js'
import {
  Author,
  ErrorResponse,
  createPaymentOrderSchema,
  CreatePaymentOrderSuccessResponse,
  verifyPaymentSchema,
  VerifyPaymentSuccessResponse,
} from 'zs-phone-common'

export const createPaymentOrderController = async (
  req: Request,
  res: Response<CreatePaymentOrderSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<unknown> => {
  const { planId } = req.body
  const author: Author = res.locals.author

  const validation = createPaymentOrderSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    await ensureUserHasNoActiveSubscription(author.id)

    const order = await createPaymentOrderService(author.id, { planId })

    return res.status(201).json({
      message: 'Payment order created successfully',
      order,
    })
  } catch (error) {
    next(error)
  }
}

export const verifyPaymentController = async (
  req: Request,
  res: Response<VerifyPaymentSuccessResponse | ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
  const author: Author = res.locals.author

  const validation = verifyPaymentSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: 'Input validation error',
      error: validation.error.issues,
    })
  }

  try {
    await ensureUserHasNoActiveSubscription(author.id)
    const payment = await verifyPaymentService(author.id, {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    })

    return res.status(200).json({
      message: payment.alreadyProcessed
        ? 'Payment was already verified'
        : 'Payment verified successfully',
      payment,
    })
  } catch (error) {
    next(error)
  }
}
