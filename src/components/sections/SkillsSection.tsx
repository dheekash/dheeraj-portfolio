"use client";

import { motion } from "framer-motion";
import {
  BarChart3, Database, Code2, Cloud, Zap
} from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const categories = [
  {
    label: "Business Intelligence",
    Icon: BarChart3,
    skills: ["Power BI", "DAX", "Zebra BI", "Semantic Models", "IBCS", "Paginated Reports", "DirectQuery", "Row-Level Security"],
  },
  {
    label: "Data Engineering",
    Icon: Database,
    skills: ["Microsoft Fabric", "Databricks", "Snowflake", "dbt", "SQLMesh", "Delta Lake", "OneLake", "Azure Data Factory", "Medallion Architecture"],
  },
  {
    label: "Programming & SQL",
    Icon: Code2,
    skills: ["SQL", "Python", "PySpark", "DAX", "Power Query (M)", "KQL", "REST APIs"],
  },
  {
    label: "Cloud & Infrastructure",
    Icon: Cloud,
    skills: ["Azure", "AWS", "ADLS Gen2", "Azure Synapse", "Azure SQL", "Git / CI/CD"],
  },
  {
    label: "Automation & AI",
    Icon: Zap,
    skills: ["Power Automate", "SharePoint", "Azure ML", "Time-Series Forecasting", "Anomaly Detection", "Feature Engineering"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Skills</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[22ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          The full stack of modern analytics.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              {...reveal(0.05 + ci * 0.07)}
              className="panel panel-lift rounded-2xl p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", color: "var(--primary)" }}>
                  <cat.Icon size={15} />
                </span>
                <p className="text-[13px] font-semibold leading-tight">{cat.label}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    style={{ background: "color-mix(in srgb, var(--primary) 6%, var(--card))", border: "1px solid var(--border)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
