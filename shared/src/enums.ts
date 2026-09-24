export const PlanCode = {
  FREE: "FREE",
  BASIC_MONTHLY: "BASIC_MONTHLY",
  BASIC_YEARLY: "BASIC_YEARLY",
} as const
export type PlanCode = (typeof PlanCode)[keyof typeof PlanCode]

export const SubscriptionStatus = {
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
}
export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

export const PaymentStatus = {
  CREATED: "CREATED",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export const ShopRole = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole]

export const InventoryStatus = {
  IN_STOCK: "IN_STOCK",
  SOLD: "SOLD",
} as const
export type InventoryStatus =
  (typeof InventoryStatus)[keyof typeof InventoryStatus]

export const PaymentMethod = {
  CASH: "CASH",
  UPI: "UPI",
  CARD: "CARD",
  BANK_TRANSFER: "BANK_TRANSFER",
  CHEQUE: "CHEQUE",
  FINANCE: "FINANCE",
  OTHER: "OTHER",
}
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]
