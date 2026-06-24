"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "Mar 2019 - Mar 2020",
    role: "Customer Support Analyst (Data & Reporting)",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Began career at an Amazon-operated facility. Built Excel dashboards to surface team KPIs and identified recurring process inefficiencies through data analysis.",
    highlights: [
      "Built Excel reporting models to track team KPIs and reduce escalation rates",
      "Developed analytical instincts by questioning operational data daily",
      "Foundation for the pivot into data and analytics engineering",
    ],
    stack: ["Excel", "SQL Basics"],
    badge: null,
    current: false,
  },
  {
    period: "Mar 2020 - Jun 2024",
    role: "Risk Data Analyst",
    company: "Amazon",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Progressed from fraud investigation into building self-service analytics platforms for seller leadership across 10+ global marketplaces. Delivered reporting infrastructure that processed 100M+ daily records and surfaced $500K+ in revenue opportunities.",
    highlights: [
      "Built Sales Forecasting Dashboard processing 100M+ daily records across 10 marketplaces",
      "Identified $500K+ in revenue opportunities through predictive analytics in Python and Snowflake",
      "Developed Power BI dashboards adopted by sales leadership for weekly business reviews",
      "Reduced manual reporting effort by 70% through automated pipelines and alert systems",
      "Collaborated with data science teams to integrate ML insights into operational BI tools",
    ],
    stack: ["Power BI", "Snowflake", "Python", "SQL", "DAX", "Zebra BI"],
    badge: "100M+ records · 10 marketplaces · $500K+ identified",
    current: false,
  },
  {
    period: "Jan 2025 - Present",
    role: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Architecting Microsoft Fabric Lakehouse platforms and delivering end-to-end analytics products for enterprise clients across 15 countries. Leading platform design, semantic modeling, and cross-functional delivery.",
    highlights: [
      "Architected Microsoft Fabric Lakehouse with Medallion architecture - 6 source systems, OneLake",
      "Engineered Power BI semantic models with 100+ DAX measures for C-suite reporting",
      "Migrated legacy SQL warehouse to SQLMesh, cutting pipeline failures from 12% to under 1%",
      "Delivered 20+ data products for 200+ enterprise users across 15 countries",
      "Implemented row-level security, audit logging, and data governance standards",
      "Led Databricks and Snowflake platform deployments for global analytics clients",
    ],
    stack: [
      "Microsoft Fabric",
      "Power BI",
      "Databricks",
      "Snowflake",
      "dbt",
      "SQLMesh",
      "PySpark",
      "Azure",
      "Azure Data Factory",
    ],
    badge: "15 countries · 20+ products · 100% client retention",
    current: true,
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

export function CareerEvolutionSection() {
  return (
    <section id="journey">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[14ch] mb-[clamp(2rem,3.5vw,4rem)]">
          Experience
        </motion.h2>

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
                <span className="font-mono text-[12px] text-muted-foreground tracking-[0.04em] leading-snug whitespace-nowrap">
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
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                  <h3 className="text-[clamp(1rem,0.95rem+0.3vw,1.1rem)] font-semibold leading-snug">
                    {item.role}
                  </h3>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                        color: "var(--primary)",
                        border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      now
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
                <p className="text-sm text-muted-foreground leading-relaxed mb-3.5 max-w-[58ch]">
                  {item.summary}
                </p>

                {/* Highlights */}
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

                {/* Stack chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11.5px] font-mono text-muted-foreground px-2 py-0.5 rounded"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 6%, var(--card))",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Impact badge */}
                {item.badge && (
                  <p
                    className="inline-block font-mono text-[10.5px] px-2.5 py-1 rounded-md"
                    style={{
                      background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
                      color: "var(--primary)",
                      border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                    }}
                  >
                    {item.badge}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
