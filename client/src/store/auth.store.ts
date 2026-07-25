import type { LoginUser } from "zs-phone-common"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    user: LoginUser | null,
    setUser: (user: LoginUser | null) => void
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user: user })
        }),
        {
            name: "user-data"
        }
    )
)