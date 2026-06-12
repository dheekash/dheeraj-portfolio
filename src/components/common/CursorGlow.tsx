"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-following radial gradient. Pointer-events: none, GPU-composited,
 * disabled for touch devices and reduced-motion users.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = -200;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
          raf = 0;
        });
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden lg:block w-[800px] h-[800px] rounded-full opacity-100 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(77,141,255,0.045) 0%, rgba(34,211,238,0.02) 35%, transparent 70%)",
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
    />
  );
}
