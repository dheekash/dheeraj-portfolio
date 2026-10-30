"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { syncThemeColor } from "@/components/providers/ThemeProvider";

/* The palettes in globals.css (":root[data-palette=…]"), in the order the
   button cycles through them. Mercury is the default and is rendered on
   <html> by the server. */
export const PALETTES = [
  { id: "mercury", name: "Mercury" },
  { id: "void", name: "Void" },
  { id: "dusk", name: "Dusk" },
] as const;
type PaletteId = (typeof PALETTES)[number]["id"];

/** Applies a palette to <html> and remembers it. */
function applyPalette(id: PaletteId) {
  document.documentElement.setAttribute("data-palette", id);
  syncThemeColor(document.documentElement.classList.contains("dark") ? "dark" : "light");
  try {
    localStorage.setItem("palette", id);
  } catch {}
}

/**
 * One-click palette button for the nav: steps to the next palette
 * (Mercury → Void → Dusk → Mercury). Like the theme button, its label
 * names the palette it switches to.
 */
export function PaletteSwitcher() {
  const [current, setCurrent] = useState<PaletteId>("mercury");

  // Follow <html data-palette>: set before paint, and changed by either copy
  // of this button (the nav renders one for wide and one for narrow screens).
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const id = root.getAttribute("data-palette");
      setCurrent(PALETTES.find((p) => p.id === id)?.id ?? "mercury");
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-palette"] });
    return () => mo.disconnect();
  }, []);

  const next = PALETTES[(PALETTES.findIndex((p) => p.id === current) + 1) % PALETTES.length];

  return (
    <button
      type="button"
      className="nav-icon-btn pal-btn"
      data-to={next.id}
      aria-label={`Switch to ${next.name} palette`}
      title={`${next.name} palette`}
      onClick={() => applyPalette(next.id)}
    >
      <Palette size={18} aria-hidden />
    </button>
  );
}
