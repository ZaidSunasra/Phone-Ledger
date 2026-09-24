import type { GetCustomerDetailSuccessResponse } from "@phone-ledger/shared"
import axiosInstance from "../axiosInstance"

export const getCustomerDetail = async (
  customerDetails: string
): Promise<GetCustomerDetailSuccessResponse> => {
  const response = await axiosInstance.get(`/customer/${customerDetails}`)
  return response.data
}
