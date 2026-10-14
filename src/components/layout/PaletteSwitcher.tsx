"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";

/* The palettes in globals.css (":root[data-palette=…]"). Swatches are the
   page, text and accent colours, for the menu only. */
export const PALETTES = [
  { id: "editorial", name: "Editorial", swatch: ["#F7F6F2", "#20231F", "#237A57"] },
  { id: "brass", name: "Executive brass", swatch: ["#FAF9F6", "#242321", "#B58A52"] },
  { id: "saffron", name: "Midnight saffron", swatch: ["#F6F5F1", "#14213D", "#E0A526"] },
  { id: "teal", name: "Petrol teal", swatch: ["#F3F6F6", "#16262E", "#0F6B73"] },
  { id: "oxblood", name: "Oxblood", swatch: ["#F5F2EC", "#1F1D1B", "#7A1F2B"] },
  { id: "lavender", name: "Modern lavender", swatch: ["#F4F2F8", "#25212D", "#9B8AFB"] },
] as const;
type PaletteId = (typeof PALETTES)[number]["id"];

/** Applies a palette to <html> and remembers it. Editorial is the default and needs no attribute. */
function applyPalette(id: PaletteId) {
  const root = document.documentElement;
  if (id === "editorial") root.removeAttribute("data-palette");
  else root.setAttribute("data-palette", id);
  try {
    localStorage.setItem("palette", id);
  } catch {}
}

/**
 * Palette button for the nav: opens a small menu of the six palettes. Arrow
 * keys move between options, Escape or a click outside closes it, and focus
 * returns to the button.
 */
export function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<PaletteId>("editorial");
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
