"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollEffects — four layered premium scroll animations (Auxia-style):
 *
 * 1. Lenis smooth scroll — buttery inertia scrolling (smooth: 1.2)
 * 2. Thin progress bar at viewport top (fills as you scroll)
 * 3. Velocity skew — <main> tilts on fast scroll, elastic snap-back
 * 4. Section reveals — each section's children fade + blur + slide up
 *    on scroll entry (GSAP ScrollTrigger, power4.out)
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    /* ── 1. LENIS SMOOTH SCROLL ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Pump Lenis through GSAP's RAF for perfect sync
    const lenisTickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTickerCb);
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger with Lenis scroll position
    lenis.on("scroll", () => ScrollTrigger.update());

    /* ── 2. SCROLL PROGRESS BAR ── */
    const bar = barRef.current;
    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      if (!bar) return;
      const pct = limit > 0 ? (scroll / limit) * 100 : 0;
      bar.style.width = `${pct}%`;
    });

    /* ── 3. VELOCITY SKEW ── */
    const main = document.querySelector("main") as HTMLElement | null;
    let skewSetter: ((val: number) => void) | null = null;
    let snapBack: gsap.core.Tween | null = null;
    let snapTimer: ReturnType<typeof setTimeout>;

    if (main) {
      const proxy = { y: 0 };
      let lastScrollY = 0;
      skewSetter = gsap.quickSetter(main, "skewY", "deg") as (val: number) => void;
      const clamp = gsap.utils.clamp(-2.5, 2.5);

      snapBack = gsap.to(proxy, {
        y: 0,
        ease: "power3.out",
        duration: 0.8,
        paused: true,
        onUpdate: () => skewSetter!(proxy.y),
      });

      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        const velocity = (scroll - lastScrollY) * 0.05;
        lastScrollY = scroll;
        skewSetter!(clamp(velocity));

        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          proxy.y = clamp(velocity);
          snapBack!.restart();
        }, 120);
      });
    }

    /* ── 4. PARALLAX BACKGROUNDS ── */
    // Elements with data-parallax="<yPercent>" drift at a different speed than scroll.
    // Negative values = float upward slower than content (classic depth illusion).
    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    parallaxEls.forEach((el) => {
      const yPct = parseFloat(el.getAttribute("data-parallax") ?? "0");
      if (isNaN(yPct) || yPct === 0) return;
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: yPct,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    /* ── 5. SECTION REVEALS ── */
    // Auxia-style: each section's direct children animate in from
    // y: 32, opacity: 0, blur(5px) → visible, staggered, power4.out
    const sections = document.querySelectorAll("section");

    const revealTriggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      // Animate the section container itself
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // First: the section wrapper slides up
      tl.fromTo(
        section,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        0
      );

      // Then: direct children (headings, paragraphs, cards, grids) stagger in
      const children = Array.from(section.children) as HTMLElement[];
      if (children.length > 0) {
        tl.fromTo(
          children,
          { y: 32, opacity: 0, filter: "blur(5px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.06,
            ease: "power4.out",
            clearProps: "filter",
          },
          0.1
        );
      }
    });

    return () => {
      gsap.ticker.remove(lenisTickerCb);
      lenis.destroy();
      clearTimeout(snapTimer);
      snapBack?.kill();
      if (main) gsap.set(main, { skewY: 0 });
      revealTriggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[9999] h-[3px] w-0 pointer-events-none"
      style={{
        background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
        boxShadow: "0 0 12px rgba(99,102,241,0.7)",
        transition: "width 0.05s linear",
      }}
    />
  );
}
