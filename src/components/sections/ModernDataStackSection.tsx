"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const layers = [
  {
    step: "01",
    label: "Source Systems",
    sublabel: "Where raw data lives",
    tech: ["ERP", "CRM", "APIs", "Files", "Events"],
  },
  {
    step: "02",
    label: "Ingest & Orchestrate",
    sublabel: "Reliable movement",
    tech: ["Azure Data Factory", "Dataflows Gen2", "Fivetran", "Logic Apps"],
  },
  {
    step: "03",
    label: "OneLake",
    sublabel: "One governed store",
    tech: ["Delta Lake", "Parquet", "Bronze Layer"],
  },
  {
    step: "04",
    label: "Lakehouse",
    sublabel: "Medallion architecture",
    tech: ["SQLMesh", "dbt", "PySpark", "Silver Â· Gold"],
  },
  {
    step: "05",
    label: "Semantic Layer",
    sublabel: "One definition of truth",
    tech: ["Power BI", "DAX", "Direct Lake", "RLS"],
  },
  {
    step: "06",
    label: "Deliver & Serve",
    sublabel: "Decision-grade interfaces",
    tech: ["Executive Dashboards", "Paginated Reports", "Embedded Analytics"],
  },
];

const techStack = [
  {
    category: "Lakehouse Platform",
    tools: ["Microsoft Fabric", "Databricks", "OneLake", "Delta Lake"],
  },
  {
    category: "Transformation",
    tools: ["SQLMesh", "dbt", "PySpark", "SQL"],
  },
  {
    category: "Orchestration",
    tools: ["Azure Data Factory", "Dataflows Gen2", "Airflow"],
  },
  {
    category: "Warehouse",
    tools: ["Snowflake", "Azure Synapse", "BigQuery"],
  },
];

export function ModernDataStackSection() {
  return (
    <section id="architecture">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[22ch] mb-3">
          Modern data stack
        </motion.h2>
        <motion.p {...reveal(0.07)} className="text-muted-foreground text-sm leading-relaxed max-w-[60ch] mb-[clamp(3rem,5vw,5rem)]">
          Every platform I build follows a governed, end-to-end flow â€” from raw source systems
          through a tested Medallion architecture to executive-ready analytics. Version-controlled,
          observable, and auditable at every stage.
        </motion.p>

        {/* â”€â”€ Flow diagram â”€â”€ */}
        <div className="relative mb-[clamp(3rem,5vw,5rem)]">
          {/* Desktop: horizontal scroll if needed */}
          <div className="flex flex-col md:flex-row items-stretch md:items-start gap-0 md:gap-0 overflow-x-auto pb-2">
            {layers.map((layer, i) => (
              <div key={layer.step} className="flex flex-col md:flex-row items-center md:items-start flex-shrink-0">
                {/* Node */}
                <motion.div
                  {...reveal(0.06 + i * 0.08)}
                  className="panel rounded-2xl md:rounded-xl p-4 flex flex-col gap-2 w-full md:w-[clamp(8.5rem,10vw,11rem)]"
                  style={i === 3 ? {
                    borderColor: "color-mix(in srgb, var(--primary) 40%, var(--border))",
                    background: "color-mix(in srgb, var(--primary) 4%, var(--card))",
                  } : undefined}
                >
                  <span className="font-mono text-[10px] accent-text">{layer.step}</span>
                  <p className="text-[clamp(0.7rem,0.65rem+0.2vw,0.85rem)] font-semibold leading-snug">
                    {layer.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    {layer.sublabel}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {layer.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono text-muted-foreground leading-none px-1.5 py-0.5 rounded"
                        style={{ background: "var(--muted)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow */}
                {i < layers.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.08 }}
                    className="flex items-center justify-center flex-shrink-0 py-3 md:py-0 md:px-1 md:self-center"
                  >
                    <ChevronRight
                      size={16}
                      className="rotate-90 md:rotate-0 flex-shrink-0"
                      style={{ color: "var(--primary)", opacity: 0.6 }}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Scale label */}
          <motion.p
            {...reveal(0.55)}
            className="font-mono text-[10px] text-muted-foreground mt-3 tracking-[0.12em] uppercase"
          >
            Source â†’ Bronze â†’ Silver â†’ Gold â†’ Semantic â†’ Delivery
          </motion.p>
        </div>

        {/* â”€â”€ Tech stack by category â”€â”€ */}
        <motion.div {...reveal(0.3)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((cat) => (
            <div
              key={cat.category}
              className="panel rounded-xl px-4 py-4"
            >
              <p className="eyebrow mb-3">{cat.category}</p>
              <ul className="space-y-1.5">
                {cat.tools.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

