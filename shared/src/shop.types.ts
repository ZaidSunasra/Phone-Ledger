import z from "zod/v4"
import type { SuccessResponse } from "./common.types.js"
import type { ShopRole } from "./enums.js"

export const addShopSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required and should be atleast 2 character long"),
  address: z.string().optional(),
  gst: z.string().optional(),
  phoneNumber: z.string().optional(),
})

export type AddShop = z.infer<typeof addShopSchema>

export type ShopDetail = {
  name: string
  id: string
  role: ShopRole
}

export type GetShopOutput = {
  memberships: {
    shop: {
      name: string
      id: string
    }
    shopId: string
    role: ShopRole
  }[]
}

export type GetShopsSuccessResponse = SuccessResponse & {
  shops: ShopDetail[]
}
