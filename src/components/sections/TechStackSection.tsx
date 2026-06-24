"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Settings, Layers, BarChart3, TrendingUp } from "lucide-react";
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
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

type Tool = { name: string; Logo?: (props: { size?: number }) => React.ReactElement };

function Chip({ name, Logo }: Tool) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg panel text-[12px] font-medium text-muted-foreground">
      {Logo && <Logo size={13} />}
      {name}
    </span>
  );
}

const rows: { category: string; tools: Tool[] }[] = [
  {
    category: "Analytics & BI",
    tools: [
      { name: "Power BI",          Logo: PowerBILogo    },
      { name: "Microsoft Fabric",  Logo: FabricLogo     },
      { name: "DAX"                                     },
      { name: "Power Query",       Logo: PowerQueryLogo },
      { name: "Excel",             Logo: ExcelLogo      },
      { name: "Paginated Reports"                       },
    ],
  },
  {
    category: "Data Engineering",
    tools: [
      { name: "SQL",    Logo: SQLLogo    },
      { name: "Python", Logo: PythonLogo },
      { name: "PySpark",Logo: SparkLogo  },
      { name: "dbt",    Logo: DbtLogo    },
      { name: "ETL / ADF"                },
      { name: "SQLMesh"                  },
      { name: "Delta Lake"               },
    ],
  },
  {
    category: "Cloud & Platforms",
    tools: [
      { name: "Azure",      Logo: AzureLogo      },
      { name: "Snowflake",  Logo: SnowflakeLogo  },
      { name: "Databricks", Logo: DatabricksLogo },
      { name: "OneLake"                          },
      { name: "ADLS Gen2"                        },
    ],
  },
  {
    category: "Architecture",
    tools: [
      { name: "Data Modeling"           },
      { name: "Star Schema"             },
      { name: "Medallion Architecture" },
      { name: "Direct Lake"             },
      { name: "Semantic Modeling"       },
    ],
  },
  {
    category: "Automation",
    tools: [
      { name: "Power Automate", Logo: MicrosoftLogo },
      { name: "Power Query",    Logo: PowerQueryLogo },
      { name: "Azure DevOps"                        },
      { name: "CI / CD"                             },
    ],
  },
];

const techLogos: {
  name: string;
  Logo: (props: { size?: number }) => React.ReactElement;
  bg: string;
}[] = [
  { name: "Power BI",   Logo: PowerBILogo,    bg: "rgba(242,200,17,0.12)"  },
  { name: "Fabric",     Logo: FabricLogo,     bg: "rgba(0,120,212,0.10)"   },
  { name: "Azure",      Logo: AzureLogo,      bg: "rgba(0,120,212,0.10)"   },
  { name: "Snowflake",  Logo: SnowflakeLogo,  bg: "rgba(41,181,232,0.12)"  },
  { name: "Python",     Logo: PythonLogo,     bg: "rgba(55,118,171,0.12)"  },
  { name: "Databricks", Logo: DatabricksLogo, bg: "rgba(255,54,33,0.08)"   },
  { name: "SQL",        Logo: SQLLogo,        bg: "rgba(59,130,246,0.10)"  },
  { name: "dbt",        Logo: DbtLogo,        bg: "rgba(255,105,75,0.10)"  },
];

const pipeline: {
  label: string;
  sublabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
}[] = [
  { label: "Source Systems", sublabel: "CRM · ERP · APIs",    icon: Database,  color: "#1591DC" },
  { label: "SQL / Snowflake", sublabel: "Ingest & store",     icon: Database,  color: "#29B5E8" },
  { label: "ETL / ADF",      sublabel: "Transform & clean",   icon: Settings,  color: "#7c3aed" },
  { label: "Semantic Layer", sublabel: "DAX models",          icon: Layers,    color: "#d97706" },
  { label: "Power BI",       sublabel: "Dashboards",          icon: BarChart3, color: "#F2C811" },
  { label: "Decisions",      sublabel: "Business outcomes",   icon: TrendingUp,color: "#059669" },
];

export function TechStackSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[22ch] mb-3">
          Skills & Technology Stack
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(1.75rem,3vw,3rem)]">
          Full-stack analytics engineering, from raw ingestion through governed semantic models to
          executive-facing dashboards.
        </motion.p>

        {/* Skills table */}
        <div className="border border-border rounded-2xl overflow-hidden mb-[clamp(1.75rem,3vw,3rem)]">
          {rows.map((row, i) => (
            <motion.div
              key={row.category}
              {...reveal(0.04 + i * 0.05)}
              className={`grid sm:grid-cols-[clamp(8rem,14vw,13rem)_1fr] gap-x-6 gap-y-2.5 px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.75rem,1.2vw,1rem)] items-start ${
                i > 0 ? "border-t border-border" : ""
              } ${
                i % 2 === 1
                  ? "bg-[color:color-mix(in_srgb,var(--primary)_2%,var(--card))]"
                  : ""
              }`}
            >
              <p className="eyebrow pt-1 whitespace-nowrap">{row.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {row.tools.map((t) => <Chip key={t.name} {...t} />)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core platforms logo grid */}
        <motion.div {...reveal(0.28)} className="mb-[clamp(1.75rem,3vw,3rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground mb-3">
            Core Platforms
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {techLogos.map((t) => {
              const Logo = t.Logo;
              return (
                <div
                  key={t.name}
                  className="panel rounded-xl p-2.5 flex flex-col items-center gap-1.5 hover:border-primary/30 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: t.bg }}
                  >
                    <Logo size={17} />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight font-medium">
                    {t.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* End-to-end pipeline diagram */}
        <motion.div {...reveal(0.36)}>
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground mb-3">
            End-to-End Analytics Architecture
          </p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1 min-w-max">
              {pipeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-1">
                    <div
                      className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border"
                      style={{
                        background: `${step.color}0F`,
                        borderColor: `${step.color}30`,
                        minWidth: "6.5rem",
                      }}
                    >
                      <Icon size={14} style={{ color: step.color }} />
                      <p className="text-[11px] font-semibold text-center leading-snug">
                        {step.label}
                      </p>
                      <p className="text-[9.5px] text-muted-foreground text-center leading-snug">
                        {step.sublabel}
                      </p>
                    </div>
                    {i < pipeline.length - 1 && (
                      <ArrowRight size={11} className="text-muted-foreground/35 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
