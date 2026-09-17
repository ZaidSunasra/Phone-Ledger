import type { GetAllPlansSuccessResponse } from "zs-phone-common"
import axiosInstance from "../axiosInstance"

export const getPlans = async (): Promise<GetAllPlansSuccessResponse> => {
  const response = await axiosInstance.get("/plan/")
  return response.data
}
