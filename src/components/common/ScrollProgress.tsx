"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading-progress bar at the very top of the page. Where the browser
 * supports scroll-driven animations the bar is pure CSS; elsewhere one
 * passive, frame-throttled scroll listener sets its scale. Decorative, so
 * hidden from assistive technology.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()")) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden />;
}
