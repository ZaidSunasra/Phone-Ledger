import { randomUUID } from 'crypto'
import { prisma } from '../../configs/prisma.js'
import { razorpay } from '../../configs/razorpay.js'
import {
  PaymentStatus,
  type CreatePaymentOrder,
  type CreatePaymentOrderOutput,
  type VerifyPayment,
  type VerifyPaymentOutput,
} from 'zs-phone-common'
import { rupeesToPaise } from '../../utils/currency.js'
import { AppError } from '../../utils/appError.js'
import { verifyRazorpaySignature } from '../../utils/razorpay.js'
import { endOfDay } from 'date-fns'
import { addTime } from '../../utils/dateFns.js'

export const ensureUserHasNoActiveSubscription = async (userId: string): Promise<void> => {
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      plan: {
        code: {
          not: {
            equals: 'FREE',
          },
        },
      },
      endsAt: {
        gt: new Date(),
      },
    },
  })

  if (activeSubscription) {
    throw new AppError('You already have an active subscription', 409)
  }
}

export const createPaymentOrderService = async (
  userId: string,
  { planId }: CreatePaymentOrder,
): Promise<CreatePaymentOrderOutput> => {
  const payment = await prisma.$transaction(async (tx) => {
    const plan = await tx.plan.findUnique({
      where: {
        id: planId,
      },
    })

    if (!plan) {
      throw new AppError('Plan not found', 404)
    }

    const createdPayment = await tx.payment.create({
      data: {
        userId,
        planId,
        amount: plan.price,
        currency: 'INR',
        status: PaymentStatus.CREATED,
      },
    })

    return {
      payment: createdPayment,
      plan,
      amountInPaise: rupeesToPaise(plan.price),
    }
  })

  const receipt = `phone-ledger-${randomUUID()}`

  let razorpayOrder

  try {
    razorpayOrder = await razorpay.orders.create({
      amount: payment.amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        paymentId: payment.payment.id,
        userId,
        planId,
        planCode: payment.plan.code,
      },
    })
  } catch (error) {
    throw error
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      id: payment.payment.id,
    },
    data: {
      razorpayOrderId: razorpayOrder.id,
    },
  })

  return {
    paymentId: updatedPayment.id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount.toString(),
    currency: razorpayOrder.currency,
    plan: {
      id: payment.plan.id,
      name: payment.plan.name,
      code: payment.plan.code,
      price: payment.plan.price.toString(),
      billingDays: payment.plan.billingDays,
    },
  }
}

export const verifyPaymentService = async (
  userId: string,
  { razorpay_payment_id, razorpay_order_id, razorpay_signature }: VerifyPayment,
): Promise<VerifyPaymentOutput> => {
  const payment = await prisma.payment.findUnique({
    where: {
      razorpayOrderId: razorpay_order_id,
    },
    include: {
      plan: true,
    },
  })

  if (!payment) {
    throw new AppError('Payment order not found', 404)
  }

  if (payment.userId !== userId) {
    throw new AppError('You are not authorized to verify this payment', 403)
  }

  if (payment.status === PaymentStatus.SUCCESS) {
    return {
      alreadyProcessed: true,
      paymentId: payment.id,
      subscriptionId: payment.subscriptionId,
      status: 'SUCCESS',
      subscription: null,
    }
  }

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    throw new AppError('Invalid Razorpay payment signature', 409)
  }

  const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id)

  if (razorpayPayment.order_id !== razorpay_order_id) {
    throw new AppError('Razorpay payment does not belong to the expected order', 409)
  }

  const expectedAmount = rupeesToPaise(payment.amount)

  if (razorpayPayment.amount !== expectedAmount) {
    throw new AppError('Payment amount mismatch', 409)
  }

  if (razorpayPayment.currency !== payment.currency) {
    throw new AppError('Payment currency mismatch', 409)
  }

  if (razorpayPayment.status !== 'captured') {
    throw new AppError(`Payment is not captured. Current status: ${razorpayPayment.status}`, 409)
  }

  const result = await prisma.$transaction(async (tx) => {
    const currentPayment = await tx.payment.findUnique({
      where: {
        id: payment.id,
      },
    })

    if (!currentPayment) {
      throw new AppError('Payment record not found', 404)
    }

    if (currentPayment.status === PaymentStatus.SUCCESS) {
      return {
        payment: currentPayment,
        subscription: currentPayment.subscriptionId
          ? await tx.subscription.findUnique({
              where: {
                id: currentPayment.subscriptionId,
              },
            })
          : null,
        alreadyProcessed: true,
      }
    }

    if (currentPayment.subscriptionId) {
      throw new AppError('Payment has already been associated with a subscription', 409)
    }

    const currentSubscription = await tx.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
      include: {
        plan: true,
      },
    })

    if (currentSubscription) {
      if (currentSubscription.plan.code === 'FREE') {
        await tx.subscription.update({
          where: {
            id: currentSubscription.id,
          },
          data: {
            status: 'EXPIRED',
          },
        })
      } else {
        throw new AppError('You already have an active paid subscription.', 409)
      }
    }

    const plan = await tx.plan.findUnique({
      where: {
        id: currentPayment.planId,
      },
    })

    if (!plan) {
      throw new AppError('Plan associated with payment no longer exists', 404)
    }

    const startsAt = new Date()
    const endsAt = endOfDay(addTime({ days: plan.billingDays }, startsAt))

    const subscription = await tx.subscription.create({
      data: {
        userId,
        planId: plan.id,
        status: 'ACTIVE',
        startsAt,
        endsAt,
      },
    })

    const updatedPayment = await tx.payment.update({
      where: {
        id: currentPayment.id,
      },
      data: {
        status: PaymentStatus.SUCCESS,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt: startsAt,
        subscriptionId: subscription.id,
      },
    })

    return {
      payment: updatedPayment,
      subscription,
      alreadyProcessed: false,
    }
  })

  return {
    paymentId: result.payment.id,
    subscriptionId: result.subscription?.id ?? null,
    status: result.payment.status,
    alreadyProcessed: result.alreadyProcessed,
    subscription: result.subscription
      ? {
          id: result.subscription.id,
          planId: result.subscription.planId,
          status: result.subscription.status,
          startsAt: result.subscription.startsAt,
          endsAt: result.subscription.endsAt,
        }
      : null,
  }
}
