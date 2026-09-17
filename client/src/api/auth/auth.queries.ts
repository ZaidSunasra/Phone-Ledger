import { useAuth } from "@/store/auth.store"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "./auth.api"
import { useEffect } from "react"

export const useMe = () => {
  const setUser = useAuth((state) => state.setUser)
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  })
  useEffect(() => {
    if (query.data?.userData) {
      setUser(query.data.userData)
    }
  }, [query.data, setUser])

  return query
}
