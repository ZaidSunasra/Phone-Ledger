import { prisma } from "../../configs/prisma.js"
import {
  ActiveSubscription,
  AddShop,
  Author,
  GetShopOutput,
} from "@phone-ledger/shared"
import { AppError } from "../../utils/appError.js"

export const createShopService = async (
  { name, address, gst, phoneNumber }: AddShop,
  author: Author,
  activeSubscription: ActiveSubscription
): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const shopCount = await tx.shop.count({
      where: {
        ownerId: author.id,
      },
    })
    if (shopCount >= activeSubscription.plan.maxShops) {
      throw new AppError(
        "Shop limit reached for your current plan. Upgrade your plan to add more shops.",
        402
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
        role: "OWNER",
      },
    })
  })
}

export const getShopsService = async (
  author: Author
): Promise<GetShopOutput | null> => {
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
