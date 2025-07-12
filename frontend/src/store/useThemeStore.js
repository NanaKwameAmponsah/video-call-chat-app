import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("MindSwap-theme") || "synthwave",
    setTheme: (theme) => {localStorage.setItem("MindSwap-theme", theme);
    set({ theme })},
}));