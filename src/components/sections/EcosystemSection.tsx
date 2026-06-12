"use client";

import { motion } from "framer-motion";

const layers = [
  {
    num: "L1",
    name: "Data Engineering",
    items: ["Microsoft Fabric", "Databricks", "Snowflake", "Azure Data Factory", "SQLMesh", "Delta Lake"],
  },
  {
    num: "L2",
    name: "Analytics Engineering",
    items: ["SQL", "PySpark", "Python", "dbt", "Data Modeling"],
  },
  {
    num: "L3",
    name: "Business Intelligence",
    items: ["Power BI", "Zebra BI", "Grafana", "Tableau", "Looker"],
  },
  {
    num: "L4",
    name: "Advanced Analytics",
    items: ["Forecasting", "Anomaly Detection", "Machine Learning", "Feature Engineering"],
  },
  {
    num: "L5",
    name: "Business Strategy",
    items: ["Executive Reporting", "Stakeholder Management", "KPI Governance", "Decision Intelligence"],
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function EcosystemSection() {
  return (
    <section id="ecosystem">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Analytics ecosystem
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[22ch] mb-[clamp(2.5rem,4vw,4rem)]">
          A connected architecture, from pipeline to boardroom.
        </motion.h2>

        <div className="relative max-w-4xl">
          {/* Signal spine connecting the layers */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, rgba(56,189,248,0.45), rgba(129,140,248,0.3), transparent)" }}
          />

          <div className="grid gap-[clamp(0.75rem,1.25vw,1rem)] relative">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.num}
                {...reveal(0.05 + i * 0.06)}
                className="glass card-lift rounded-2xl px-[clamp(1.25rem,2vw,2rem)] py-[clamp(1.1rem,1.6vw,1.5rem)] grid sm:grid-cols-[minmax(11rem,14rem)_1fr] gap-x-8 gap-y-2 items-baseline"
              >
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-[11px] text-primary">{layer.num}</span>
                  <h3 className="text-base font-semibold">{layer.name}</h3>
                </div>
                <p className="font-mono text-[clamp(0.72rem,0.68rem+0.2vw,0.85rem)] text-muted-foreground leading-loose">
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
