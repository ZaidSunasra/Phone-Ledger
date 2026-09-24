import { useQuery } from "@tanstack/react-query"
import { getCustomerDetail } from "./customer.api"

export const useFetchCustomerDetails = (customerDetails: string) => {
  return useQuery({
    queryKey: ["customer-details", customerDetails],
    queryFn: () => getCustomerDetail(customerDetails),
  })
}
