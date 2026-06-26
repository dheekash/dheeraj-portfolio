"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = [
  { name: "Source Systems",    tech: "ERP · CRM · APIs · Events",                               note: "Where the raw signal lives"          },
  { name: "Data Ingestion",    tech: "Azure Data Factory · Auto Loader",                          note: "Reliable, observable movement"       },
  { name: "Lakehouse",         tech: "Microsoft Fabric · Databricks · OneLake · Delta Lake",      note: "One governed storage layer"          },
  { name: "Transformation",    tech: "SQLMesh · dbt · PySpark · SQL · Python",                   note: "Tested, versioned business logic"    },
  { name: "Semantic Models",   tech: "Power BI · DAX · row-level security",                      note: "One definition of every KPI"         },
  { name: "Reporting",         tech: "Power BI · Zebra BI · paginated reports",                  note: "Decision-grade interfaces"           },
  { name: "Business Decisions",tech: "Snowflake-backed forecasting · anomaly detection",          note: "Where the value lands"               },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 45%"] });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="architecture">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[20ch] mb-4">
          How it all connects
        </motion.h2>

        {/* Plain-English caption for non-technical visitors */}
        <motion.p {...reveal(0.08)} className="text-muted-foreground max-w-[60ch] text-sm leading-relaxed mb-[clamp(3rem,5vw,5.5rem)]">
          This diagram shows how data flows from your existing business systems (ERPs, APIs,
          and databases) through a governed, tested pipeline all the way to the dashboards your
          team uses every day. Every stage is version-controlled and auditable, so you can always
          trust what you see in the report.
        </motion.p>

        <div ref={ref} className="relative max-w-6xl mx-auto">
          {/* Center spine (desktop) / left spine (mobile) */}
          <div aria-hidden className="absolute md:left-1/2 left-[0.45rem] md:-translate-x-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                scaleY: spineScale,
                transformOrigin: "top",
                background: "linear-gradient(180deg, var(--primary), color-mix(in srgb, var(--primary) 30%, transparent))",
              }}
            />
          </div>

          <ol>
            {stages.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={s.name}
                  {...reveal(0.04 * i)}
                  className="relative grid md:grid-cols-2 gap-x-[clamp(2.5rem,5vw,6rem)] py-[clamp(0.9rem,1.4vw,1.4rem)]"
                >
                  <span
                    aria-hidden
                    className="absolute md:left-1/2 left-[0.45rem] md:-translate-x-1/2 -translate-x-1/2 top-[clamp(1.5rem,2.2vw,2rem)] w-[0.7rem] h-[0.7rem] rounded-full bg-primary border-2 border-background"
                  />
                  <div
                    className={`pl-[clamp(2rem,4vw,0rem)] md:pl-0 ${
                      left ? "md:text-right md:pr-0" : "md:col-start-2"
                    }`}
                  >
                    <div className="panel panel-lift rounded-2xl px-[clamp(1.25rem,2vw,2rem)] py-[clamp(1rem,1.6vw,1.5rem)] inline-block w-full md:w-auto md:min-w-[min(28rem,100%)] text-left">
                      <div className="flex items-baseline justify-between gap-6 mb-1">
                        <h3 className="text-base font-semibold">{s.name}</h3>
                        <span className="font-mono text-[10px] accent-text">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{s.note}</p>
                      <p className="font-mono text-[11px] text-muted-foreground/85 leading-relaxed">{s.tech}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

