import type {
  InventoryStatus,
  PaymentMethod,
  PlanCode,
  ShopRole,
  SubscriptionStatus,
} from "./enums.js"

export type User = {
  name: string
  email: string
  password: string
  id: string
  trialStartedAt: Date | null
  trialEndsAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export type VerificationRequest = {
  name: string | null
  email: string
  resendAvailableAt: Date
  id: string
  createdAt: Date
  passwordHash: string | null
  otpHash: string
  expiresAt: Date
  verifiedAt: Date | null
}

export type Subscription = {
  planId: string
  id: string
  userId: string
  status: SubscriptionStatus
  createdAt: Date
  updatedAt: Date
  startsAt: Date
  endsAt: Date
  cancelledAt: Date | null
}

export type Plan = {
  id: string
  createdAt: Date
  updatedAt: Date
  code: PlanCode
  name: string
  price: number
  billingDays: number
  maxShops: number
  maxMembers: number
}

export type InventoryDevice = {
  id: string
  shopId: string
  brandId: number
  name: string
  colour: string
  imei1: string
  imei2: string | null
  storage: number | null
  ram: number | null
  sellerId: string
  buyPrice: number
  buyDate: Date
  status: InventoryStatus
  createdAt: Date
  updatedAt: Date
}

export type SalePayment = {
  id: string
  createdAt: Date
  saleId: string
  amount: Number
  paidAt: Date
  method: PaymentMethod
  referenceNumber: string | null
  notes: string | null
}

export type DeviceSale = {
  id: string
  createdAt: Date
  updatedAt: Date
  deviceId: string
  buyerId: string
  sellPrice: Number
  sellDate: Date
}

export type Membership = {
  userId: string
  shopId: string
  role: ShopRole
  joinedAt: Date
}

export type Customer = {
  id: string
  shopId: string
  name: string
  aadharNumber: string
  phoneNumber: string | null
  createdAt: Date
  updatedAt: Date
}

export type Brand = {
  id: number
  name: string
}

export type SuccessResponse = {
  message: string
}

export type ErrorResponse = {
  message: string
  error?: any
}

export type Author = {
  id: string
  name: string
  email: string
  hasUsedTrial: boolean
}
