"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const progression = [
  {
    role: "Customer Operations",
    org: "Frontizo",
    years: "2019–2020",
    current: false,
    note: "Voice-of-customer analytics, support operations, first-contact resolution",
  },
  {
    role: "Investigation Specialist",
    org: "Amazon",
    years: "2020–2024",
    current: false,
    note: "Fraud detection, transactional pattern analysis, operational data at scale",
  },
  {
    role: "Business Analyst",
    org: "Amplify Analytix",
    years: "2025",
    current: false,
    note: "Enterprise BI reporting, Power BI, stakeholder alignment",
  },
  {
    role: "BI & Analytics Engineer",
    org: "Amplify Analytix",
    years: "2025–present",
    current: true,
    note: "Lakehouse platforms, data engineering, analytics at enterprise scale",
  },
];

const specializations = [
  "Power BI", "Microsoft Fabric", "Databricks", "Snowflake",
  "SQL", "Python", "Azure", "AWS", "dbt", "SQLMesh", "DAX", "Data Modeling",
];

export function AboutSection() {
  return (
    <section id="about">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">About</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[18ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          From operations to analytics engineering.
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 items-start">
          {/* Story */}
          <div className="lg:col-span-7 space-y-[clamp(1rem,1.5vw,1.5rem)]">
            <motion.p
              {...reveal(0.08)}
              className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground"
            >
              I spent four years at Amazon investigating fraud and analyzing transactional
              patterns at scale — building the analytical instinct that now drives every data
              platform I design. That background means I know what makes a number trustworthy
              enough to stake a business decision on.
            </motion.p>
            <motion.p
              {...reveal(0.12)}
              className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground"
            >
              Today I design end-to-end analytics systems at Amplify Analytix — Lakehouse
              architecture on Microsoft Fabric and Databricks, transformation pipelines with
              SQLMesh and dbt, and Power BI semantic models that 200+ enterprise users depend
              on across 15 countries.
            </motion.p>
            <motion.p
              {...reveal(0.16)}
              className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground"
            >
              I care about decisions, not deliverables. A dashboard nobody acts on is a failed
              project — so I work from the business question backward, building data
              infrastructure that earns trust at every level of the organization.
            </motion.p>

            <motion.div {...reveal(0.2)} className="pt-[clamp(0.75rem,1.5vw,1.25rem)]">
              <p className="eyebrow mb-4">Core specializations</p>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg panel text-[13px] font-medium hover:border-primary/40 transition-colors duration-150"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Role progression */}
          <motion.div {...reveal(0.1)} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow mb-5">Career progression</p>
            <div>
              {progression.map((item, i) => (
                <div
                  key={i}
                  className={`py-[clamp(0.9rem,1.4vw,1.2rem)] ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p className="font-semibold text-[14px] leading-tight">{item.role}</p>
                    {item.current && (
                      <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        now
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-1">
                    {item.org} · {item.years}
                  </p>
                  <p className="text-[12px] text-muted-foreground/65 leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
