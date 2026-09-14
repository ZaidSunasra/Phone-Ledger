import { endOfDay, startOfDay } from 'date-fns'
import { prisma } from '../../configs/prisma.js'
import { addTime } from '../../utils/dateFns.js'
import { AppError } from '../../utils/appError.js'
import { AddShop, Author, GetShopOutput } from 'zs-phone-common'

export const createShopService = async (
  { name, address, gst, phoneNumber }: AddShop,
  author: Author,
): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    let subscription = await tx.subscription.findFirst({
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
    })

    if (!subscription && !author.hasUsedTrial) {
      const freePlan = await tx.plan.findUnique({
        where: {
          code: 'free',
        },
        select: {
          id: true,
        },
      })

      if (!freePlan) {
        throw new AppError('Free plan is not configured.', 500)
      }

      const now = new Date()
      const trialEndsAt = endOfDay(addTime({ days: 15 }))

      subscription = await tx.subscription.create({
        data: {
          userId: author.id,
          planId: freePlan.id,
          status: 'ACTIVE',
          startsAt: startOfDay(now),
          endsAt: trialEndsAt,
        },
      })

      await tx.user.update({
        where: {
          id: author.id,
        },
        data: {
          trialStartedAt: now,
          trialEndsAt: trialEndsAt,
        },
      })
    }

    if (!subscription) {
      throw new AppError(
        'Your subscription has expired. Please renew it to create another shop.',
        403,
      )
    }

    const shop = await tx.shop.create({
      data: {
        name: name.trim(),
        address: address?.trim() || null,
        gst: gst?.trim() || null,
        phoneNumber: phoneNumber?.trim() || null,
        ownerId: author.id,
      },
    })

    await tx.shopMember.create({
      data: {
        userId: author.id,
        shopId: shop.id,
        role: 'OWNER',
      },
    })
  })
}

export const getShopsService = async (author: Author): Promise<GetShopOutput | null> => {
  const shops = await prisma.user.findUnique({
    where: {
      id: author.id,
    },
    select: {
      memberships: {
        select: {
          shop: {
            select: {
              name: true,
              id: true,
            },
          },
          shopId: true,
          role: true,
        },
      },
    },
  })
  return shops
}
