"use client";

import { useState } from "react";
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
      { name: "Power BI",          Logo: PowerBILogo,    years: "6 yrs", level: "Expert"    },
      { name: "Microsoft Fabric",  Logo: FabricLogo,     years: "2 yrs", level: "Advanced"  },
      { name: "DAX",                                      years: "5 yrs", level: "Expert"    },
      { name: "Power Query",       Logo: PowerQueryLogo, years: "5 yrs", level: "Advanced"  },
      { name: "Excel",             Logo: ExcelLogo,      years: "7 yrs", level: "Expert"    },
      { name: "Paginated Reports",                        years: "3 yrs", level: "Advanced"  },
      { name: "KPI Modeling",                             years: "5 yrs", level: "Expert"    },
      { name: "Report Design",                            years: "6 yrs", level: "Expert"    },
    ],
  },
  {
    title: "Data Engineering",
    color: "rgba(59,130,246,0.12)",
    tools: [
      { name: "SQL",         Logo: SQLLogo,    years: "7 yrs", level: "Expert"    },
      { name: "Python",      Logo: PythonLogo, years: "5 yrs", level: "Advanced"  },
      { name: "PySpark",     Logo: SparkLogo,  years: "3 yrs", level: "Advanced"  },
      { name: "dbt",         Logo: DbtLogo,    years: "2 yrs", level: "Advanced"  },
      { name: "ADF / ETL",                     years: "4 yrs", level: "Advanced"  },
      { name: "SQLMesh",                        years: "1 yr",  level: "Proficient"},
      { name: "Delta Lake",                     years: "2 yrs", level: "Advanced"  },
      { name: "Apache Kafka",                   years: "2 yrs", level: "Proficient"},
      { name: "Incremental Load",               years: "4 yrs", level: "Expert"    },
    ],
  },
  {
    title: "Cloud & Platforms",
    color: "rgba(0,120,212,0.10)",
    tools: [
      { name: "Azure",        Logo: AzureLogo,      years: "4 yrs", level: "Advanced"  },
      { name: "Snowflake",    Logo: SnowflakeLogo,  years: "3 yrs", level: "Advanced"  },
      { name: "Databricks",   Logo: DatabricksLogo, years: "2 yrs", level: "Advanced"  },
      { name: "OneLake",                             years: "1 yr",  level: "Proficient"},
      { name: "ADLS Gen2",                           years: "3 yrs", level: "Advanced"  },
      { name: "Azure Event Hubs",                    years: "2 yrs", level: "Proficient"},
      { name: "Unity Catalog",                       years: "1 yr",  level: "Proficient"},
      { name: "SharePoint",                          years: "3 yrs", level: "Advanced"  },
    ],
  },
  {
    title: "Architecture",
    color: "rgba(16,185,129,0.10)",
    tools: [
      { name: "Medallion Architecture",  years: "3 yrs", level: "Expert"   },
      { name: "Star Schema",             years: "6 yrs", level: "Expert"   },
      { name: "Semantic Modeling",       years: "5 yrs", level: "Expert"   },
      { name: "Direct Lake",             years: "1 yr",  level: "Advanced" },
      { name: "Data Modeling",           years: "6 yrs", level: "Expert"   },
      { name: "SCD Type 2",             years: "3 yrs", level: "Advanced" },
      { name: "Data Governance",         years: "3 yrs", level: "Advanced" },
    ],
  },
  {
    title: "Automation & DevOps",
    color: "rgba(139,92,246,0.10)",
    tools: [
      { name: "Power Automate", Logo: MicrosoftLogo, years: "3 yrs", level: "Advanced"  },
      { name: "Azure DevOps",                         years: "2 yrs", level: "Proficient"},
      { name: "CI / CD",                              years: "2 yrs", level: "Proficient"},
      { name: "Git / GitHub",                         years: "4 yrs", level: "Advanced"  },
      { name: "Scheduled Alerts",                     years: "4 yrs", level: "Advanced"  },
      { name: "Pipeline Monitoring",                  years: "3 yrs", level: "Advanced"  },
    ],
  },
  {
    title: "Leadership & Delivery",
    color: "rgba(239,68,68,0.10)",
    tools: [
      { name: "Team Leadership",          years: "4 yrs", level: "Advanced"  },
      { name: "Stakeholder Management",   years: "5 yrs", level: "Expert"    },
      { name: "Requirements Gathering",   years: "5 yrs", level: "Expert"    },
      { name: "Cross-functional Delivery",years: "4 yrs", level: "Advanced"  },
      { name: "Client Presentations",     years: "5 yrs", level: "Advanced"  },
      { name: "Agile / Scrum",            years: "4 yrs", level: "Advanced"  },
      { name: "Project Planning",         years: "4 yrs", level: "Advanced"  },

    ],
  },
];

