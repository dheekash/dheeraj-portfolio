"use client";

import { motion } from "framer-motion";
import {
  PythonLogo, SQLLogo, DbtLogo, SparkLogo,
  SnowflakeLogo, PowerBILogo, AzureLogo,
  DatabricksLogo, FabricLogo, PowerQueryLogo,
  MicrosoftLogo, ExcelLogo,
} from "@/components/common/TechLogos";
import { onSpotlightMove } from "@/components/common/spotlight";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

type Tool = {
  name: string;
  Logo?: (props: { size?: number }) => React.ReactElement;
  years?: string;
  level?: string;
};

const categories: { title: string; color: string; tools: Tool[] }[] = [
  {
    title: "Analytics & BI",
    color: "rgba(242,200,17,0.15)",
    tools: [
      { name: "Power BI",         Logo: PowerBILogo,    years: "6 yrs", level: "Expert"   },
      { name: "Microsoft Fabric", Logo: FabricLogo,     years: "2 yrs", level: "Advanced" },
      { name: "DAX",                                     years: "5 yrs", level: "Expert"   },
      { name: "Power Query",      Logo: PowerQueryLogo, years: "5 yrs", level: "Advanced" },
      { name: "Excel",            Logo: ExcelLogo,      years: "7 yrs", level: "Expert"   },
    ],
  },
  {
    title: "Data Engineering",
    color: "rgba(59,130,246,0.12)",
    tools: [
      { name: "SQL",       Logo: SQLLogo,    years: "7 yrs", level: "Expert"   },
      { name: "Python",    Logo: PythonLogo, years: "5 yrs", level: "Advanced" },
      { name: "PySpark",   Logo: SparkLogo,  years: "3 yrs", level: "Advanced" },
      { name: "dbt",       Logo: DbtLogo,    years: "2 yrs", level: "Advanced" },
      { name: "ADF / ETL",                   years: "4 yrs", level: "Advanced" },
    ],
  },
  {
    title: "Cloud & Platforms",
    color: "rgba(0,120,212,0.10)",
    tools: [
      { name: "Azure",      Logo: AzureLogo,      years: "4 yrs", level: "Advanced"  },
      { name: "Snowflake",  Logo: SnowflakeLogo,  years: "3 yrs", level: "Advanced"  },
      { name: "Databricks", Logo: DatabricksLogo, years: "2 yrs", level: "Advanced"  },
      { name: "OneLake",                           years: "1 yr",  level: "Proficient"},
      { name: "ADLS Gen2",                         years: "3 yrs", level: "Advanced"  },
    ],
  },
  {
    title: "Architecture",
    color: "rgba(16,185,129,0.10)",
    tools: [
      { name: "Medallion Architecture", years: "3 yrs", level: "Expert"   },
      { name: "Star Schema",            years: "6 yrs", level: "Expert"   },
      { name: "Semantic Modeling",      years: "5 yrs", level: "Expert"   },
      { name: "Direct Lake",            years: "1 yr",  level: "Advanced" },
      { name: "Data Modeling",          years: "6 yrs", level: "Expert"   },
    ],
  },
  {
    title: "Automation & DevOps",
    color: "rgba(139,92,246,0.10)",
    tools: [
      { name: "Power Automate",    Logo: MicrosoftLogo, years: "3 yrs", level: "Advanced"  },
      { name: "Azure DevOps",                            years: "2 yrs", level: "Proficient"},
      { name: "CI / CD",                                 years: "2 yrs", level: "Proficient"},
      { name: "Git / GitHub",                            years: "4 yrs", level: "Advanced"  },
      { name: "Pipeline Monitoring",                     years: "3 yrs", level: "Advanced"  },
    ],
  },
  {
    title: "Leadership & Delivery",
    color: "rgba(239,68,68,0.10)",
    tools: [
      { name: "Team Leadership",       years: "4 yrs", level: "Advanced" },
      { name: "Stakeholder Management",years: "5 yrs", level: "Expert"   },
      { name: "Client Presentations",  years: "5 yrs", level: "Advanced" },
      { name: "Agile / Scrum",         years: "4 yrs", level: "Advanced" },
      { name: "Project Planning",      years: "4 yrs", level: "Advanced" },
    ],
  },
];


const platformGuide = [
  {
    platform: "Microsoft Fabric",
    tagline: "All-in-one Lakehouse on OneLake",
    Logo: FabricLogo,
    bestFor: "Microsoft-first orgs",
    accent: "#2B9AE0",
    reach: [
      "Client is Microsoft-first (Azure, M365, Teams)",
      "Power BI is the primary BI tool",
      "Need one governed data platform for all workloads",
      "Budget is allocated to Microsoft E5 or Fabric capacity",
    ],
    skip: [
      "Heavy Python/Spark ML workflows that need MLflow parity",
      "Multi-cloud or non-Azure storage mandate",
    ],
  },
  {
    platform: "Databricks",
    tagline: "Unified analytics for ML-heavy pipelines",
    Logo: DatabricksLogo,
    bestFor: "ML at scale",
    accent: "#FF5A3C",
    reach: [
      "ML and feature engineering are first-class requirements",
      "PySpark workloads at significant scale",
      "MLflow experiment tracking and model registry needed",
      "Unity Catalog governance across multiple clouds",
    ],
    skip: [
      "Power BI is the reporting layer (import mode limits apply)",
      "No ML requirements and budget is tight",
    ],
  },
  {
    platform: "Snowflake",
    tagline: "Cloud-agnostic SQL analytics warehouse",
    Logo: SnowflakeLogo,
    bestFor: "Multi-cloud SQL",
    accent: "#29B5E8",
    reach: [
      "Multi-cloud requirement (AWS + Azure + GCP)",
      "SQL-first team with no PySpark investment",
      "dbt is the primary transformation layer",
      "Data sharing across external partners or vendors",
    ],
    skip: [
      "Fabric is already licensed (OneLake overlap)",
      "Real-time streaming is a core requirement",
    ],
  },
];


