import { NextFunction, Request, Response } from 'express'
import { Author, ErrorResponse } from 'zs-phone-common'
import { AppError } from '../utils/appError.js'
import { prisma } from '../configs/prisma.js'

const checkSubscription = async (
  _req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): Promise<any> => {
  try {
    const author: Author = res.locals.author

    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: author.id,
        status: 'ACTIVE',
        endsAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        endsAt: 'desc',
      },
      include: {
        plan: true,
      },
    })

    if (!activeSubscription) {
      throw new AppError(
        'You dont have an active subscription. Please renew your subscription',
        403,
      )
    }

    res.locals.activeSubscription = activeSubscription

    next()
  } catch (error) {
    next(error)
  }
}

export default checkSubscription
