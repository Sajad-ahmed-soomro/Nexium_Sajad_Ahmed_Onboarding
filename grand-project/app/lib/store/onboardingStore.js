import { create } from "zustand";

export const useOnboardingStore = create((set) => ({
  name: "",
  focus: "",
  setName: (name) => set({ name }),
  setFocus: (focus) => set({ focus }),
}));
