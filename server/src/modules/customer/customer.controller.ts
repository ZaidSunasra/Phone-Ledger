import {
  ErrorResponse,
  GetCustomerDetailSuccessResponse,
  Membership,
} from "@phone-ledger/shared"
import { NextFunction, Request, Response } from "express"
import { getCustomerDetailsService } from "./customer.service.js"

export const getCustomerDetailsController = async (
  req: Request<{ details: string }>,
  res: Response<GetCustomerDetailSuccessResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  const membership: Membership = res.locals.membership
  const customerDetail = req.params.details

  try {
    const customer = await getCustomerDetailsService(membership, customerDetail)

    res.status(200).json({
      customer,
      message: "Customer details fetched successfully",
    })
    return
  } catch (error) {
    next(error)
  }
}
