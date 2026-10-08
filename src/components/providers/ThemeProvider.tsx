"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

/* Keeps <meta name="theme-color"> on the page background so browser chrome
   matches the page. Values mirror --paper in globals.css. */
const THEME_COLOR: Record<Theme, string> = { light: "#F5F7FC", dark: "#020B2B" };

function syncThemeColor(theme: Theme) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "theme-color";
    document.head.appendChild(tag);
  }
  tag.content = THEME_COLOR[theme];
}

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

/**
 * Light is the default and needs no class. Dark is opt-in: an inline script
 * in layout.tsx adds `.dark` to <html> before paint when the visitor chose it
 * on an earlier visit. This provider mirrors that into React state.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs state to the pre-paint class
    setTheme(current);
    syncThemeColor(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    syncThemeColor(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
