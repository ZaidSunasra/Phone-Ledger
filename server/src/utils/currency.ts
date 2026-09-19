import { Prisma } from "../generated/prisma/client.js"
import { AppError } from "./appError.js"

export const rupeesToPaise = (
  amount: Prisma.Decimal | number | string
): number => {
  const decimalAmount = new Prisma.Decimal(amount)

  if (!decimalAmount.isFinite() || decimalAmount.lessThanOrEqualTo(0)) {
    throw new AppError("Invalid payment amount", 400)
  }

  const paise = decimalAmount.mul(100)

  if (!paise.isInteger()) {
    throw new AppError("Payment amount must have at most 2 decimal places", 400)
  }

  const paiseNumber = paise.toNumber()

  if (!Number.isSafeInteger(paiseNumber)) {
    throw new AppError("Payment amount is too large", 400)
  }

  return paiseNumber
}
