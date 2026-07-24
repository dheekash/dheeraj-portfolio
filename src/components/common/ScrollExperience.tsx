"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Smooth scroll + the site's single scroll-progress indicator.
 *
 * Progress rides a motion value straight onto a scaleX transform, so it is
 * composited on the GPU and never re-renders React. (This previously held
 * progress in useState, which re-rendered the component every scroll frame.)
 *
 * The bar lives here rather than in the navbar because the navbar hides on
 * scroll-down, and a progress bar that vanishes mid-scroll is worse than none.
 *
 * Lenis is skipped entirely under prefers-reduced-motion: intercepting native
 * scroll is itself motion, and that is what the setting asks us not to do.
 */
export function ScrollExperience() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (reduce) return;

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

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{ scaleX: progress, background: "var(--primary)" }}
    />
  );
}
