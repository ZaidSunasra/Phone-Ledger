import type {
  AddDevice,
  GetBrandsSuccessResponse,
  GetDeviceByIdSuccessResponse,
  GetDevicesQuery,
  GetDevicesSuccessResponse,
  GetInventorySummarySuccessResponse,
  SuccessResponse,
} from "@phone-ledger/shared"
import axiosInstance from "../axiosInstance"

export const getDevices = async (
  params: GetDevicesQuery
): Promise<GetDevicesSuccessResponse> => {
  const response = await axiosInstance.get("/inventory/", { params })
  return response.data
}

export const getDeviceById = async (
  deviceId: string
): Promise<GetDeviceByIdSuccessResponse> => {
  const response = await axiosInstance.get(`/inventory/device/${deviceId}`)
  return response.data
}

export const getInventorySummary =
  async (): Promise<GetInventorySummarySuccessResponse> => {
    const response = await axiosInstance.get("/inventory/summary")
    return response.data
  }

export const addDevcie = async (data: AddDevice): Promise<SuccessResponse> => {
  const response = await axiosInstance.post("/inventory/", data)
  return response.data
}

export const deleteDevice = async (
  deviceId: string
): Promise<SuccessResponse> => {
  const response = await axiosInstance.delete(`/inventory/device/${deviceId}`)
  return response.data
}

export const getBrands = async (): Promise<GetBrandsSuccessResponse> => {
  const response = await axiosInstance.get("/inventory/brands")
  return response.data
}
