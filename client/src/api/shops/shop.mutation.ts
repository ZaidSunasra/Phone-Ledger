import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addShop } from "./shop.api"
import type { ErrorResponse, SuccessResponse } from "zs-phone-common"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import type { AxiosError } from "axios"

export const useAddShop = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addShop,
    onSuccess: (data: SuccessResponse) => {
      queryClient.invalidateQueries({ queryKey: ["shops"] })
      navigate("/select-shop")
      toast.success(data.message)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}
