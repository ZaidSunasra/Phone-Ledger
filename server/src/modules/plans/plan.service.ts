import { GetAllPlansOutput } from 'zs-phone-common'
import { prisma } from '../../configs/prisma.js'

export const getAllPlansService = async (): Promise<GetAllPlansOutput> => {
  const plans = await prisma.plan.findMany({
    where: {
      code: {
        not: {
          equals: 'FREE',
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
  })

  return {
    monthly: plans
      .filter((plan) => plan.billingDays === 30)
      .map((plan) => ({
        ...plan,
        price: plan.price.toNumber(),
      })),
    yearly: plans
      .filter((plan) => plan.billingDays === 365)
      .map((plan) => ({
        ...plan,
        price: plan.price.toNumber(),
      })),
  }
}
