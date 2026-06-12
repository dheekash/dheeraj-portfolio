"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function IntroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(129,140,248,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="container-page section-pad relative">
        <motion.span
          {...reveal()}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] font-mono uppercase tracking-[0.2em] text-secondary-foreground mb-[clamp(1.5rem,2.5vw,2.5rem)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Enterprise Analytics
        </motion.span>

        <motion.h2 {...reveal(0.08)} className="ink-fade max-w-[18ch] mb-[clamp(1.75rem,3vw,2.75rem)]">
          Analytics that drive decisions, not dashboards.
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)] max-w-5xl">
          <motion.p {...reveal(0.14)} className="text-[clamp(1.05rem,1rem+0.5vw,1.3rem)] leading-relaxed text-foreground/90">
            The most valuable analytics systems do not simply visualize data.
            <span className="signal-text font-medium"> They create clarity.</span>
          </motion.p>
          <motion.p {...reveal(0.2)} className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-muted-foreground">
            From executive reporting and forecasting to Lakehouse modernization
            and enterprise-scale governance, my work helps organizations move
            faster, reduce complexity, and make better decisions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
