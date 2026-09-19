import type { GetAllPlansSuccessResponse } from "@phone-ledger/shared"
import axiosInstance from "../axiosInstance"

export const getPlans = async (): Promise<GetAllPlansSuccessResponse> => {
  const response = await axiosInstance.get("/plan/")
  return response.data
}
