"use client";

import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

type Kpi = {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
};

const kpis: Kpi[] = [
  { end: 6, suffix: "+", label: "Years Experience", context: "Analytics, BI & data engineering" },
  { end: 100, suffix: "+", label: "Dashboards Delivered", context: "Executive & operational reporting" },
  { end: 100, suffix: "M+", label: "Records Processed", context: "Across cloud data platforms" },
  { end: 8, label: "Global Markets", context: "Multi-region rollouts supported" },
  { end: 13, label: "Certifications", context: "Microsoft · Databricks · Snowflake" },
];

function KpiCounter({ kpi, index }: { kpi: Kpi; index: number }) {
  const { count, ref } = useCounter(kpi.end, 1600);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="bg-background px-7 py-9"
    >
      <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
        {kpi.prefix}
        {count}
        <span className="text-primary">{kpi.suffix}</span>
      </div>
      <div className="mt-3 text-sm font-medium text-foreground">{kpi.label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{kpi.context}</div>
    </motion.div>
  );
}

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="relative">
      <div className="container-max section-padding">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-10"
        >
          Impact at a glance
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {kpis.map((kpi, i) => (
            <KpiCounter key={kpi.label} kpi={kpi} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
