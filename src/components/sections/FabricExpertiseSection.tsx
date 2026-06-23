"use client";

import { motion } from "framer-motion";
import { Database, Workflow, Layers, BarChart3, Zap, Monitor, GitBranch, Shield } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const capabilities = [
  {
    icon: Database,
    title: "Lakehouse Architecture",
    description:
      "OneLake-native Delta Lake tables with ADLS Gen2 integration, multi-format support (Parquet, CSV, JSON), and medallion (Bronze / Silver / Gold) layer design.",
  },
  {
    icon: Workflow,
    title: "Data Factory Pipelines",
    description:
      "No-code and code-first ETL for batch ingestion, data copy, REST API connectors, and parameterized pipeline templates that run reliably at scale.",
  },
  {
    icon: Layers,
    title: "Dataflows Gen2",
    description:
      "Power Query-based data preparation, complex transformations, and reusable staging layers connected to lakehouse destinations or gateway sources.",
  },
  {
    icon: BarChart3,
    title: "Semantic Models",
    description:
      "Enterprise-grade DAX models with star schema, row-level security, field parameters, and calculation groups — built for executive consumption, not just exploration.",
  },
  {
    icon: Zap,
    title: "Direct Lake Mode",
    description:
      "Zero-copy analytics directly on OneLake parquet files — no import, no DirectQuery latency, automatic framing fallback, and V-Order optimization.",
  },
  {
    icon: Monitor,
    title: "Power BI Integration",
    description:
      "Native Fabric workspace integration, report embedding in Teams / SharePoint, paginated reports, scorecards, and data-driven subscription delivery.",
  },
  {
    icon: GitBranch,
    title: "Deployment Pipelines",
    description:
      "CI/CD for Fabric artifacts across Development / Test / Production environments — with Git integration (Azure DevOps / GitHub) and automated deployment rules.",
  },
  {
    icon: Shield,
    title: "Governance & Security",
    description:
      "Row-level and object-level security, Microsoft Purview integration, sensitivity labels, information protection policies, and workspace access governance.",
  },
];

export function FabricExpertiseSection() {
  return (
    <section id="fabric-expertise">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Microsoft Fabric
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[18ch] mb-3">
          End-to-end Fabric expertise
        </motion.h2>
        <motion.p {...reveal(0.08)} className="text-muted-foreground max-w-[52ch] text-sm mb-[clamp(2rem,3.5vw,3.5rem)]">
          Certified DP-600 Fabric Analytics Engineer. I have shipped production solutions across
          every Fabric workload — from raw ingestion to governed semantic models.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                {...reveal(0.1 + i * 0.05)}
                className="panel panel-lift rounded-2xl px-5 py-5 flex flex-col gap-3 group hover:border-primary/30 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/15"
                  style={{ background: "color-mix(in srgb, var(--primary) 10%, var(--card))" }}
                >
                  <Icon
                    size={16}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-tight mb-1.5">{cap.title}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
