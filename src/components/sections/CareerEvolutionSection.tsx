"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = [
  {
    label: "Customer Operations",
    org: "Frontizo · 2019–2020",
    impact: "Optimised support processes to lift first-contact resolution and CSAT, and presented Voice-of-Customer analytics that drove policy changes — my first taste of turning interactions into evidence.",
  },
  {
    label: "Risk Investigation",
    org: "Amazon · 2020–2024",
    impact: "Investigated high-risk cases across customer and merchant accounts using operational workflows, pattern recognition, and policy-compliance frameworks at large case volumes.",
  },
  {
    label: "Fraud & Pattern Analysis",
    org: "Amazon · Investigation Specialist",
    impact: "Analysed transactional and behavioural patterns to detect fraud and escalate emerging risk — earning Employee of the Quarter. Every number had to survive cross-examination.",
  },
  {
    label: "Business Intelligence",
    org: "Amplify Analytix · 2025",
    impact: "Built Power BI reporting suites (DirectQuery, Composite Models) and IBCS-compliant Zebra BI visuals for enterprise clients, eliminating hours of manual consolidation.",
  },
  {
    label: "Data Platforms",
    org: "Amplify Analytix",
    impact: "Engineered Medallion (Bronze/Silver/Gold) pipelines on Microsoft Fabric — Dataflows Gen2, Lakehouse, OneLake — with CI/CD SQLMesh environments and Delta Lake incremental loading.",
  },
  {
    label: "Enterprise Analytics Engineering",
    org: "Amplify Analytix · present",
    impact: "Authored extensive DAX measures, enforced RLS and OLS across global markets, optimised Star Schema models, and drove strategic account reviews that improved client retention.",
  },
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
 * Not a résumé timeline: an evolution ladder. A scroll-driven rail climbs
 * through six capability stages, each offset further right as scope grows.
 */
export function CareerEvolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 40%"] });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 85% 50%, var(--nebula-2) 0%, transparent 70%)" }}
      />
      <div className="container-page section-pad relative">
        <motion.p {...reveal()} className="eyebrow mb-4">Career evolution</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[18ch] mb-[clamp(3rem,5vw,5rem)]">
          From operations to analytics engineering.
        </motion.h2>

        <div ref={ref} className="relative max-w-5xl">
          {/* Climbing rail */}
          <div aria-hidden className="absolute left-[0.4rem] top-2 bottom-2 w-px">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                scaleY: railScale,
                transformOrigin: "top",
                background: "linear-gradient(180deg, var(--primary), color-mix(in srgb, var(--primary) 35%, transparent))",
              }}
            />
          </div>

          <ol>
            {stages.map((s, i) => (
              <motion.li
                key={s.label}
                {...reveal(0.04 * i)}
                className="relative pl-[clamp(2rem,4vw,3.5rem)] py-[clamp(1.1rem,1.8vw,1.75rem)]"
              >
                {/* Node on the rail */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-[clamp(1.6rem,2.4vw,2.3rem)] w-[0.85rem] h-[0.85rem] rounded-full border-2 border-background ${
                    i === stages.length - 1 ? "bg-primary glow-accent" : "bg-muted-foreground/40"
                  }`}
                />
                {/* Content steps right as scope grows */}
                <div style={{ marginLeft: `min(${i * 2.5}vw, ${i * 3}rem)` }}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-1.5">
                    <h3 className="text-[clamp(1.1rem,1rem+0.7vw,1.5rem)] font-semibold">{s.label}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">{s.org}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[52ch]">{s.impact}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
