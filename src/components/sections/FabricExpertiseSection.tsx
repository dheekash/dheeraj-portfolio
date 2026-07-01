"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function ArchDiagram() {
  const layers = [
    {
      label: "Sources",
      items: ["SQL Server", "REST APIs", "SharePoint", "CSV / Excel"],
      color: "rgba(100,116,139,0.15)",
      border: "rgba(100,116,139,0.3)",
    },
    {
      label: "Ingest — ADF / Dataflows Gen2",
      items: ["Copy Activity", "Parameterized pipelines", "REST connectors"],
      color: "rgba(37,99,235,0.08)",
      border: "rgba(37,99,235,0.25)",
    },
    {
      label: "Bronze — Raw",
      items: ["Delta Lake tables", "Schema-on-read", "Full history"],
      color: "rgba(180,83,9,0.08)",
      border: "rgba(180,83,9,0.25)",
    },
    {
      label: "Silver — Cleansed",
      items: ["dbt / SQLMesh transforms", "SCD Type 2", "Quality gates"],
      color: "rgba(37,99,235,0.10)",
      border: "rgba(37,99,235,0.30)",
    },
    {
      label: "Gold — Curated",
      items: ["Star schema", "Business aggregates", "Certified datasets"],
      color: "rgba(16,185,129,0.10)",
      border: "rgba(16,185,129,0.30)",
    },
    {
      label: "Semantic Model",
      items: ["DAX measures", "RLS / OLS", "Direct Lake"],
      color: "rgba(124,58,237,0.10)",
      border: "rgba(124,58,237,0.30)",
    },
    {
      label: "Consumption",
      items: ["Power BI Reports", "Paginated Reports", "Embedded Analytics"],
      color: "rgba(242,200,17,0.12)",
      border: "rgba(217,119,6,0.30)",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-0">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex flex-col items-center">
            <div
              className="w-full rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              style={{ background: layer.color, border: `1px solid ${layer.border}` }}
            >
              <p className="text-[11px] font-mono font-semibold text-foreground whitespace-nowrap min-w-[10rem]">
                {layer.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10.5px] font-mono text-muted-foreground px-2 py-0.5 rounded-md"
                    style={{ background: "color-mix(in srgb, var(--card) 70%, transparent)", border: `1px solid ${layer.border}` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center py-1.5">
                <div className="w-[2px] h-5" style={{ background: "color-mix(in srgb, var(--primary) 40%, var(--border))" }} />
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M5 6L0 0h10L5 6z" fill="var(--primary)" opacity="0.55" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const govItems = [
  { label: "Row-Level Security",  detail: "Dynamic RLS on all semantic models. Users see only their data." },
  { label: "Data Quality Gates",  detail: "dbt / DLT expectations at Bronze, Silver, and Gold. Failures block promotion." },
  { label: "Data Lineage",        detail: "End-to-end column-level lineage from source to report via Purview + dbt." },
  { label: "Sensitivity Labels",  detail: "Microsoft Purview labels applied at dataset level. Auto-inherited by reports." },
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
          Production solutions across every Fabric workload, from raw ingestion to governed semantic models.
        </motion.p>

        {/* Architecture + Governance unified container */}
        <motion.div
          {...reveal(0.1)}
          className="mb-[clamp(2rem,3vw,3rem)] rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="p-[clamp(1.25rem,2vw,2rem)]">
            <p className="text-[13px] font-semibold text-foreground mb-4">Platform Architecture</p>
            <ArchDiagram />
          </div>

          <div
            className="px-[clamp(1.25rem,2vw,2rem)] py-5"
            style={{
              borderTop: "1px solid color-mix(in srgb, var(--primary) 20%, var(--border))",
              background: "color-mix(in srgb, var(--primary) 4%, var(--card))",
            }}
          >
            <p className="text-[13px] font-semibold text-foreground mb-4">Governance & Data Quality</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {govItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  {...reveal(0.16 + i * 0.04)}
                  className="panel rounded-xl px-4 py-4 flex gap-3"
                >
                  <span
                    className="w-1.5 flex-shrink-0 rounded-full mt-1"
                    style={{ background: "var(--primary)", alignSelf: "stretch", maxHeight: "1.5rem" }}
                  />
                  <div>
                    <p className="text-[12.5px] font-semibold text-foreground mb-0.5">{item.label}</p>
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
