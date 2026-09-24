import { useQuery } from "@tanstack/react-query"
import {
  getBrands,
  getDeviceById,
  getDevices,
  getInventorySummary,
} from "./inventory.api"
import type { GetDevicesQuery } from "@phone-ledger/shared"

export const useFetchDevices = (params: GetDevicesQuery) => {
  return useQuery({
    queryKey: ["devices", params],
    queryFn: () => getDevices(params),
  })
}

export const useFetchDeviceById = (id: string) => {
  return useQuery({
    queryKey: ["device", id],
    queryFn: () => getDeviceById(id),
  })
}

export const useFetchSummary = () => {
  return useQuery({
    queryKey: ["inventory-summary"],
    queryFn: getInventorySummary,
    staleTime: 15 * 60 * 1000,
  })
}

export const useFetchBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  })
}
