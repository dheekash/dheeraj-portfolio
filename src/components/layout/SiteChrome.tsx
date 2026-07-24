"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollExperience } from "@/components/common/ScrollExperience";

/* Scroll progress ring — fills with the brand gradient as the page scrolls,
   doubles as a back-to-top control once enough of the page has been read. */
const RING_R = 17;

function BackToTop() {
  const [visible, setVisible] = useState(false);

  /* Progress rides a motion value straight onto the SVG, so scrolling never
     re-renders this subtree. */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full panel flex items-center justify-center text-muted-foreground hover:text-foreground transition-[opacity,transform,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={RING_R} fill="none" stroke="var(--hairline)" strokeWidth="2" />
        <motion.circle
          cx="20"
          cy="20"
          r={RING_R}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: progress }}
        />
      </svg>
      <ArrowUp size={15} className="relative" />
    </button>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIsolated = pathname.startsWith("/deck");

  if (isIsolated) {
    return <>{children}</>;
  }

  return (
    /* reducedMotion="user" strips transform animations app-wide when the OS
       asks for it, keeping opacity so content still reads as arriving.
       Every motion component inherits this — no per-component branches. */
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      {/* Ambient atmosphere — static dot grid, single restrained glow.
          The 90px-blur aurora and the full-screen noise overlay are both
          expensive to raster; they are desktop-only decoration and buy
          nothing on a phone, so they are gated behind md. */}
      <div className="cosmos-dots" aria-hidden />
      <div aria-hidden className="hidden md:block fixed inset-0 -z-[1] pointer-events-none overflow-hidden">
        <span className="aurora w-[38vw] h-[38vw] -top-[10%] -right-[6%]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)" }} />
      </div>
      <div className="grain hidden md:block" aria-hidden />
      <ScrollExperience />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
