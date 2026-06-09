"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollEffects — two layered premium scroll animations:
 *
 * 1. Thin progress bar at the very top of the viewport (fills as you scroll)
 * 2. Velocity skew — the <main> element tilts slightly on fast scroll,
 *    snaps back with an elastic ease when you stop.
 *    Signature effect from Linear / Vercel landing pages.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    /* ── 1. SCROLL PROGRESS BAR ── */
    const bar = barRef.current;

    const updateBar = () => {
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();

    /* ── 2. VELOCITY SKEW ── */
    const main = document.querySelector("main") as HTMLElement | null;
    if (!main) return;

    // We track scroll velocity via a proxy object
    const proxy = { y: 0 };
    let lastY = window.scrollY;
    let skewSetter = gsap.quickSetter(main, "skewY", "deg");
    let clamp = gsap.utils.clamp(-6, 6);

    const onScroll = () => {
      const currentY = window.scrollY;
      const velocity = (currentY - lastY) * 0.06; // scale factor → max ±~6°
      lastY = currentY;
      skewSetter(clamp(velocity));
    };

    // Elastic snap-back: use a slow tween that always goes toward 0
    const snapBack = gsap.to(proxy, {
      y: 0,
      ease: "power3.out",
      duration: 0.8,
      paused: true,
      onUpdate: () => skewSetter(proxy.y),
    });

    let snapTimer: ReturnType<typeof setTimeout>;
    const onScrollWithSnap = () => {
      const currentY = window.scrollY;
      const velocity = (currentY - lastY) * 0.06;
      lastY = currentY;
      skewSetter(clamp(velocity));

      // After scroll stops for 120 ms, snap back to 0
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        proxy.y = clamp(velocity);
        snapBack.restart();
      }, 120);
    };

    window.addEventListener("scroll", onScrollWithSnap, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateBar);
      window.removeEventListener("scroll", onScrollWithSnap);
      clearTimeout(snapTimer);
      snapBack.kill();
      // Reset skew on unmount
      gsap.set(main, { skewY: 0 });
    };
  }, []);

  return (
    /* Scroll progress bar — fixed at very top, above navbar */
    <div
      className="fixed top-0 left-0 z-[9999] h-[3px] w-0 pointer-events-none"
      ref={barRef}
      style={{
        background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
        boxShadow: "0 0 12px rgba(99,102,241,0.7)",
        transition: "width 0.05s linear",
      }}
    />
  );
}
