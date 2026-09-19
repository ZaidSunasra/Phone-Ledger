import type { PlanCode, SubscriptionStatus } from "./enums.js"

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
