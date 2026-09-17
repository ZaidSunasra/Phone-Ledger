import { Plan, Subscription, SuccessResponse } from "./common.types";

export type ActiveSubscription = Subscription & {
    plan: Plan
}

export type GetAllPlansOutput = { 
    monthly: Plan[], 
    yearly: Plan[]
}

export type GetAllPlansSuccessResponse = SuccessResponse & {
    plans: GetAllPlansOutput
}