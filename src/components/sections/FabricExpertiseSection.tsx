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
      color: "#FAFAFB",
      border: "#ECECEC",
    },
    {
      label: "Ingest — ADF / Dataflows Gen2",
      items: ["Copy Activity", "Parameterized pipelines", "REST connectors"],
      color: "#F2F2F3",
      border: "#E4E4E5",
    },
    {
      label: "Bronze — Raw",
      items: ["Delta Lake tables", "Schema-on-read", "Full history"],
      color: "rgba(93,42,26,0.05)",
      border: "rgba(93,42,26,0.18)",
    },
    {
      label: "Silver — Cleansed",
      items: ["dbt / SQLMesh transforms", "SCD Type 2", "Quality gates"],
      color: "rgba(93,42,26,0.09)",
      border: "rgba(93,42,26,0.24)",
    },
    {
      label: "Gold — Curated",
      items: ["Star schema", "Business aggregates", "Certified datasets"],
      color: "rgba(251,225,209,0.55)",
      border: "rgba(93,42,26,0.30)",
    },
    {
      label: "Semantic Model",
      items: ["DAX measures", "RLS / OLS", "Direct Lake"],
      color: "#F2F2F3",
      border: "#E4E4E5",
    },
    {
      label: "Consumption",
      items: ["Power BI Reports", "Paginated Reports", "Embedded Analytics"],
      color: "rgba(23,25,28,0.05)",
      border: "rgba(23,25,28,0.20)",
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
              <div className="flex flex-col items-center py-1.5 flow-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="w-[2px] h-5" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--primary) 20%, var(--border)), var(--primary))" }} />
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M5 6L0 0h10L5 6z" fill="var(--primary)" opacity="0.8" />
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
        {/* Architecture + Governance unified container */}
        <motion.div
          {...reveal(0.1)}
          className="glow-border mb-[clamp(2rem,3vw,3rem)] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 12px 40px color-mix(in srgb, var(--primary) 7%, transparent)" }}
        >
          <div className="p-[clamp(1.25rem,2vw,2rem)] relative">
            <div
              aria-hidden
              className="bg-dots absolute inset-0 pointer-events-none opacity-35"
              style={{ maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 0%, transparent 80%)" }}
            />
            <div className="relative">
              <p className="text-[13px] font-semibold text-foreground mb-4">Platform Architecture</p>
              <ArchDiagram />
            </div>
          </div>

          <div
            className="px-[clamp(1.25rem,2vw,2rem)] py-4"
            style={{
              borderTop: "1px solid color-mix(in srgb, var(--primary) 20%, var(--border))",
              background: "color-mix(in srgb, var(--primary) 4%, var(--card))",
            }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-foreground/50 font-semibold mb-3">Governance & Data Quality</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {govItems.map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-[12px] text-muted-foreground" title={item.detail}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--primary)" }} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
