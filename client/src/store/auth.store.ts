import type { LoginUser } from "@phone-ledger/shared"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  user: LoginUser | null
  setUser: (user: LoginUser | null) => void
  clearUser: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-data",
    }
  )
)
