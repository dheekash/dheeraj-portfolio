"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
    >
      <Sun size={16} className="dark:hidden" />
      <Moon size={16} className="hidden dark:block" />
    </button>
  );
}
