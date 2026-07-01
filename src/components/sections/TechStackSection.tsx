"use client";

import { motion } from "framer-motion";
import {
  PythonLogo, SQLLogo, DbtLogo, SparkLogo,
  SnowflakeLogo, PowerBILogo, AzureLogo,
  DatabricksLogo, FabricLogo, PowerQueryLogo,
  MicrosoftLogo, ExcelLogo,
} from "@/components/common/TechLogos";

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
    bg: "rgba(0,120,212,0.08)",
    border: "rgba(0,120,212,0.2)",
    accent: "rgba(0,120,212,0.8)",
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
    bg: "rgba(255,54,33,0.06)",
    border: "rgba(255,54,33,0.18)",
    accent: "rgba(255,54,33,0.8)",
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
    bg: "rgba(41,181,232,0.07)",
    border: "rgba(41,181,232,0.2)",
    accent: "rgba(41,181,232,0.8)",
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


export function TechStackSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">

        {/* ── Platform Decision Guide ── */}
        <motion.h2 {...reveal()} className="mb-3">
          Platform Decision Guide
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          How I choose between Fabric, Databricks, and Snowflake based on project constraints.
        </motion.p>

        <motion.div {...reveal(0.08)}>
          {/* Snap carousel on mobile → 3-col grid on sm+ */}
          <div className="overflow-x-auto -mx-[clamp(1.25rem,0.75rem+3vw,4.5rem)] px-[clamp(1.25rem,0.75rem+3vw,4.5rem)] pb-3 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
            <div className="flex gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:snap-none">
              {platformGuide.map((p, i) => (
                <motion.div
                  key={p.platform}
                  {...reveal(0.36 + i * 0.06)}
                  className="panel rounded-2xl overflow-hidden flex flex-col snap-start flex-shrink-0 w-[min(80vw,320px)] sm:w-auto"
                >
                  <div
                    className="px-5 py-4"
                    style={{ background: p.bg, borderBottom: `1px solid ${p.border}` }}
                  >
                    <p className="text-[13px] font-semibold text-foreground">{p.platform}</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{p.tagline}</p>
                  </div>
                  <div className="px-5 py-5 flex flex-col gap-5 flex-1">
                    <div>
                      <p className="text-[12px] font-mono uppercase tracking-[0.12em] font-bold mb-3" style={{ color: p.accent.replace("0.8", "1") }}>Reach for it when</p>
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

        {/* ── Core Expertise ── */}
        <motion.h2 {...reveal(0.04)} className="mb-3 mt-[clamp(3rem,5vw,5rem)]">
          Core Expertise
        </motion.h2>
        <motion.p {...reveal(0.08)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          Full-stack analytics engineering. Raw data ingestion through governed semantic models to executive-facing dashboards.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...reveal(0.1 + i * 0.06)}
              className="panel rounded-2xl p-5 flex flex-col gap-3 panel-lift"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0 bg-foreground/20" />
                <p className="text-[13px] font-bold text-foreground tracking-tight">{cat.title}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium text-muted-foreground cursor-default hover:text-foreground transition-colors"
                    style={{
                      background: "color-mix(in srgb, var(--muted) 50%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
                    }}
                    title={`${t.years} · ${t.level}`}
                  >
                    {t.Logo && <t.Logo size={11} />}
                    {t.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

