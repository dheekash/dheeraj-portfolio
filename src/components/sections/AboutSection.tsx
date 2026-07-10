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
            <motion.p {...reveal()} className="eyebrow mb-3">
              Narrative
            </motion.p>
            <motion.h2 {...reveal(0.02)} className="mb-6">
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
              {/* The drive — massive stylized blockquote */}
              <blockquote className="relative pl-8 pt-2">
                <span
                  aria-hidden
                  className="absolute -left-1 -top-5 select-none text-gradient"
                  style={{ fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 700, lineHeight: 1, opacity: 0.9 }}
                >
                  &ldquo;
                </span>
                <p
                  className="text-foreground text-glow"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
                >
                  Does this help people make better decisions?
                </p>
              </blockquote>
            </motion.div>

            <motion.p
              {...reveal(0.1)}
              className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground/80"
            >
              Bengaluru, India · IST (UTC+5:30)
            </motion.p>
          </div>

          {/* Right — industries constellation + credibility card */}
          <motion.div {...reveal(0.08)} className="flex flex-col gap-6">
            {/* Constellation — industries orbiting a central node */}
            <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label={`Industries: ${industries.join(", ")}`}>
              <defs>
                <linearGradient id="constel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              {industries.map((ind, i) => {
                const angle = (i / industries.length) * Math.PI * 2 - Math.PI / 2;
                const x = 180 + Math.cos(angle) * 120;
                const y = 100 + Math.sin(angle) * 66;
                return (
                  <g key={ind}>
                    <line x1="180" y1="100" x2={x} y2={y} stroke="url(#constel)" strokeOpacity="0.25" strokeWidth="1" />
                    <circle cx={x} cy={y} r="3.5" fill="url(#constel)">
                      <animate attributeName="opacity" values="1;0.4;1" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                    <text
                      x={x}
                      y={y + (y > 100 ? 16 : -10)}
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
                      fontSize="9"
                      fill="#B0B8C5"
                    >
                      {ind}
                    </text>
                  </g>
                );
              })}
              <circle cx="180" cy="100" r="7" fill="url(#constel)" />
              <circle cx="180" cy="100" r="12" fill="none" stroke="url(#constel)" strokeOpacity="0.4" strokeWidth="1">
                <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>

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

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
