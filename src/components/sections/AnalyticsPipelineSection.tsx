"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Zap, HardDrive, Layers, BarChart3, TrendingUp } from "lucide-react";

const stages = [
  {
    id: 1,
    icon: Database,
    title: "Data Sources",
    subtitle: "Ingest",
    color: "#64748B",
    glow: "rgba(100,116,139,0.25)",
    items: ["SQL Databases", "REST APIs", "SaaS Platforms", "Flat Files / S3"],
  },
  {
    id: 2,
    icon: Zap,
    title: "Pipelines",
    subtitle: "Move",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.25)",
    items: ["Azure Data Factory", "Python ETL", "Kafka Streams", "Power Automate"],
  },
  {
    id: 3,
    icon: HardDrive,
    title: "Storage",
    subtitle: "Store",
    color: "#29B5E8",
    glow: "rgba(41,181,232,0.25)",
    items: ["Microsoft Fabric", "Snowflake", "ADLS Gen2", "Delta Lake"],
  },
  {
    id: 4,
    icon: Layers,
    title: "Transform",
    subtitle: "Model",
    color: "#FF694B",
    glow: "rgba(255,105,75,0.25)",
    items: ["dbt / SQLMesh", "PySpark", "SQL + KQL", "Medallion Layers"],
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Analytics",
    subtitle: "Visualise",
    color: "#F2C811",
    glow: "rgba(242,200,17,0.25)",
    items: ["Power BI + DAX", "Zebra BI", "Grafana", "Semantic Models"],
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Decisions",
    subtitle: "Impact",
    color: "#10B981",
    glow: "rgba(16,185,129,0.25)",
    items: ["Executive Dashboards", "Real-Time Alerts", "Automated Reports", "Strategic Insights"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/** Animated traveling dot along the connector */
function FlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      animate={{ left: ["-4px", "calc(100% + 4px)"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}

export function AnalyticsPipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Subtle dark wash for this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.04] to-transparent pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-500 font-mono">Analytics Architecture</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          End-to-End <span className="gradient-text">Data Pipeline</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          From raw data sources to executive decisions — every layer architected for reliability, scale, and insight.
        </motion.p>

        {/* Pipeline — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isLast = i === stages.length - 1;
            return (
              <div key={stage.id} className="flex lg:flex-row flex-col items-center flex-1">
                {/* Stage card */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.10, ease: "easeOut" as const }}
                  className="glass-card glass-highlight flex-1 w-full lg:w-auto relative rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl card-depth group cursor-default"
                  style={{
                    borderColor: `${stage.color}30`,
                    boxShadow: `0 0 0 0 ${stage.glow}`,
                  }}
                  whileHover={{ boxShadow: `0 8px 40px ${stage.glow}` }}
                >
                  {/* Step number */}
                  <div
                    className="absolute -top-3 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.id}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 border"
                    style={{ backgroundColor: `${stage.color}15`, borderColor: `${stage.color}30` }}
                  >
                    <Icon size={20} style={{ color: stage.color }} />
                  </div>

                  {/* Title */}
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-0.5" style={{ color: stage.color }}>
                    {stage.subtitle}
                  </p>
                  <h3 className="font-extrabold text-foreground text-base mb-3 leading-tight">{stage.title}</h3>

                  {/* Items */}
                  <ul className="space-y-1.5">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Animated connector */}
                {!isLast && (
                  <div className="flex-shrink-0 relative lg:w-10 lg:h-px w-px h-10 overflow-hidden">
                    {/* Horizontal line (desktop) */}
                    <div
                      className="hidden lg:block absolute inset-0"
                      style={{ background: `linear-gradient(90deg, ${stage.color}55, ${stages[i + 1].color}55)` }}
                    />
                    {/* Vertical line (mobile) */}
                    <div
                      className="lg:hidden absolute inset-0"
                      style={{ background: `linear-gradient(180deg, ${stage.color}55, ${stages[i + 1].color}55)` }}
                    />
                    <FlowDot color={stages[i + 1].color} delay={i * 0.28} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Certified across{" "}
            <span className="text-blue-400 font-semibold">Microsoft Fabric</span>,{" "}
            <span className="text-cyan-400 font-semibold">Databricks</span>, and{" "}
            <span className="text-amber-400 font-semibold">Snowflake</span>{" "}
            — the full modern data stack.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
