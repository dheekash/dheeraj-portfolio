"use client";

import { motion } from "framer-motion";
import { Layers, Gauge, Workflow, LineChart, type LucideIcon } from "lucide-react";
import { WebGLDotField } from "@/components/common/WebGLDotField";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const features: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Layers,
    title: "Lakehouse Architecture",
    body: "Medallion-layered Lakehouses on Microsoft Fabric and Databricks: one governed source of truth instead of a dozen disconnected reports.",
  },
  {
    Icon: Gauge,
    title: "Semantic Modeling",
    body: "Power BI datasets built for speed and trust: DAX measures, star schemas, and Direct Lake models that hold up under real usage.",
  },
  {
    Icon: Workflow,
    title: "Reliable Pipelines",
    body: "SQLMesh and dbt with automated quality gates, so schema drift and pipeline failures get caught before they reach a dashboard.",
  },
  {
    Icon: LineChart,
    title: "Executive-Ready Insights",
    body: "Reporting systems built for the people making the call: finance, operations, and leadership teams who need answers, not raw tables.",
  },
];

/**
 * "Portrait Stories" feature-highlight section — editorial Playfair Display
 * heading, Poppins body copy, glass gradient-border-shell cards on an 8px
 * spacing rhythm, over a WebGL dot-matrix field. Colors stay on the site's
 * own tokens; only the typography/spacing/card technique come from the
 * Portrait Stories design system. Reveal uses the same Framer Motion
 * whileInView pattern as every other section on this site — an earlier GSAP
 * ScrollTrigger version left cards permanently invisible when its trigger
 * position went stale (didn't refresh after the WebGL canvas/web fonts
 * settled layout), so it was replaced with the already-proven mechanism.
 */
export function PortraitStoriesSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <WebGLDotField />
      </div>

      <div className="container-page section-pad relative">
        <div className="max-w-[46rem] mb-[clamp(2rem,3vw,3rem)]">
          <motion.p
            {...reveal()}
            className="eyebrow mb-3"
          >
            How I work
          </motion.p>
          <motion.h2
            {...reveal(0.05)}
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 1.2rem + 2.8vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
            }}
          >
            Every dataset has a story worth telling.
          </motion.h2>
          <motion.p
            {...reveal(0.1)}
            className="text-[15px] leading-relaxed text-muted-foreground max-w-[52ch]"
          >
            From messy source systems to boardroom-ready dashboards, four disciplines I lean on for every engagement.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, body }, i) => (
            <motion.div key={title} {...reveal(0.15 + i * 0.08)} className="ps-shell rounded-[var(--radius)] p-px">
              <div className="ps-card h-full rounded-[calc(var(--radius)-1px)] p-6 flex flex-col gap-4">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[calc(var(--radius)*0.6)] flex-shrink-0"
                  style={{ background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)" }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <p className="text-[14px] font-semibold leading-5" style={{ color: "var(--foreground)" }}>
                  {title}
                </p>
                <p className="text-[14px] leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
