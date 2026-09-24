import { useQuery } from "@tanstack/react-query"
import { getPlans } from "./plan.api"

export const useFetchPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  })
}
