"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/**
 * Editorial figures spread — one dominant number, the rest set like a
 * ruled annual-report margin column. Deliberately asymmetric.
 */
export function ImpactSection() {
  return (
    <section id="impact">
      <div className="container-page section-pad">
        <motion.div {...reveal()} className="rule-thick pt-4 flex items-baseline justify-between gap-6 mb-[clamp(2.5rem,4vw,4.5rem)]">
          <p className="eyebrow">Impact, measured</p>
          <p className="eyebrow hidden sm:block">2019 — present</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,4vw,5rem)] gap-y-[clamp(2.5rem,4vw,4rem)] items-end">
          {/* Dominant figure */}
          <motion.div {...reveal(0.05)} className="lg:col-span-5">
            <div className="font-mono tabular-nums font-semibold tracking-tight leading-none text-[clamp(5rem,3rem+9vw,12rem)]">
              5M<span className="accent-text">+</span>
            </div>
            <p className="mt-4 max-w-[34ch] text-muted-foreground leading-relaxed">
              Daily transactions processed through Lakehouse pipelines I&apos;ve
              architected — at 99.9% reliability.
            </p>
          </motion.div>

          {/* Secondary figures, ruled column */}
          <motion.div {...reveal(0.12)} className="lg:col-span-4">
            {[
              { v: "7+", l: "Years experience across analytics & data platforms" },
              { v: "15+", l: "Countries supported from single governed models" },
              { v: "20+", l: "Enterprise data products delivered end-to-end" },
            ].map((f) => (
              <div key={f.v} className="border-t border-border py-[clamp(1rem,1.5vw,1.5rem)] flex items-baseline gap-6">
                <span className="font-mono tabular-nums font-semibold tracking-tight text-[clamp(2rem,1.5rem+1.8vw,3.25rem)] shrink-0 min-w-[3ch]">
                  {f.v}
                </span>
                <span className="text-sm text-muted-foreground leading-snug">{f.l}</span>
              </div>
            ))}
          </motion.div>

          {/* Tertiary, offset */}
          <motion.div {...reveal(0.18)} className="lg:col-span-3">
            {[
              { v: "100+", l: "DAX measures in production semantic models" },
              { v: "100%", l: "Client retention rate" },
            ].map((f) => (
              <div key={f.v} className="border-t border-border py-[clamp(1rem,1.5vw,1.5rem)]">
                <span className="font-mono tabular-nums font-semibold tracking-tight text-[clamp(1.75rem,1.4rem+1.4vw,2.75rem)] accent-text">
                  {f.v}
                </span>
                <p className="mt-1.5 text-sm text-muted-foreground leading-snug">{f.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
