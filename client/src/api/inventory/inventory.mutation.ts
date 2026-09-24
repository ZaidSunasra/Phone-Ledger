import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDevcie, deleteDevice } from "./inventory.api"
import { toast } from "sonner"
import type { ErrorResponse } from "@phone-ledger/shared"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router"

export const useAddDevice = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addDevcie,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["devices", "inventory-summary"],
      })
      toast.success(data.message)
      navigate("/inventory")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}

export const useDeleteDevice = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["devices", "inventory-summary"],
      })
      toast.success(data.message)
      navigate("/inventory")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message)
    },
  })
}
