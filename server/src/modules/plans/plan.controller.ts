import { NextFunction, Request, Response } from "express"
import { getAllPlansService } from "./plan.service.js"
import {
  SuccessResponse,
  GetAllPlansSuccessResponse,
} from "@phone-ledger/shared"

export const getAllPlansController = async (
  _req: Request,
  res: Response<GetAllPlansSuccessResponse | SuccessResponse>,
  next: NextFunction
): Promise<unknown> => {
  try {
    const plans = await getAllPlansService()

    return res.status(201).json({
      plans,
      message: "Plans fetched successfully",
    })
  } catch (error) {
    next(error)
  }
}