export function PlatformGuideSection() {
  return (
    <section id="platforms">
      <div className="container-page section-pad">

        {/* ── Platform Decision Guide ── */}
        <motion.div {...reveal()} className="flex items-end justify-between gap-6 flex-wrap mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          <div>
            <h2 className="mb-2">Platform Decision Guide</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[52ch]">
              How I choose between Fabric, Databricks, and Snowflake based on project constraints.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 pb-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>3 platforms</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>When to use each</span>
          </div>
        </motion.div>

        <motion.div {...reveal(0.08)}>
          {/* Snap carousel on mobile → 3-col grid on sm+ */}
          <div className="overflow-x-auto -mx-[clamp(1.25rem,0.75rem+3vw,4.5rem)] px-[clamp(1.25rem,0.75rem+3vw,4.5rem)] pb-3 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
            <div className="flex gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:snap-none">
              {platformGuide.map((p, i) => (
                <motion.div
                  key={p.platform}
                  {...reveal(0.36 + i * 0.06)}
                  onPointerMove={onSpotlightMove}
                  className="spotlight gradient-frame overflow-hidden flex flex-col snap-start flex-shrink-0 w-[min(80vw,320px)] sm:w-auto"
                  style={{ borderTop: `3px solid ${p.accent}` }}
                >
                  <div
                    className="px-5 py-5"
                    style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${p.accent} 22%, transparent) 0%, color-mix(in srgb, ${p.accent} 6%, transparent) 130%)`, borderBottom: `1px solid color-mix(in srgb, ${p.accent} 40%, var(--border))` }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0"
                        style={{ background: `color-mix(in srgb, ${p.accent} 24%, var(--card))`, border: `1px solid color-mix(in srgb, ${p.accent} 40%, transparent)` }}
                      >
                        <p.Logo size={18} />
                      </span>
                      <p className="text-[16px] font-bold text-foreground tracking-tight">{p.platform}</p>
                    </div>
                    <p className="text-[12px] font-mono text-muted-foreground mb-3">{p.tagline}</p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: p.accent, color: "#0A0A12" }}
                    >
                      Best for {p.bestFor}
                    </span>
                  </div>
                  <div className="px-5 py-5 flex flex-col gap-5 flex-1">
                    <div>
                      <p className="text-[12px] font-mono uppercase tracking-[0.12em] font-bold mb-3" style={{ color: p.accent }}>Reach for it when</p>
                      <ul className="space-y-3">
                        {p.reach.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 text-[14px] text-foreground/90 leading-relaxed font-medium">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.4rem]" style={{ background: p.accent }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                      <p className="text-[12px] font-mono uppercase tracking-[0.12em] text-muted-foreground font-bold mb-3">Skip it when</p>
                      <ul className="space-y-3">
                        {p.skip.map((s) => (
                          <li key={s} className="flex items-start gap-2.5 text-[14px] text-muted-foreground leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.4rem] bg-muted-foreground/40" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
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

export function CoreExpertiseSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">

        {/* ── Core Expertise ── */}
        <motion.div {...reveal(0.04)} className="flex items-end justify-between gap-6 flex-wrap mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          <div>
            <h2 className="mb-2">Core Expertise</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[52ch]">
              Full-stack analytics engineering. Raw data ingestion through governed semantic models to executive-facing dashboards.
            </p>
          </div>
          {/* Legend — proficiency by visual weight, not arbitrary percentages */}
          <div className="flex items-center gap-3 flex-shrink-0 pb-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: "color-mix(in srgb, var(--accent) 22%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 45%, transparent)" }} />
              Expert
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: "color-mix(in srgb, var(--foreground) 6%, transparent)", border: "1px solid var(--border)" }} />
              Advanced
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ border: "1px solid var(--border)" }} />
              Proficient
            </span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...reveal(0.1 + i * 0.06)}
              onPointerMove={onSpotlightMove}
              className="spotlight gradient-frame p-5 flex flex-col gap-3.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--primary)", boxShadow: "0 0 8px color-mix(in srgb, var(--primary) 60%, transparent)" }}
                />
                <p className="text-[13px] font-bold text-foreground tracking-tight">{cat.title}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((t) => {
                  const lvl = t.level ?? "";
                  const style =
                    lvl === "Expert"
                      ? { background: "color-mix(in srgb, var(--accent) 16%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)", color: "var(--foreground)" }
                      : lvl === "Advanced"
                      ? { background: "color-mix(in srgb, var(--foreground) 6%, transparent)", border: "1px solid var(--border)", color: "var(--foreground)" }
                      : { background: "transparent", border: "1px solid var(--border)", color: "var(--muted-foreground)" };
                  return (
                    <span
                      key={t.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium cursor-default transition-transform duration-200 hover:-translate-y-px"
                      style={style}
                      title={`${t.years ?? ""}${t.years ? " · " : ""}${lvl}`}
                    >
                      {t.Logo && <t.Logo size={12} />}
                      {t.name}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

