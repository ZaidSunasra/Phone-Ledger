import type { GetShopsSuccessResponse } from "zs-phone-common"
import axiosInstance from "../axiosInstance"

export const getShops = async (): Promise<GetShopsSuccessResponse> => {
  const response = await axiosInstance.get("/shop/")
  return response.data
}
