import type { AddShop, GetShopsSuccessResponse } from "@phone-ledger/shared"
import axiosInstance from "../axiosInstance"

export const getShops = async (): Promise<GetShopsSuccessResponse> => {
  const response = await axiosInstance.get("/shop/")
  return response.data
}

export const addShop = async (
  data: AddShop
): Promise<GetShopsSuccessResponse> => {
  const response = await axiosInstance.post("/shop/", data)
  return response.data
}
