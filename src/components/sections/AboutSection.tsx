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
  "Snowflake",
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
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="mb-6">
          About me
        </motion.h2>

        {/* Role statement */}
        <motion.p
          {...reveal(0.05)}
          className="text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-muted-foreground max-w-[60ch] text-pretty mb-8"
        >
          I started in customer support. The data told a different story than the reports, so I switched to analytics.
          Seven years later, I build Lakehouse platforms, semantic models, and pipelines for enterprise clients across 15 countries.
          My focus is simple: does the dashboard answer the question it was built to answer?
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
          {/* Specializations */}
          <motion.div {...reveal(0.08)}>
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground/55 mb-3">
              Specialized in
            </p>
            <ul className="flex flex-col gap-2">
              {specializations.map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-[13.5px] font-medium text-foreground">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--primary)" }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries + cert callout */}
          <motion.div {...reveal(0.11)} className="flex flex-col gap-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground/55 mb-3">
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
              className="rounded-xl px-4 py-3.5 flex items-center gap-3"
              style={{
                background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
                border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
            >
              <span
                className="font-mono font-bold text-[1.6rem] leading-none tabular-nums"
                style={{ color: "var(--primary)" }}
              >
                11×
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground leading-snug">Microsoft Certified</p>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">DP-600 · PL-300 · AZ-104 · DP-700 · DP-100</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          {...reveal(0.14)}
          className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/80 mt-8"
        >
          Bengaluru, India · IST (UTC+5:30)
        </motion.p>
      </div>
    </section>
  );
}
