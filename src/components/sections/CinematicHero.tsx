"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DataStreamCanvas } from "@/components/common/DataStreamCanvas";
import { profile } from "@/data/profile";

const headlines = [
  <>Turning complex data into <span className="signal-text">business growth.</span></>,
  <>Building decision systems, <span className="signal-text">not dashboards.</span></>,
  <>Architecting data platforms <span className="signal-text">that scale.</span></>,
  <>Where data engineering meets <span className="signal-text">business impact.</span></>,
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
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 4600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden min-h-[min(58rem,100svh)] flex items-center">
      {/* Living data topology */}
      <div aria-hidden className="absolute inset-0">
        <DataStreamCanvas />
      </div>
      {/* Atmosphere: signal nebula + vignette so copy stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 70% 22%, rgba(56,189,248,0.13) 0%, rgba(129,140,248,0.06) 45%, transparent 72%), radial-gradient(ellipse 90% 70% at 30% 80%, rgba(7,8,11,0.92) 0%, rgba(7,8,11,0.45) 55%, transparent 100%)",
        }}
      />

      <div className="container-page relative py-[clamp(6rem,4rem+8vw,10rem)]">
        <motion.p {...fadeUp(0)} className="eyebrow mb-[clamp(1.25rem,2vw,2rem)]">
          Dheeraj Kashyap · BI &amp; Analytics Engineer
        </motion.p>

        {/* Rotating headline — fixed block height so layout never shifts */}
        <div className="relative mb-[clamp(1.75rem,3vw,2.5rem)] min-h-[2.1em]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="ink-fade max-w-[16ch]"
            >
              {headlines[idx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          {...fadeUp(0.15)}
          className="max-w-[58ch] text-[clamp(1rem,0.9rem+0.5vw,1.2rem)] leading-relaxed text-muted-foreground mb-[clamp(2rem,3vw,3rem)]"
        >
          7+ years architecting enterprise data platforms, Lakehouse ecosystems,
          and executive reporting products across e-commerce, manufacturing,
          consulting, and global marketplaces — trusted by stakeholders in 15+
          countries to turn fragmented data into measurable outcomes.
        </motion.p>

        <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] mb-[clamp(2.5rem,4vw,4rem)]">
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            View Case Studies <ArrowRight size={15} />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full glass text-sm font-medium text-foreground hover:border-foreground/25 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
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
