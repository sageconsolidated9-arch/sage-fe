import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  token: string;
  mail: string;
  name: string;
  username: string;
}

interface AuthState {
  user: User | null; // full user object
  setUser: (u: User) => void; // write everything
  logout: () => void; // clear everything
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      logout: () => set({ user: null }),
    }),
    { name: "auth" } // still persisted to localStorage
  )
);
