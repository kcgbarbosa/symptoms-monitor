import { create } from "zustand";

const THEME_STORAGE_KEY = "theme";

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    get().setTheme(get().theme === "dark" ? "light" : "dark");
  },
}));
