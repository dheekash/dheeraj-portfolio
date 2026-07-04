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

const specializations = [
  "Microsoft Fabric",
  "Power BI",
  "SQL",
  "Azure",
  "Python",
  "Databricks",
];

const industries = [
  "Manufacturing",
  "Sales Intelligence",
  "Risk & Fraud",
  "Retail & E-commerce",
  "Customer Analytics",
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Ambient dot grid, faded at edges */}
      <div
        aria-hidden
        className="bg-dots absolute inset-0 pointer-events-none opacity-40"
        style={{ maskImage: "radial-gradient(ellipse 60% 70% at 75% 40%, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 75% 40%, black 0%, transparent 70%)" }}
      />
      <div className="container-page section-pad relative">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 items-start">

          {/* Left — bio */}
          <div>
            <motion.h2 {...reveal()} className="mb-6">
              About me
            </motion.h2>

            <motion.div
              {...reveal(0.05)}
              className="space-y-5 text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-muted-foreground text-pretty mb-8"
            >
              <p>
                I build BI platforms, Lakehouse architectures, and analytics solutions for enterprise teams across 15 countries. My work spans Microsoft Fabric, Power BI, Databricks, Snowflake, dbt, Azure, and PySpark. I design semantic models, build data pipelines, and deliver reporting systems for finance, operations, sales, and executive teams.
              </p>
              <p>
                I value clear architecture, fast performance, and reliable data. Every solution starts with a business problem and ends with measurable results.
              </p>
              <p>One question drives every project.</p>
              <p className="text-foreground" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.35rem,1rem+1.2vw,1.75rem)", lineHeight: 1.3 }}>
                Does this help people make better decisions?
              </p>
            </motion.div>

            <motion.p
              {...reveal(0.1)}
              className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/80"
            >
              Bengaluru, India · IST (UTC+5:30)
            </motion.p>
          </div>

          {/* Right — credibility panel */}
          <motion.div
            {...reveal(0.08)}
            className="glow-border rounded-2xl p-6 grid sm:grid-cols-2 gap-x-10 gap-y-6"
            style={{
              background: "color-mix(in srgb, var(--primary) 4%, var(--card))",
              boxShadow: "0 8px 32px color-mix(in srgb, var(--primary) 8%, transparent)",
            }}
          >
            {/* Specializations */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-foreground/55 font-semibold mb-3">
                Specialized in
              </p>
              <ul className="flex flex-col gap-2">
                {specializations.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-[13.5px] font-medium text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--primary)" }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries + cert badge */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-foreground/55 font-semibold mb-3">
                  Industries
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((ind) => (
                    <span
                      key={ind}
                      className="text-[12px] font-medium text-muted-foreground px-2.5 py-1 rounded-lg"
                      style={{
                        background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
                        border: "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                <span className="leading-none tabular-nums" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", color: "var(--accent-foreground)" }}>
                  11×
                </span>
                <div>
                  <p className="text-[15px] leading-snug" style={{ color: "var(--accent-foreground)" }}>Microsoft Certified</p>
                  <p className="text-[12px] mt-1" style={{ color: "color-mix(in srgb, var(--accent-foreground) 75%, transparent)" }}>DP-600 · PL-300 · AZ-104 · DP-700 · DP-100</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
