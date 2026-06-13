"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DataStreamCanvas } from "@/components/common/DataStreamCanvas";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const headlines = [
  <>Where data engineering meets <span className="accent-text">business impact.</span></>,
  <>Turning complex data into <span className="accent-text">business growth.</span></>,
  <>Building decision systems, <span className="accent-text">not dashboards.</span></>,
  <>Architecting data platforms <span className="accent-text">that scale.</span></>,
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CinematicHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden min-h-[min(56rem,100svh)] flex items-center">
      {/* Living data topology */}
      <div aria-hidden className="absolute inset-0">
        <DataStreamCanvas />
      </div>
      {/* Theme-aware atmosphere + legibility wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 72% 20%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%), linear-gradient(100deg, var(--background) 8%, color-mix(in srgb, var(--background) 55%, transparent) 55%, transparent 100%)",
        }}
      />

      <div className="container-page relative py-[clamp(6.5rem,4rem+8vw,11rem)]">
        <motion.p {...fadeUp(0)} className="eyebrow mb-[clamp(1.25rem,2vw,2rem)]">
          Dheeraj Kashyap · Business Analyst @ Amplify Analytix · 13× Certified
        </motion.p>

        {/* Rotating headline — reserved block height, no layout shift */}
        <div className="relative mb-[clamp(1.75rem,3vw,2.5rem)] min-h-[2.05em] [font-size:clamp(3rem,1.5rem+6.5vw,8rem)]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title ink-fade max-w-[15ch]"
            >
              {headlines[idx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          {...fadeUp(0.15)}
          className="max-w-[58ch] leading-relaxed text-muted-foreground mb-[clamp(2rem,3vw,3rem)]"
        >
          I turn raw, messy data into pipelines, dashboards, and decisions.
          Across BI, data engineering, and machine learning, I design Lakehouse
          platforms, build CI/CD data environments, and deliver end-to-end
          reporting that global teams depend on daily — built on Microsoft
          Fabric, Databricks, Snowflake, and Power BI.
        </motion.p>

        <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] mb-[clamp(2.5rem,4vw,4rem)]">
          <MagneticButton
            href="#case-studies"
            className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            View Case Studies <ArrowRight size={15} />
          </MagneticButton>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium text-foreground hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            Download Resume <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.p {...fadeUp(0.4)} className="font-mono text-[clamp(0.65rem,0.6rem+0.2vw,0.8rem)] tracking-[0.22em] uppercase text-muted-foreground/70">
          Power BI · Microsoft Fabric · Databricks · Snowflake
        </motion.p>
      </div>
    </section>
  );
}
