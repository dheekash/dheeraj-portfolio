"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

/**
 * Light is the default; dark (cosmic) is opt-in via the absence of a
 * `.light` class on <html> being flipped — i.e. dark shows only when the
 * user picks it or the OS reports a dark preference. A small inline script
 * in layout.tsx applies the stored choice (or the system preference when
 * nothing is stored) before paint; this provider syncs React state to it and
 * enables the cross-fade transition class only after hydration so the first
 * paint is instant.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains("light") ? "light" : "dark");
    // Defer enabling transitions until after first paint
    const id = requestAnimationFrame(() => root.classList.add("theme-ready"));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
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
