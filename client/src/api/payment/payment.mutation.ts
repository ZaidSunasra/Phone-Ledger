import type { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ErrorResponse } from "zs-phone-common"
import { createPaymentOrder, verifyPayment } from "./payment.api"

export const useCreatePaymentOrder = () => {
  return useMutation({
    mutationFn: createPaymentOrder,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data.message ?? "Unable to create payment order"
      )
    },
  })
}

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? "Unable to verify payment")
    },
  })
}
