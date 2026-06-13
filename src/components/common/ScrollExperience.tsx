"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll + a thin top progress bar. Both bail out cleanly
 * under prefers-reduced-motion (native scroll, no bar animation), and the
 * progress bar is GPU-composited via scaleX transform only.
 */
export function ScrollExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };

    if (reduced) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    lenis.on("scroll", update);
    update();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        transform: `scaleX(${progress})`,
        background: "linear-gradient(90deg, var(--primary), color-mix(in srgb, var(--primary) 40%, transparent))",
      }}
    />
  );
}
