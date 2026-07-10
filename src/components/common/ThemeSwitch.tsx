"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Animated sun/moon theme toggle. The two icons cross-morph — rotate, scale
 * and fade — over 300ms. Dark (cosmic) is the default; light is opt-in via
 * the shared ThemeProvider, which manages the `.light` class on <html>,
 * persists the choice, and respects the system preference until overridden.
 */
export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className="sunmoon"
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Sun size={17} className="sm-icon sm-sun" aria-hidden />
      <Moon size={16} className="sm-icon sm-moon" aria-hidden />
    </button>
  );
}
