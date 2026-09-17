import type {
  CreatePaymentOrder,
  CreatePaymentOrderSuccessResponse,
  VerifyPayment,
  VerifyPaymentSuccessResponse,
} from "zs-phone-common"
import axiosInstance from "../axiosInstance"

export const createPaymentOrder = async (
  data: CreatePaymentOrder
): Promise<CreatePaymentOrderSuccessResponse> => {
  const response = await axiosInstance.post("/payment/orders", data)
  return response.data
}

export const verifyPayment = async (
  data: VerifyPayment
): Promise<VerifyPaymentSuccessResponse> => {
  const response = await axiosInstance.post("/payment/verify", data)
  return response.data
}
