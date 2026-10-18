"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { syncThemeColor } from "@/components/providers/ThemeProvider";

/* The palettes in globals.css (":root[data-palette=…]"). Swatches are the
   page, text and accent colours, for the menu only. */
export const PALETTES = [
  { id: "void", name: "Void and iris", swatch: ["#000000", "#8052FF", "#FFB829"] },
  { id: "dusk", name: "Dusk and glass", swatch: ["#0A0A0A", "#E0855A", "#2F52D6"] },
] as const;
type PaletteId = (typeof PALETTES)[number]["id"];

/** Applies a palette to <html> and remembers it. Void is the default. */
function applyPalette(id: PaletteId) {
  document.documentElement.setAttribute("data-palette", id);
  syncThemeColor(document.documentElement.classList.contains("dark") ? "dark" : "light");
  try {
    localStorage.setItem("palette", id);
  } catch {}
}

/**
 * Palette button for the nav: opens a small menu of the palettes. Arrow
 * keys move between options, Escape or a click outside closes it, and focus
 * returns to the button.
 */
export function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<PaletteId>("void");
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const id = document.documentElement.getAttribute("data-palette") as PaletteId | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs state to the pre-paint attribute
    if (id && PALETTES.some((p) => p.id === id)) setCurrent(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const i = PALETTES.findIndex((p) => p.id === current);
    options.current[Math.max(0, i)]?.focus();
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, current]);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  const choose = (id: PaletteId) => {
    applyPalette(id);
    setCurrent(id);
    close();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const i = options.current.findIndex((el) => el === document.activeElement);
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (step) {
      e.preventDefault();
      options.current[(i + step + PALETTES.length) % PALETTES.length]?.focus();
    }
  };

  return (
    <div className="pal" ref={wrap}>
      <button
        ref={button}
        type="button"
        className="nav-icon-btn pal-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change colour palette"
        title="Colour palette"
        onClick={() => setOpen((o) => !o)}
      >
        <Palette size={18} aria-hidden />
      </button>
      {open && (
        <div className="pal-menu" role="group" aria-label="Colour palettes" onKeyDown={onKey}>
          {PALETTES.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => { options.current[i] = el; }}
              type="button"
              className="pal-opt"
              aria-pressed={p.id === current}
              onClick={() => choose(p.id)}
            >
              <span className="pal-sw" aria-hidden>
                {p.swatch.map((c) => <span key={c} style={{ background: c }} />)}
              </span>
              {p.name}
              {p.id === current && <Check size={16} aria-hidden className="pal-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
