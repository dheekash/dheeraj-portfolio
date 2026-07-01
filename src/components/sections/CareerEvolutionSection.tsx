"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const timeline = [
  {
    period: "Jan 2025 - Present",
    role: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Microsoft Fabric", "SQLMesh", "Power BI", "DAX", "Azure", "Delta Lake", "ADF"],
    summary:
      "Building Fabric Lakehouse platforms and analytics products for enterprise clients across 15 countries. Cut 15+ hours of weekly manual work, reduced compute costs 15%, and shortened dashboard delivery by 40%.",
    highlights: [
      "Architected Microsoft Fabric Lakehouse with Medallion architecture across 6 source systems. Cut 15+ hrs/week of manual work.",
      "Migrated legacy SQL warehouse to SQLMesh. Pipeline failures dropped from 12% to under 1%.",
      "Shortened dashboard delivery by 40%, from stakeholder brief to published report.",
    ],
    caseStudyLink: "#case-studies",
    current: true,
  },
  {
    period: "Mar 2020 - Jun 2024",
    caseStudyLink: undefined,
    role: "Risk Data Analyst",
    company: "Amazon",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Power BI", "Python", "SQL", "Snowflake", "Databricks", "Scikit-learn"],
    summary:
      "Moved from fraud investigation into building self-serve analytics platforms for seller leadership across 10+ global marketplaces. Shipped fraud models to production, led a 15-person team, and cut case resolution time by 35 minutes.",
    highlights: [
      "Built and deployed Random Forest and Logistic Regression fraud models. Reduced fraud incidence 30%.",
      "Led a 15-person analyst team. Cut average case resolution time from 65 min to 30 min per case.",
      "Built Power BI dashboards processing 100M+ daily records. Adopted by sales leadership globally.",
    ],
    current: false,
  },
  {
    period: "Mar 2019 - Mar 2020",
    role: "Customer Support Analyst (Data & Reporting)",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Excel", "SQL", "Power Query"],
    summary:
      "Amazon-operated BPO. Built Excel dashboards for 20+ associates, cut average handling time 31%, pushed contact resolution to 94% vs 82% site benchmark.",
    highlights: [],
    current: false,
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

export function CareerEvolutionSection() {
  return (
    <section id="journey">
      <div className="container-page section-pad">
        <motion.div {...reveal()} className="flex items-end justify-between gap-6 flex-wrap mb-[clamp(2rem,3.5vw,4rem)]">
          <h2>Experience</h2>
          <div className="flex items-center gap-2 flex-shrink-0 pb-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>6+ years</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>3 companies</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>15 countries</span>
          </div>
        </motion.div>

        <div className="relative max-w-5xl space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={`${item.period}-${item.role}`}
              {...reveal(0.05 + i * 0.07)}
              className={`relative grid sm:grid-cols-[clamp(5rem,12vw,9rem)_1px_1fr] gap-x-6 items-start ${
                i > 0 ? "pt-[clamp(2rem,3vw,3rem)]" : ""
              }`}
            >
              {/* Period column */}
              <div className="sm:text-right pt-1">
                <span className="font-mono text-[12px] text-foreground/80 tracking-[0.04em] leading-snug font-semibold whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              {/* Vertical line + dot */}
              <div className="hidden sm:flex flex-col items-center">
                <span
                  className={`w-3 h-3 rounded-full border-2 border-background flex-shrink-0 mt-1 ${
                    item.current ? "bg-primary" : "bg-muted-foreground/35"
                  }`}
                />
                {i < timeline.length - 1 && (
                  <span
                    className="flex-1 w-px bg-border mt-1"
                    style={{ minHeight: "calc(100% + clamp(2rem,3vw,3rem))" }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-2">
                {/* Role + current badge */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-[clamp(1rem,0.95rem+0.3vw,1.1rem)] font-semibold leading-snug">
                    {item.role}
                  </h3>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 18%, transparent)",
                        color: "var(--primary)",
                        border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
                      Current role
                    </span>
                  )}
                </div>

                {/* Company + meta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-3">
                  <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                  <span className="text-border hidden sm:inline text-xs">·</span>
                  <p className="text-[12px] text-muted-foreground/70 font-mono">{item.location}</p>
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-[58ch]">
                  {item.summary}
                </p>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-foreground/70 px-2 py-0.5 rounded-md"
                      style={{
                        background: "color-mix(in srgb, var(--muted) 60%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                {item.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 mt-[0.45rem]"
                          style={{ background: "var(--primary)" }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Case study link */}
                {"caseStudyLink" in item && item.caseStudyLink && (
                  <a
                    href={item.caseStudyLink}
                    className="inline-flex items-center gap-1.5 text-[12px] font-mono font-semibold mb-4"
                    style={{ color: "var(--primary)" }}
                  >
                    See featured project <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
