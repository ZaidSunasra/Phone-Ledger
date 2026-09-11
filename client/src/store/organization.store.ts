import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationState {
    selectedOrganization: string | null;
    setSelectedOrganization: (id: string) => void;
    clearOrganization: () => void
}

export const useOrganization = create<OrganizationState>()(
    persist(
        (set) => ({
            selectedOrganization: null,

            setSelectedOrganization: (id) =>
                set({ selectedOrganization: id }),

            clearOrganization: () => set({ selectedOrganization: null })
        }),
        {
            name: "selected-organization",
        }
    )
);