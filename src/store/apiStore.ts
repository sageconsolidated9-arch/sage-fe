import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApiState {
  isAuthenticated: boolean;
  globalError: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setGlobalError: (error: string | null) => void;
  clearAuth: () => void;
}

export const useApiStore = create<ApiState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      globalError: null,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setGlobalError: (globalError) => set({ globalError }),
      clearAuth: () => set({ isAuthenticated: false, globalError: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
      // Only persist isAuthenticated, NOT globalError or anything sensitive
    },
  ),
);
