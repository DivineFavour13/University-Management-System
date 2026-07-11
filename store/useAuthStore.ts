import { create } from "zustand";
import type { UserRole } from "@/types";

interface AuthStore {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
