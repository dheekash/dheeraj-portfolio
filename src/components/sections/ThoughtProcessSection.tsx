"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "I start with the business problem, not the data problem.",
    note: "Before touching a dataset, I ask: what decision is this meant to support, and what does it cost the business to get it wrong?",
  },
  {
    num: "02",
    title: "I define what success looks like before writing a line of code.",
    note: "I agree on the metric that proves the project worked, with the stakeholder, before any engineering begins.",
  },
  {
    num: "03",
    title: "I build data foundations that survive audit.",
    note: "Tested pipelines, version-controlled transformations, full lineage, so the number in the dashboard is one people will actually stake a decision on.",
  },
  {
    num: "04",
    title: "I measure adoption, not just delivery.",
    note: "An unused dashboard is a failed project. I stay involved until the reporting is embedded in the team's real workflow.",
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function ThoughtProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 55% at 20% 35%, var(--nebula-2) 0%, transparent 70%)" }}
      />
      <div className="container-page section-pad relative">
        <motion.h2 {...reveal()} className="max-w-[16ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          My approach
        </motion.h2>

        <ol className="space-y-0 max-w-4xl">
          {steps.map((s, i) => (
            <motion.li
              key={s.num}
              {...reveal(0.06 + i * 0.08)}
              className={`grid md:grid-cols-[6rem_1fr] gap-x-8 gap-y-2 py-[clamp(1.5rem,2.5vw,2.5rem)] ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex items-start gap-3 md:gap-0 md:pt-0.5">
                <span className="font-mono text-[clamp(2rem,1.5rem+1.5vw,3rem)] font-bold tabular-nums leading-none accent-text">
                  {s.num}
                </span>
              </div>
              <div>
                <h3 className="text-[clamp(1.05rem,1rem+0.5vw,1.3rem)] font-semibold leading-snug mb-2 max-w-[46ch]">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[52ch]">{s.note}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

