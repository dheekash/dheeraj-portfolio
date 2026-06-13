"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Understand the business question", note: "What decision is actually being made — and what does it cost to get it wrong?" },
  { num: "02", title: "Identify decision makers", note: "Who acts on the answer, in what meeting, on what cadence." },
  { num: "03", title: "Define success metrics", note: "Agree the number that proves it worked, before any code is written." },
  { num: "04", title: "Build trustworthy data foundations", note: "Tested pipelines, versioned transformations, lineage that survives audit." },
  { num: "05", title: "Design executive-ready reporting", note: "One governed semantic layer; every audience reads the same truth." },
  { num: "06", title: "Drive adoption and action", note: "An unused dashboard is a failed project. Adoption is the deliverable." },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/**
 * The framework as a connected circuit: a 2×3 grid threaded by a signal
 * rail, each node numbered like a schematic — not six text cards.
 */
export function ThoughtProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 55% at 20% 35%, var(--nebula-2) 0%, transparent 70%)" }}
      />
      <div className="container-page section-pad relative">
        <motion.p {...reveal()} className="eyebrow mb-4">Method</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[16ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          How I solve data problems.
        </motion.h2>

        <div className="relative">
          {/* Signal rail behind the grid (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-1/2 h-px"
            style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 40%, transparent) 15%, color-mix(in srgb, var(--primary) 40%, transparent) 85%, transparent)" }}
          />

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2rem,3vw,3rem)] relative">
            {steps.map((s, i) => (
              <motion.li key={s.num} {...reveal(0.05 + i * 0.06)} className="relative">
                {/* Node marker */}
                <div className="flex items-center gap-4 mb-3.5">
                  <span className="relative flex items-center justify-center w-[2.6rem] h-[2.6rem] rounded-full border border-border bg-background font-mono text-xs accent-text shrink-0">
                    {s.num}
                    <span aria-hidden className="absolute inset-0 rounded-full border border-primary/25 scale-125" />
                  </span>
                  <span aria-hidden className="hairline flex-1 hidden sm:block" />
                </div>
                <h3 className="text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] font-semibold mb-2 max-w-[22ch]">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[36ch]">{s.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
