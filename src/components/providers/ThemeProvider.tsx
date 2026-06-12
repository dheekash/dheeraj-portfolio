"use client";

import { createContext, useContext, useEffect } from "react";

// Single editorial light theme. Context kept for API compatibility.
const ThemeContext = createContext<{ theme: "light"; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
