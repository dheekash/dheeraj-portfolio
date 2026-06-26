"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "Jan 2025 - Present",
    role: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Building Fabric Lakehouse platforms and analytics products for enterprise clients across 15 countries. Cut 15+ hours of weekly manual work, reduced compute costs 15%, and shortened dashboard delivery by 40%.",
    highlights: [
      "Architected Microsoft Fabric Lakehouse with Medallion architecture across 6 source systems. Cut 15+ hrs/week of manual work.",
      "Migrated legacy SQL warehouse to SQLMesh. Pipeline failures dropped from 12% to under 1%.",
      "Boosted pipeline throughput 25% through parallelisation and incremental load patterns.",
      "Reduced cloud compute costs 15% through Fabric capacity scheduling and query tuning.",
      "Shortened dashboard delivery by 40%, from stakeholder brief to published report.",
      "Delivered 20+ data products for 200+ enterprise users across 15 countries. 100% client retention.",
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
    badge: "15 countries Â· 20+ products Â· 100% client retention",
    current: true,
  },
  {
    period: "Mar 2020 - Jun 2024",
    role: "Risk Data Analyst",
    roleSubtitle: "Fraud investigation â†’ self-serve seller analytics platform",
    company: "Amazon",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Moved from fraud investigation into building self-serve analytics platforms for seller leadership across 10+ global marketplaces. Shipped fraud models to production, led a 15-person team, and cut case resolution time by 35 minutes.",
    highlights: [
      "Built and deployed Random Forest and Logistic Regression fraud models. Reduced fraud incidence 30%.",
      "Led a 15-person analyst team. Cut average case resolution time from 65 min to 30 min per case.",
      "Built Power BI dashboards processing 100M+ daily records. Adopted by sales leadership globally.",
      "Delivered predictive analytics in Python and Snowflake. Surfaced $500K+ in revenue opportunities.",
      "Replaced manual reporting with automated SQL pipelines. Cut reporting effort by 70%.",
    ],
    stack: ["Power BI", "Snowflake", "Python", "SQL", "DAX", "Random Forest", "Scikit-learn"],
    badge: "100M+ records Â· 30% fraud reduction Â· 15-person team lead",
    current: false,
  },
  {
    period: "Mar 2019 - Mar 2020",
    role: "Customer Support Analyst (Data & Reporting)",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    type: "Full-time",
    summary:
      "Started at an Amazon-operated BPO. Built Excel dashboards to track team KPIs, cut average handling time by 31%, and pushed contact resolution to 94% against an 82% site benchmark.",
    highlights: [
      "Built Excel dashboards tracking KPIs for 20+ associates. Adopted across the floor within one quarter.",
      "Reduced Average Handling Time by 31% through process changes and structured call flows.",
      "Achieved 94% Contact Resolution Rate. Site benchmark was 82%.",
      "Spotted recurring escalation patterns through trend analysis. Findings fed into team coaching.",
    ],
    stack: ["Excel", "SQL Basics", "Data Analysis"],
    badge: null,
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
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
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

                {"roleSubtitle" in item && item.roleSubtitle && (
                  <p className="text-[11px] text-muted-foreground font-mono mb-1.5">{item.roleSubtitle}</p>
                )}

                {/* Company + meta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-3">
                  <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                  <span className="text-border hidden sm:inline text-xs">Â·</span>
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

