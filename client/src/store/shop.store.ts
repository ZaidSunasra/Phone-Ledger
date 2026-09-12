import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ShopState {
  selectedShop: string | null
  setSelectedShop: (id: string) => void
  clearShop: () => void
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      selectedShop: null,

      setSelectedShop: (id) => set({ selectedShop: id }),

      clearShop: () => set({ selectedShop: null }),
    }),
    {
      name: "selected-shop",
    }
  )
)
