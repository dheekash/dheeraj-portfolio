"use client";

import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

type Kpi = { end: number; suffix: string; label: string };

const kpis: Kpi[] = [
  { end: 7, suffix: "+", label: "Years Experience" },
  { end: 15, suffix: "+", label: "Countries Supported" },
  { end: 20, suffix: "+", label: "Enterprise Data Products Delivered" },
  { end: 100, suffix: "+", label: "DAX Measures Developed" },
  { end: 100, suffix: "%", label: "Client Retention Rate" },
  { end: 5, suffix: "M+", label: "Daily Transactions Processed" },
];

function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const { count, ref } = useCounter(kpi.end, 1500);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-lift rounded-2xl p-[clamp(1.25rem,1rem+1.5vw,2rem)]"
    >
      <div className="font-mono tabular-nums text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-semibold tracking-tight">
        {count}
        <span className="signal-text">{kpi.suffix}</span>
      </div>
      <p className="mt-2 text-[clamp(0.78rem,0.7rem+0.3vw,0.9rem)] text-muted-foreground leading-snug">
        {kpi.label}
      </p>
    </motion.div>
  );
}

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="relative">
      <div className="container-page section-pad">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-[clamp(1.5rem,2.5vw,2.5rem)]"
        >
          Impact, measured
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(0.75rem,1.5vw,1.25rem)]">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} kpi={kpi} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
