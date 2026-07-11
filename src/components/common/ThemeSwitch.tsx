"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Neumorphic sliding theme toggle. A glowing blue thumb springs between a sun
 * (light) and a moon (dark) over a soft embossed track, spinning and
 * cross-fading between the two icons as it travels. Dark is the default;
 * light is opt-in via the shared ThemeProvider, which manages the `.light`
 * class on <html>, persists the choice, and respects the system preference
 * until overridden. Both icons stay mounted at all times — the slide,
 * rotation, and cross-fade are driven entirely by CSS keyed off the `.light`
 * class, so nothing has to be conditionally swapped in React.
 */
export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle"
    >
      {/* Static side icons — the uncovered one shows muted */}
      <Sun size={12} className="tt-side tt-side-l" aria-hidden />
      <Moon size={12} className="tt-side tt-side-r" aria-hidden />

      {/* Glowing thumb — CSS slides + spins it, icons cross-fade underneath */}
      <span className="tt-thumb">
        <Sun size={12} className="tt-thumb-icon tt-sun" aria-hidden />
        <Moon size={12} className="tt-thumb-icon tt-moon" fill="currentColor" aria-hidden />
      </span>
    </button>
  );
}
