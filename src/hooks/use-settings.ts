import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  animation: string;
  setAnimation: (animation: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      animation: "flip", // default animation
      setAnimation: (animation) => set({ animation }),
    }),
    {
      name: "settings-storage", // name of the item in the storage (must be unique)
    }
  )
);
