import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Pointer-driven 3D tilt. Attach onPointerMove={onTiltMove} and
 * onPointerLeave={onTiltLeave} to a card; it perspective-rotates toward the
 * cursor and springs back on leave. Direct style mutation — no React
 * re-renders. Coarse pointers get nothing (transform stays unset).
 */
const MAX_TILT = 6; // degrees

export function onTiltMove(e: ReactPointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg)`;
  el.style.transition = "transform 0.08s ease-out";
}

export function onTiltLeave(e: ReactPointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
}