const techLogos: {
  name: string;
  Logo: (props: { size?: number }) => React.ReactElement;
  bg: string;
  years: string;
  level: string;
}[] = [
  { name: "Power BI",   Logo: PowerBILogo,    bg: "rgba(242,200,17,0.12)",  years: "6 yrs", level: "Expert"   },
  { name: "Fabric",     Logo: FabricLogo,     bg: "rgba(0,120,212,0.10)",   years: "2 yrs", level: "Advanced" },
  { name: "Azure",      Logo: AzureLogo,      bg: "rgba(0,120,212,0.10)",   years: "4 yrs", level: "Advanced" },
  { name: "Snowflake",  Logo: SnowflakeLogo,  bg: "rgba(41,181,232,0.12)",  years: "3 yrs", level: "Advanced" },
  { name: "Python",     Logo: PythonLogo,     bg: "rgba(55,118,171,0.12)",  years: "5 yrs", level: "Advanced" },
  { name: "Databricks", Logo: DatabricksLogo, bg: "rgba(255,54,33,0.08)",   years: "2 yrs", level: "Advanced" },
  { name: "SQL",        Logo: SQLLogo,        bg: "rgba(59,130,246,0.10)",  years: "7 yrs", level: "Expert"   },
  { name: "dbt",        Logo: DbtLogo,        bg: "rgba(255,105,75,0.10)",  years: "2 yrs", level: "Advanced" },
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

function LogoTile({ name, Logo, bg, years, level }: typeof techLogos[number]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="panel rounded-xl p-3 flex flex-col items-center gap-1.5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden"
      style={{
        borderColor: hovered ? "color-mix(in srgb, var(--primary) 35%, var(--border))" : undefined,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300"
        style={{ background: bg, transform: hovered ? "rotate(6deg) scale(1.1)" : "none" }}
      >
        <Logo size={18} />
      </div>
      <span className="text-[10px] text-muted-foreground text-center leading-tight font-medium">
        {name}
      </span>
      {hovered && (
        <div
          className="absolute inset-x-0 bottom-0 py-1.5 text-center"
          style={{
            background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
            borderTop: "1px solid color-mix(in srgb, var(--primary) 18%, transparent)",
          }}
        >
          <p className="text-[9px] font-mono font-semibold" style={{ color: "var(--primary)" }}>
            {years} · {level}
          </p>
        </div>
      )}
    </div>
  );
}

export function TechStackSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">

        {/* â"€â"€ Core Expertise â"€â"€ */}
        <motion.h2 {...reveal()} className="mb-3">
          Core Expertise
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          Full-stack analytics engineering. Raw data ingestion through governed semantic models to executive-facing dashboards.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-[clamp(2.5rem,4vw,4rem)]">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...reveal(0.04 + i * 0.06)}
              className="panel rounded-2xl p-5 flex flex-col gap-3 panel-lift"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: cat.color.replace("0.1", "0.7").replace("0.12", "0.7").replace("0.15","0.7") }}
                />
                <p className="text-[12px] font-semibold text-foreground tracking-tight">{cat.title}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((t) => (
                  <span
                    key={t.name}
                    className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium text-muted-foreground transition-colors cursor-default hover:text-foreground"
                    style={{
                      background: cat.color,
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

        {/* â"€â"€ Technology Stack â"€â"€ */}
        <motion.div {...reveal(0.28)} className="mb-[clamp(2.5rem,4vw,4rem)]">
          <p className="text-[13px] font-semibold text-foreground mb-4">Technology Stack</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {techLogos.map((t) => (
              <LogoTile key={t.name} {...t} />
            ))}
          </div>
        </motion.div>

        {/* â"€â"€ Platform Decision Guide â"€â"€ */}
        <motion.div {...reveal(0.34)}>
          <p className="text-[13px] font-semibold text-foreground mb-4">Platform Decision Guide</p>
          <p className="text-muted-foreground text-sm mb-5 max-w-[52ch]">
            How I choose between Fabric, Databricks, and Snowflake based on project constraints.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {platformGuide.map((p, i) => (
              <motion.div
                key={p.platform}
                {...reveal(0.36 + i * 0.06)}
                className="panel rounded-2xl overflow-hidden flex flex-col"
              >
                <div
                  className="px-5 py-4"
                  style={{ background: p.bg, borderBottom: `1px solid ${p.border}` }}
                >
                  <p className="text-[13px] font-semibold text-foreground">{p.platform}</p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{p.tagline}</p>
                </div>
                <div className="px-5 py-4 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">Reach for it when</p>
                    <ul className="space-y-1.5">
                      {p.reach.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-[11.5px] text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.accent }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">Skip it when</p>
                    <ul className="space-y-1.5">
                      {p.skip.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[11.5px] text-muted-foreground/60">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-muted-foreground/30" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

