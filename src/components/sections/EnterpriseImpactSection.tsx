"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const companies = [
  {
    name: "Amplify Analytix",
    period: "2025 â€“ Present",
    role: "BI & Analytics Engineer",
    tagline:
      "Designing enterprise analytics platforms, Lakehouse architectures, and Power BI reporting suites for global clients across 15 countries.",
    metrics: [
      { value: "15+",  label: "Countries served"         },
      { value: "20+",  label: "Data products delivered"  },
      { value: "100%", label: "Client retention"         },
    ],
    achievements: [
      "Architecting Microsoft Fabric Lakehouse platforms with Medallion architecture for enterprise clients",
      "Delivering Power BI semantic models and executive reporting suites used by 200+ stakeholders",
      "Building CI/CD data workflows with SQLMesh and automated data quality testing gates",
      "Managing multi-country analytics delivery from a single governed Fabric tenant",
    ],
    stack: ["Microsoft Fabric", "Databricks", "Snowflake", "SQLMesh", "Power BI", "Python"],
    isCurrent: true,
  },
  {
    name: "Amazon",
    period: "2020 â€“ 2024",
    role: "Analytics Lead",
    tagline:
      "Led analytics at scale across 10+ global marketplaces â€” forecasting, fraud investigation, and operational reporting for seller leadership.",
    metrics: [
      { value: "10+",   label: "Marketplaces covered"           },
      { value: "5M+",   label: "Records processed daily"        },
      { value: "$500K+",label: "Revenue opportunities identified"},
    ],
    achievements: [
      "Built forecasting dashboards processing 100M+ records for Amazon's global seller leadership",
      "Led fraud investigation analytics across the seller ecosystem â€” reducing investigation time significantly",
      "Developed KPI frameworks adopted by cross-functional operations and analytics teams",
      "Reduced manual reporting effort by 70% through automated pipeline and self-serve BI adoption",
    ],
    stack: ["Databricks", "Python", "SQL", "Power BI", "Azure"],
    isCurrent: false,
  },
];

export function EnterpriseImpactSection() {
  return (
    <section id="impact">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[22ch] mb-[clamp(0.75rem,1.2vw,1.25rem)]">
          Enterprise impact
        </motion.h2>
        <motion.p {...reveal(0.06)} className="text-muted-foreground max-w-[55ch] text-sm leading-relaxed mb-[clamp(2.5rem,4vw,4.5rem)]">
          Quantified outcomes from six years of analytics engineering across Amazon-scale operations
          and enterprise consulting.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-6">
          {companies.map((co, ci) => (
            <motion.div
              key={co.name}
              {...reveal(0.08 + ci * 0.1)}
              className="panel panel-lift rounded-2xl overflow-hidden flex flex-col"
              style={co.isCurrent ? {
                borderColor: "color-mix(in srgb, var(--primary) 35%, var(--border))",
              } : undefined}
            >
              {/* Card header */}
              <div
                className="px-[clamp(1.5rem,2.5vw,2rem)] pt-[clamp(1.5rem,2.5vw,2rem)] pb-[clamp(1rem,1.8vw,1.5rem)]"
                style={co.isCurrent ? {
                  background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 6%, var(--card)) 0%, var(--card) 60%)",
                } : undefined}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-bold tracking-tight">
                      {co.name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{co.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="font-mono text-[11px] text-muted-foreground tracking-[0.06em]">
                      {co.period}
                    </span>
                    {co.isCurrent && (
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
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{co.tagline}</p>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 border-t border-border divide-x divide-border">
                {co.metrics.map((m) => (
                  <div key={m.label} className="px-4 py-4 text-center">
                    <p
                      className="font-mono font-bold tabular-nums leading-none mb-1"
                      style={{
                        fontSize: "clamp(1.2rem, 1rem + 0.8vw, 1.6rem)",
                        color: co.isCurrent ? "var(--primary)" : "var(--foreground)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="px-[clamp(1.5rem,2.5vw,2rem)] py-[clamp(1rem,1.8vw,1.5rem)] flex-1">
                <ul className="space-y-2.5 mb-5">
                  {co.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: co.isCurrent ? "var(--primary)" : "var(--muted-foreground)" }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Stack chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {co.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 6%, var(--card))",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

