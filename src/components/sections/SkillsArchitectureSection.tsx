"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const layers = [
  {
    id: "presentation",
    label: "Presentation",
    sublabel: "What stakeholders see",
    accent: "#1591DC",
    bgFrom: "rgba(21,145,220,0.07)",
    bgTo: "rgba(21,145,220,0.02)",
    borderColor: "rgba(21,145,220,0.25)",
    tools: ["Power BI", "Tableau", "Excel", "Grafana", "SSRS"],
  },
  {
    id: "semantic",
    label: "Semantic",
    sublabel: "Business logic & models",
    accent: "#7c3aed",
    bgFrom: "rgba(124,58,237,0.07)",
    bgTo: "rgba(124,58,237,0.02)",
    borderColor: "rgba(124,58,237,0.22)",
    tools: ["Fabric Semantic Models", "Direct Lake", "DAX", "M Query", "Star Schema Design"],
  },
  {
    id: "storage",
    label: "Storage",
    sublabel: "Lakehouse & warehouse layer",
    accent: "#0891b2",
    bgFrom: "rgba(8,145,178,0.07)",
    bgTo: "rgba(8,145,178,0.02)",
    borderColor: "rgba(8,145,178,0.22)",
    tools: ["Microsoft Fabric / OneLake", "Snowflake", "Delta Lake", "ADLS Gen2", "Azure SQL DB"],
  },
  {
    id: "processing",
    label: "Processing",
    sublabel: "Transform, orchestrate, deliver",
    accent: "#d97706",
    bgFrom: "rgba(217,119,6,0.07)",
    bgTo: "rgba(217,119,6,0.02)",
    borderColor: "rgba(217,119,6,0.22)",
    tools: ["Databricks", "Azure Data Factory", "dbt", "SQLMesh", "Apache Airflow"],
  },
  {
    id: "ingestion",
    label: "Engineering",
    sublabel: "Code & pipeline fundamentals",
    accent: "#059669",
    bgFrom: "rgba(5,150,105,0.07)",
    bgTo: "rgba(5,150,105,0.02)",
    borderColor: "rgba(5,150,105,0.22)",
    tools: ["Python", "PySpark", "SQL", "Apache Kafka", "Azure Event Hubs"],
  },
];

export function SkillsArchitectureSection() {
  return (
    <section id="stack">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Analytics Engineering Stack
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[20ch] mb-3">
          How I architect data systems
        </motion.h2>
        <motion.p {...reveal(0.08)} className="text-muted-foreground max-w-[52ch] text-sm mb-[clamp(2.5rem,4vw,4rem)]">
          A layered architecture approach — from raw ingestion to boardroom dashboards. Every tool chosen
          for production reliability, not résumé padding.
        </motion.p>

        <div className="max-w-3xl mx-auto lg:mx-0">
          {layers.map((layer, i) => (
            <motion.div key={layer.id} {...reveal(0.1 + i * 0.07)}>
              {/* Layer card */}
              <div
                className="rounded-2xl border px-[clamp(1.25rem,2.5vw,2rem)] py-[clamp(1rem,1.8vw,1.5rem)]"
                style={{
                  background: `linear-gradient(105deg, ${layer.bgFrom} 0%, ${layer.bgTo} 100%)`,
                  borderColor: layer.borderColor,
                }}
              >
                <div className="grid sm:grid-cols-[9rem_1fr] gap-4 sm:gap-6 items-start">
                  {/* Layer label */}
                  <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 items-center sm:items-start">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 hidden sm:block"
                      style={{ background: layer.accent }}
                    />
                    <p
                      className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em]"
                      style={{ color: layer.accent }}
                    >
                      {layer.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
                      {layer.sublabel}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {layer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-full text-[12px] font-medium panel"
                        style={{ borderColor: layer.borderColor }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector arrow between layers */}
              {i < layers.length - 1 && (
                <div className="flex flex-col items-center my-1 gap-0">
                  <div
                    className="w-px h-4"
                    style={{
                      background: `linear-gradient(to bottom, ${layer.accent}40, ${layers[i + 1].accent}40)`,
                    }}
                  />
                  <ChevronDown
                    size={12}
                    className="text-muted-foreground/40"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
