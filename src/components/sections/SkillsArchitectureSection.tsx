"use client";

import { motion } from "framer-motion";

/**
 * Skills rendered as a layered platform architecture — the way a data
 * platform is actually drawn on a whiteboard — instead of a tag cloud.
 */
const layers = [
  {
    name: "Business Layer",
    role: "Decisions & strategy",
    items: ["Stakeholder Management", "KPI Strategy", "Executive Reporting", "Requirements Discovery"],
  },
  {
    name: "Analytics Layer",
    role: "Insight delivery",
    items: ["Power BI", "DAX", "Tableau", "Zebra BI", "Excel", "Semantic Models"],
  },
  {
    name: "Automation Layer",
    role: "Workflow & orchestration",
    items: ["Power Automate", "SharePoint", "Azure Data Factory", "REST APIs"],
  },
  {
    name: "Data Layer",
    role: "Transformation & modeling",
    items: ["SQL", "Python", "PySpark", "dbt", "SQLMesh", "ETL Pipelines"],
  },
  {
    name: "Cloud Layer",
    role: "Platform & storage",
    items: ["Microsoft Fabric", "Databricks", "Snowflake", "Azure", "Delta Lake", "ADLS Gen2"],
  },
];

export function SkillsArchitectureSection() {
  return (
    <section id="skills" className="relative">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <p className="eyebrow mb-5">Skills architecture</p>
          <h2 className="ink-gradient mb-5">A full-stack analytics ecosystem.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From cloud storage to the boardroom slide — each layer below feeds
            the one above it, and I work across all five.
          </p>
        </motion.div>

        <div className="max-w-3xl relative">
          {/* Flow rail connecting the layers */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#22D3EE]/40 via-[#4D8DFF]/30 to-transparent hidden lg:block"
          />

          <div className="space-y-3 relative">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="glass-card card-lift rounded-xl px-7 py-6 relative grid sm:grid-cols-[200px_1fr] gap-x-10 gap-y-2 items-baseline"
              >
                <div>
                  <p className="font-mono text-[11px] text-primary/70 mb-1 tracking-[0.16em]">
                    L{layers.length - i}
                  </p>
                  <h3 className="text-base font-semibold text-foreground">{layer.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{layer.role}</p>
                </div>
                <p className="font-mono text-sm text-muted-foreground leading-loose">
                  {layer.items.join("  ·  ")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
