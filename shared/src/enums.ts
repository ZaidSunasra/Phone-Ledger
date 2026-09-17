const PlanCode = {
    FREE: "FREE",
    BASIC_MONTHLY: "BASIC_MONTHLY",
    BASIC_YEARLY: "BASIC_YEARLY",
} as const
export type PlanCode =  (typeof PlanCode)[keyof typeof PlanCode]

const SubscriptionStatus = {
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
}
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

export const PaymentStatus = {
    CREATED: "CREATED",
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED"
} as const
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export const ShopRole = {
    OWNER: "OWNER",
    MANAGER: "MANAGER",
    EMPLOYEE: "EMPLOYEE",
} as const
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole]