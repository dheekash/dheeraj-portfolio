"use client";

import { motion } from "framer-motion";
import {
  PythonLogo, SQLLogo, DbtLogo, AirflowLogo, SparkLogo,
  SnowflakeLogo, BigQueryLogo, PowerBILogo, TableauLogo,
  AWSLogo, AzureLogo, DockerLogo, KafkaLogo,
  DatabricksLogo, FabricLogo,
} from "@/components/common/TechLogos";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function GCPLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Google Cloud" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.5l3.5 2v4L12 14.5 8.5 12.5v-4z" fill="#4285F4"/>
      <path d="M15.5 8.5l3 1.5v3l-3 1.5" fill="#34A853"/>
      <path d="M8.5 8.5l-3 1.5v3l3 1.5" fill="#FBBC05"/>
      <path d="M12 14.5v3.5" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="20" r="1.5" fill="#EA4335"/>
    </svg>
  );
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
    category: "BI & Analytics",
    tools: [
      { name: "Power BI",  Logo: PowerBILogo  },
      { name: "Fabric",    Logo: FabricLogo   },
      { name: "Tableau",   Logo: TableauLogo  },
      { name: "BigQuery",  Logo: BigQueryLogo },
      { name: "DAX"                           },
      { name: "Grafana"                       },
      { name: "Zebra BI"                      },
    ],
  },
  {
    category: "Data Engineering",
    tools: [
      { name: "Databricks", Logo: DatabricksLogo },
      { name: "Snowflake",  Logo: SnowflakeLogo  },
      { name: "dbt",        Logo: DbtLogo        },
      { name: "SQLMesh"                          },
      { name: "Spark",      Logo: SparkLogo      },
      { name: "Kafka",      Logo: KafkaLogo      },
      { name: "Airflow",    Logo: AirflowLogo    },
      { name: "Delta Lake"                       },
      { name: "ADF"                              },
    ],
  },
  {
    category: "Programming",
    tools: [
      { name: "Python",  Logo: PythonLogo },
      { name: "SQL",     Logo: SQLLogo    },
      { name: "PySpark"                   },
      { name: "DAX"                       },
      { name: "M Query"                   },
      { name: "Pandas"                    },
    ],
  },
  {
    category: "Cloud",
    tools: [
      { name: "Azure",  Logo: AzureLogo  },
      { name: "AWS",    Logo: AWSLogo    },
      { name: "GCP",    Logo: GCPLogo    },
      { name: "Docker", Logo: DockerLogo },
    ],
  },
  {
    category: "Automation",
    tools: [
      { name: "Power Automate" },
      { name: "SharePoint"     },
      { name: "GitHub"         },
      { name: "Azure Logic Apps"},
    ],
  },
];

export function TechStackSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[18ch] mb-3">
          Technology stack
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          The full platform ecosystem I architect, engineer, and deliver — from raw ingestion through to
          executive-facing analytics.
        </motion.p>

        <div className="border border-border rounded-2xl overflow-hidden">
          {rows.map((row, i) => (
            <motion.div
              key={row.category}
              {...reveal(0.04 + i * 0.05)}
              className={`grid sm:grid-cols-[clamp(8rem,14vw,13rem)_1fr] gap-x-6 gap-y-3 px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.9rem,1.4vw,1.25rem)] items-start ${
                i > 0 ? "border-t border-border" : ""
              } ${
                i % 2 === 1 ? "bg-[color:color-mix(in_srgb,var(--primary)_2%,var(--card))]" : ""
              }`}
            >
              <p className="eyebrow pt-1 whitespace-nowrap">{row.category}</p>
              <div className="flex flex-wrap gap-2">
                {row.tools.map((t) => <Chip key={t.name} {...t} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
