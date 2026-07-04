"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

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

          {/* Right — credibility card (animated warm border) */}
          <motion.div {...reveal(0.08)}>
            <div className="uicard">
              <div className="uicard-border" aria-hidden />

              {/* Title */}
              <div>
                <p className="text-[15px] font-semibold text-foreground">Specialized in</p>
                <p className="mt-1 text-[13px] text-muted-foreground max-w-[34ch]">
                  Core tools I design and build with, day to day.
                </p>
              </div>

              <hr className="uicard-line" />

              {/* Specializations checklist */}
              <ul className="flex flex-col gap-2.5">
                {specializations.map((s) => (
                  <li key={s} className="flex items-center gap-2.5">
                    <span className="uicard-check">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="uicard-check-svg" aria-hidden>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-[14px] text-foreground">{s}</span>
                  </li>
                ))}
              </ul>

              <hr className="uicard-line" />

              {/* Industries */}
              <div>
                <p className="eyebrow mb-2">Industries</p>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((ind) => (
                    <span
                      key={ind}
                      className="text-[12px] font-medium text-muted-foreground px-2.5 py-1 rounded-lg"
                      style={{
                        background: "color-mix(in srgb, var(--foreground) 4%, var(--card))",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* 11× cert badge — the one peach accent */}
              <div
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                <span className="leading-none tabular-nums" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.8rem", color: "var(--accent-foreground)" }}>
                  11×
                </span>
                <div>
                  <p className="text-[14px] leading-snug" style={{ color: "var(--accent-foreground)" }}>Microsoft Certified</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "color-mix(in srgb, var(--accent-foreground) 75%, transparent)" }}>DP-600 · PL-300 · AZ-104 · DP-700 · DP-100</p>
                </div>
              </div>

              {/* CTA */}
              <a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn w-full rounded-full py-2.5 text-center text-[13px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Book a call
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
