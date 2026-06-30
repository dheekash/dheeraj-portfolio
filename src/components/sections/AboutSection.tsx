"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="mb-6">
          About me
        </motion.h2>
        <motion.p
          {...reveal(0.05)}
          className="text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-muted-foreground max-w-[60ch] text-pretty mb-4"
        >
          I started in customer support — the data told a different story than the reports, so I switched to analytics.
          Seven years later, I build Lakehouse platforms, semantic models, and pipelines for enterprise clients across 15 countries.
          My focus is simple: does the dashboard answer the question it was built to answer?
        </motion.p>
        <motion.p
          {...reveal(0.1)}
          className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/55"
        >
          Bengaluru, India · IST (UTC+5:30)
        </motion.p>
      </div>
    </section>
  );
}
