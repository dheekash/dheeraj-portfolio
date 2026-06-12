"use client";

import { motion } from "framer-motion";

type Study = {
  num: string;
  title: string;
  client?: string;
  stack: string[];
  challenge: string;
  solution: string;
  impact: { value: string; label: string }[];
};

const studies: Study[] = [
  {
    num: "01",
    title: "Real-Time Sales Intelligence Platform",
    stack: ["Databricks", "Delta Live Tables", "MLflow", "PySpark", "Azure Data Factory", "Power BI"],
    challenge: "Sales reporting lagged by six hours across eight regional markets.",
    solution:
      "Designed a Databricks Lakehouse processing 5M+ daily transactions using Bronze, Silver, and Gold architecture with automated quality monitoring.",
    impact: [
      { value: "6h → <10min", label: "Reporting latency" },
      { value: "+22%", label: "Forecast accuracy" },
      { value: "−95%", label: "Pipeline failures" },
    ],
  },
  {
    num: "02",
    title: "Customer Churn Analytics Pipeline",
    stack: ["Databricks", "Snowflake", "dbt", "Power BI", "Python"],
    challenge: "Identify high-risk customers before churn occurs.",
    solution:
      "Built an AutoML churn prediction platform using 2M+ customer records and 60+ behavioral indicators.",
    impact: [
      { value: "89%", label: "Recall on at-risk customers" },
      { value: "−18%", label: "Customer churn" },
      { value: "$300K", label: "Saved annually" },
    ],
  },
  {
    num: "03",
    title: "Enterprise Fabric Lakehouse Migration",
    client: "The Mole Clinic",
    stack: ["Microsoft Fabric", "OneLake", "SQLMesh", "Delta Lake", "Power BI"],
    challenge: "Legacy ETL processes were unreliable and expensive.",
    solution:
      "Implemented a Fabric-based Medallion Architecture consolidating six source systems into OneLake.",
    impact: [
      { value: "12% → <1%", label: "Failure rate" },
      { value: "−90%", label: "Maintenance effort" },
      { value: "−15%", label: "Compute spend" },
    ],
  },
  {
    num: "04",
    title: "Global Manufacturing Analytics Suite",
    client: "Rockwool",
    stack: ["Power BI", "Snowflake", "dbt", "Azure Data Factory"],
    challenge: "Factory reporting required four hours per refresh cycle.",
    solution:
      "Created a governed analytics ecosystem supporting 200+ users across 15 countries.",
    impact: [
      { value: "4h → 15min", label: "Refresh time" },
      { value: "94%", label: "Performance improvement" },
      { value: "Global", label: "Standardized KPI definitions" },
    ],
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function StudyCard({ study, index }: { study: Study; index: number }) {
  return (
    <motion.article
      {...reveal(index * 0.04)}
      className="glass card-lift rounded-3xl overflow-hidden relative"
    >
      {/* Signal edge */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(129,140,248,0.5), transparent)" }}
      />

      <div className="p-[clamp(1.5rem,1rem+2.5vw,3rem)]">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-[clamp(1.25rem,2vw,2rem)]">
          <span className="font-mono text-xs text-primary">CASE STUDY {study.num}</span>
          {study.client && (
            <span className="font-mono text-xs text-muted-foreground">for {study.client}</span>
          )}
        </div>

        <h3 className="text-[clamp(1.4rem,1.1rem+1.6vw,2.25rem)] font-semibold tracking-tight mb-[clamp(1.5rem,2.5vw,2.5rem)] max-w-[24ch]">
          {study.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-[clamp(1.25rem,2.5vw,2.5rem)] mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          <div>
            <p className="eyebrow mb-2.5">Challenge</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <p className="eyebrow mb-2.5">Solution</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.solution}</p>
          </div>
        </div>

        {/* Impact strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden mb-[clamp(1.25rem,2vw,2rem)]">
          {study.impact.map((m) => (
            <div key={m.label} className="bg-background/70 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.9rem,1.4vw,1.25rem)]">
              <div className="font-mono tabular-nums text-[clamp(1.1rem,1rem+0.8vw,1.5rem)] font-semibold signal-text">
                {m.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-[11px] text-muted-foreground/80 leading-relaxed">
          {study.stack.join("  ·  ")}
        </p>
      </div>
    </motion.article>
  );
}

export function CaseStudiesSection() {
  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Flagship work
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[20ch] mb-[clamp(2.5rem,4vw,4rem)]">
          From raw data to executive decisions.
        </motion.h2>

        <div className="grid gap-[clamp(1.25rem,2vw,2rem)]">
          {studies.map((s, i) => (
            <StudyCard key={s.num} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
