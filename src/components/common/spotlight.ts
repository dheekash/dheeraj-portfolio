import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Pointer-move handler that feeds a cursor-following radial glow. Writes the
 * pointer's position (relative to the element) into --mx / --my CSS variables,
 * which the `.spotlight` class reads in a ::before radial-gradient. No React
 * re-render — it mutates style directly, so it's safe on hot paths and works
 * on any element, including framer-motion components.
 *
 * Pair with the `spotlight` className.
 */
export function onSpotlightMove(e: ReactPointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
