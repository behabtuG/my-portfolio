import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "light", // Default before hydration
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
      }
      return { theme: newTheme };
    }),
}));

// ✅ Hydrate state from localStorage on mount
export const useHydrateTheme = () => {
  const setTheme = useThemeStore((state) => state.setTheme);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
    }
  }, []);
};

export default useThemeStore;
