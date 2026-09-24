import { z } from "zod/v4"
import type {
  Brand,
  DeviceSale,
  InventoryDevice,
  SalePayment,
  SuccessResponse,
} from "./common.types"

export const addDeviceSchema = z.object({
  customer: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("existing"),
      id: z.uuid(),
    }),

    z.object({
      type: z.literal("new"),
      name: z.string().min(1, "Name is required"),
      phoneNumber: z.string().min(1, "Phone number is required"),
      aadharNumber: z.string().min(1, "Aadhaar number is required"),
    }),
  ]),

  device: z.object({
    brandId: z.number().int().positive("Brand is required"),

    name: z.string().min(1, "Device name is required"),

    colour: z.string().min(1, "Colour is required"),

    imei1: z.string().regex(/^\d{15}$/, "IMEI must contain exactly 15 digits"),

    imei2: z
      .string()
      .regex(/^\d{15}$/, "IMEI must contain exactly 15 digits")
      .optional(),

    storage: z.number().int().positive().optional(),

    ram: z.number().int().positive().optional(),

    buyPrice: z.string().min(1, "Buy price is required"),

    buyDate: z.coerce.date(),
  }),
})

export type AddDevice = z.infer<typeof addDeviceSchema>

export type GetDevicesQuery = {
  page?: number
  limit?: number
  search?: string
  sortBy?: "buyPrice" | "buyDate" | "name"
  sortOrder?: "asc" | "desc"
}

export type GetDevicesOutput = {
  devices: (InventoryDevice & {
    brand: Pick<Brand, "name">
  })[]

  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type GetDevicesSuccessResponse = SuccessResponse & {
  devices: GetDevicesOutput["devices"]
  pagination: GetDevicesOutput["pagination"]
}

export type GetDeviceByIdOutput =
  | (InventoryDevice & {
      sale:
        | (DeviceSale & {
            payments: SalePayment[]
          })
        | null
    })
  | null

export type GetDeviceByIdSuccessResponse = SuccessResponse & {
  device: GetDeviceByIdOutput
}

export type GetInventorySummaryOutput = {
  totalInventory: number
  inventoryCost: number
  addedThisMonth: number
  addedPercentageChange: number | null
}

export type GetInventorySummarySuccessResponse = SuccessResponse & {
  summary: GetInventorySummaryOutput
}

export type GetBrandsSuccessResponse = SuccessResponse & {
  brands: Brand[]
}
