import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OtpState {
    resendAvailableAt: number | null;
    setResendAvailableAt: (timestamp: number) => void;
    clearResendAvailableAt: () => void;
}

export const useOtpStore = create<OtpState>()(
    persist(
        (set) => ({
            resendAvailableAt: null,
            setResendAvailableAt: (timestamp) => set({ resendAvailableAt: timestamp }),
            clearResendAvailableAt: () => {
                set({ resendAvailableAt: null });
                localStorage.removeItem("otp-storage")
            }
        }),
        {
            name: "otp-storage",
            partialize: (state) => ({
                resendAvailableAt: state.resendAvailableAt
            })
        }
    )
);