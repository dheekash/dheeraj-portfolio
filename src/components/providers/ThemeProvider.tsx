"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

/**
 * Light (Paper blueprint) is the default. Dark is the charcoal twin, opt-in
 * via a `.dark` class on <html>. A small inline script in layout.tsx applies
 * the stored class before paint; this provider syncs React state to it and
 * enables the cross-fade transition class only after hydration so the first
 * paint is instant.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains("dark") ? "dark" : "light");
    // Defer enabling transitions until after first paint
    const id = requestAnimationFrame(() => root.classList.add("theme-ready"));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
