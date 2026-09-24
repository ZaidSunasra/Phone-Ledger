import {
  AddDevice,
  Brand,
  GetDeviceByIdOutput,
  GetDevicesOutput,
  GetDevicesQuery,
  GetInventorySummaryOutput,
  Membership,
} from "@phone-ledger/shared"
import { prisma } from "../../configs/prisma.js"
import { AppError } from "../../utils/appError.js"
import { startOfMonth, subMonths } from "date-fns"
import { Prisma } from "../../generated/prisma/client.js"

export const addDeviceService = async (
  { customer, device }: AddDevice,
  membership: Membership
): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    let sellerId
    if (customer.type === "new") {
      const customerDetails = await tx.customer.create({
        data: {
          name: customer.name.toLowerCase().trim(),
          phoneNumber: customer.phoneNumber.trim(),
          aadharNumber: customer.aadharNumber.trim(),
          shopId: membership.shopId,
        },
      })
      sellerId = customerDetails.id
    } else {
      sellerId = customer.id
    }
    await tx.inventoryDevice.create({
      data: {
        brandId: device.brandId,
        name: device.name.toLowerCase().trim(),
        colour: device.colour.toLowerCase().trim(),
        imei1: device.imei1.trim(),
        imei2: device.imei2?.trim() || null,
        storage: device.storage ?? null,
        ram: device.ram ?? null,
        buyPrice: device.buyPrice,
        buyDate: device.buyDate,
        sellerId,
        shopId: membership.shopId,
      },
    })
  })
}

export const getDevicesService = async (
  membership: Membership,
  query: GetDevicesQuery
): Promise<GetDevicesOutput> => {
  const page = Math.max(1, Number(query.page))

  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50))

  const search = query.search?.trim() || ""

  const sortBy = query.sortBy || "buyDate"

  const sortOrder = query.sortOrder || "desc"

  const where: Prisma.InventoryDeviceWhereInput = {
    shopId: membership.shopId,

    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              imei1: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              imei2: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              colour: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  }

  const orderBy = {
    [sortBy]: sortOrder,
  }

  const skip = (page - 1) * limit

  const [devices, total] = await Promise.all([
    prisma.inventoryDevice.findMany({
      where,
      include: {
        brand: {
          select: {
            name: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),

    prisma.inventoryDevice.count({
      where,
    }),
  ])

  const data = devices.map((device) => ({
    ...device,
    buyPrice: device.buyPrice.toNumber(),
  }))

  return {
    devices: data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export const getDeviceByIdService = async (
  device_id: string,
  membership: Membership
): Promise<GetDeviceByIdOutput> => {
  const device = await prisma.inventoryDevice.findUnique({
    where: {
      id: device_id,
      shopId: membership.shopId,
    },
    include: {
      sale: {
        include: {
          payments: true,
        },
      },
    },
  })
  if (!device) {
    throw new AppError("Device not found", 404)
  }
  return {
    ...device,
    buyPrice: device?.buyPrice?.toNumber(),
    sale: device.sale
      ? {
          ...device.sale,
          sellPrice: device.sale.sellPrice.toNumber(),
          payments: device.sale.payments.map((payment) => ({
            ...payment,
            amount: payment.amount.toNumber(),
          })),
        }
      : null,
  }
}

export const getInventorySummaryService = async (
  membership: Membership
): Promise<GetInventorySummaryOutput> => {
  const now = new Date()

  const currentMonthStart = startOfMonth(now)
  const previousMonthStart = startOfMonth(subMonths(now, 1))
  const previousMonthSameTime = subMonths(now, 1)

  const [summary, addedThisMonth, addedLastMonth] = await prisma.$transaction([
    prisma.inventoryDevice.aggregate({
      where: {
        shopId: membership.shopId,
        status: "IN_STOCK",
      },
      _count: {
        _all: true,
      },
      _sum: {
        buyPrice: true,
      },
    }),

    prisma.inventoryDevice.count({
      where: {
        shopId: membership.shopId,
        createdAt: {
          gte: currentMonthStart,
          lte: now,
        },
      },
    }),

    prisma.inventoryDevice.count({
      where: {
        shopId: membership.shopId,
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthSameTime,
        },
      },
    }),
  ])

  const addedPercentageChange =
    addedLastMonth === 0
      ? null
      : ((addedThisMonth - addedLastMonth) / addedLastMonth) * 100

  return {
    totalInventory: summary._count._all,
    inventoryCost: summary._sum.buyPrice?.toNumber() ?? 0,
    addedThisMonth,
    addedPercentageChange,
  }
}

export const deleteDeviceService = async (
  deviceId: string,
  membership: Membership
): Promise<void> => {
  await prisma.inventoryDevice.delete({
    where: {
      id: deviceId,
      shopId: membership.shopId,
    },
  })
}

export const getBrandsService = async (): Promise<Brand[]> => {
  const brands = await prisma.brand.findMany({})
  return brands
}
