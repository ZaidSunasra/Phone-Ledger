import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import {
  forgotPassword,
  login,
  logout,
  resendOtp,
  resetPassword,
  signup,
  verifyEmail,
  verifyResetPassword,
} from "./auth.api"
import { useAuth } from "@/store/auth.store"
import { useOtpStore } from "@/store/otp.store"
import type {
  ErrorResponse,
  LoginSuccessResponse,
  SendOtpSuccessResponse,
  SuccessResponse,
} from "zs-phone-common"
import { useShop } from "@/store/shop.store"
import type { AxiosError } from "axios"

export const useLogin = () => {
  const setUser = useAuth((state) => state.setUser)
  const navigate = useNavigate()
  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginSuccessResponse) => {
      setUser(data.userData)
      toast.success(data.message)
      navigate("/select-shop")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useSignup = () => {
  const setResendAvailableAt = useOtpStore(
    (state) => state.setResendAvailableAt
  )
  const navigate = useNavigate()
  return useMutation({
    mutationFn: signup,
    onSuccess: (data: SendOtpSuccessResponse) => {
      toast.success(data.message)
      setResendAvailableAt(data.resendAvailableAt)
      navigate("/verify-otp/email-verification")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useVerifyEmail = () => {
  const clearResendAvailableAt = useOtpStore(
    (state) => state.clearResendAvailableAt
  )
  const navigate = useNavigate()
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data: SuccessResponse) => {
      toast.success(data.message)
      clearResendAvailableAt()
      navigate("/login")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useForgotPassword = () => {
  const navigate = useNavigate()
  const setResendAvailableAt = useOtpStore(
    (state) => state.setResendAvailableAt
  )
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: SendOtpSuccessResponse) => {
      toast.success(data.message)
      setResendAvailableAt(data.resendAvailableAt)
      navigate("/verify-otp/reset-password")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useVerifyResetPassword = () => {
  const navigate = useNavigate()
  const clearResendAvailableAt = useOtpStore(
    (state) => state.clearResendAvailableAt
  )
  return useMutation({
    mutationFn: verifyResetPassword,
    onSuccess: (data: SuccessResponse) => {
      toast.success(data.message)
      clearResendAvailableAt()
      navigate("/reset-password")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useResetPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: SuccessResponse) => {
      toast.success(data.message)
      navigate("/login")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useResendOtp = () => {
  const setResendAvailableAt = useOtpStore(
    (state) => state.setResendAvailableAt
  )
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data: SendOtpSuccessResponse) => {
      setResendAvailableAt(data.resendAvailableAt)
      toast.success(data.message)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: (data: SuccessResponse) => {
      toast.success(data.message)

      queryClient.clear()

      useAuth.getState().clearUser()
      useAuth.persist.clearStorage()

      useShop.getState().clearShop()
      useShop.persist.clearStorage()

      navigate("/")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}
