import { NextFunction, Request, Response } from "express"
import { createShopService, getShopsService } from "./shop.service.js"
import {
  addShopSchema,
  Author,
  ErrorResponse,
  SuccessResponse,
  ActiveSubscription,
} from "@phone-ledger/shared"

export const createShopController = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<any> => {
  const { name, gst, address, phoneNumber } = req.body
  const author: Author = res.locals.author
  const activeSubscription: ActiveSubscription = res.locals.activeSubscription
  const validation = addShopSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      message: "Input validation error",
      error: validation.error.issues,
    })
  }

  try {
    await createShopService(
      { name, address, gst, phoneNumber },
      author,
      activeSubscription
    )

    res.status(201).json({
      message:
        "Your shop has been created successfully. You're now ready to manage your inventory, sales, and team from one place.",
    })
  } catch (error) {
    next(error)
  }
}

export const getShopsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const author: Author = res.locals.author

  try {
    const shops = await getShopsService(author)

    return res.status(201).json({
      message: "Shops fetched successfully",
      shops: shops?.memberships.map((membership) => ({
        name: membership.shop.name,
        id: membership.shop.id,
        role: membership.role,
      })),
    })
  } catch (error) {
    next(error)
  }
}
