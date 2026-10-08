"use client";

import { useEffect, useRef } from "react";

/**
 * Counts the first number in `value` up from zero once, on load. The final
 * value is server-rendered, so the figure is correct without JS, there is no
 * layout shift (tabular figures, same characters), and nothing animates
 * under reduced motion or on phone and tablet widths.
 */
export function CountUp({ value, duration = 1100, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones: show the final figure at once. Counting delays the hero's
    // largest paint by seconds on a mid-range CPU.
    if (window.matchMedia("(max-width: 1023.98px)").matches) return;
    const m = value.match(/(\d+(?:\.\d+)?)/);
    if (!m || m.index === undefined) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split(".")[1] || "").length;
    const before = value.slice(0, m.index);
    const after = value.slice(m.index + m[1].length);

    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = before + (target * eased).toFixed(decimals) + after;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const id = window.setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { window.clearTimeout(id); cancelAnimationFrame(raf); el.textContent = value; };
  }, [value, duration, delay]);

  return <span ref={ref}>{value}</span>;
}
