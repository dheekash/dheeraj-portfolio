"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Neumorphic sliding theme toggle. A glowing blue thumb springs between a sun
 * (light) and a moon (dark) over a soft embossed track. Dark is the default;
 * light is opt-in via the shared ThemeProvider, which manages the `.light`
 * class on <html>, persists the choice, and respects the system preference
 * until overridden. The thumb slide is driven by CSS (position keyed off the
 * `.light` class); only the thumb's icon is swapped in React.
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

      {/* Glowing thumb — CSS slides it right in dark mode */}
      <span className="tt-thumb">
        {isDark ? (
          <Moon size={12} className="tt-thumb-icon" fill="currentColor" aria-hidden />
        ) : (
          <Sun size={12} className="tt-thumb-icon" aria-hidden />
        )}
      </span>
    </button>
  );
}
