import type { Customer, SuccessResponse } from "./common.types"

export type GetCustomerDetailOutput = Pick<
  Customer,
  "aadharNumber" | "id" | "name" | "phoneNumber"
>

export type GetCustomerDetailSuccessResponse = SuccessResponse & {
  customer: GetCustomerDetailOutput | null
}
