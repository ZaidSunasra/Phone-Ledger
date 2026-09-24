import { NextFunction, Request, Response } from "express"
import { Author, ErrorResponse } from "@phone-ledger/shared"
import { AppError } from "../utils/appError.js"
import { prisma } from "../configs/prisma.js"

const checkMemberShip = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): Promise<any> => {
  try {
    const author: Author = res.locals.author

    const shopId = req.header("x-shop-id")

    if (!shopId) {
      throw new AppError("Shop ID not provided", 400)
    }

    const membership = await prisma.shopMember.findUnique({
      where: {
        userId_shopId: {
          shopId: shopId,
          userId: author.id,
        },
      },
    })

    if (!membership) {
      throw new AppError("You do not have access to this organization", 403)
    }

    res.locals.membership = membership

    next()
  } catch (error) {
    next(error)
  }
}

export default checkMemberShip
