"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Uiverse-style slider toggle (by namecho). Checked = light mode; unchecked =
 * dark. Reads/updates the shared theme context, which manages the `.light`
 * class on <html> and persists the choice.
 */
export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <label className="theme-switch" title={isLight ? "Switch to dark" : "Switch to light"}>
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggle}
        aria-label="Toggle light mode"
      />
      <span className="theme-slider" />
    </label>
  );
}
