"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only custom cursor: a small dot that trails toward the pointer
 * and expands into a ring over interactive elements. Disabled for touch
 * and reduced-motion. Pure transform animation, no React re-renders.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = "a, button, [role='button'], input, textarea, select, label";
    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest?.(interactive)) ring.classList.add("cursor-ring--active");
    };
    const onOut = (e: Event) => {
      if ((e.target as Element)?.closest?.(interactive)) ring.classList.remove("cursor-ring--active");
    };
    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      visible = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} aria-hidden className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
