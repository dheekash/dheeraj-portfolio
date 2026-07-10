"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Uiverse-style slider toggle (by namecho), squared for the blueprint system.
 * Checked = dark (charcoal twin); unchecked = light paper default. Reads and
 * updates the shared theme context, which manages the `.dark` class on <html>
 * and persists the choice.
 */
export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <label className="theme-switch" title={isDark ? "Switch to light" : "Switch to dark"}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggle}
        aria-label="Toggle dark mode"
      />
      <span className="theme-slider" />
    </label>
  );
}
