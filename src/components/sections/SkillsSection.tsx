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
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function GCPLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Google Cloud Platform" xmlns="http://www.w3.org/2000/svg">
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
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg panel panel-lift">
      {Logo && <Logo size={15} />}
      <span className="text-[12px] text-muted-foreground font-medium leading-none">{name}</span>
    </div>
  );
}

const categories: {
  label: string;
  span?: "full" | "half";
  tinted?: boolean;
  accent?: boolean;
  tools: Tool[];
}[] = [
  {
    label: "Analytics & BI",
    span: "half",
    tools: [
      { name: "Power BI",          Logo: PowerBILogo   },
      { name: "Microsoft Fabric",  Logo: FabricLogo    },
      { name: "Tableau",           Logo: TableauLogo   },
      { name: "BigQuery",          Logo: BigQueryLogo  },
      { name: "DAX"                                    },
      { name: "Paginated Reports"                      },
      { name: "Zebra BI"                               },
    ],
  },
  {
    label: "Data Engineering",
    span: "half",
    tools: [
      { name: "Databricks",        Logo: DatabricksLogo },
      { name: "Snowflake",         Logo: SnowflakeLogo  },
      { name: "dbt",               Logo: DbtLogo        },
      { name: "SQLMesh"                                 },
      { name: "Apache Kafka",      Logo: KafkaLogo      },
      { name: "Azure Data Factory"                      },
      { name: "Apache Spark",      Logo: SparkLogo      },
      { name: "Delta Lake"                              },
      { name: "Airflow",           Logo: AirflowLogo    },
    ],
  },
  {
    label: "Cloud & Infrastructure",
    tinted: true,
    tools: [
      { name: "Azure",  Logo: AzureLogo  },
      { name: "AWS",    Logo: AWSLogo    },
      { name: "GCP",    Logo: GCPLogo    },
      { name: "Docker", Logo: DockerLogo },
    ],
  },
  {
    label: "Programming",
    tools: [
      { name: "Python",   Logo: PythonLogo },
      { name: "SQL",      Logo: SQLLogo    },
      { name: "PySpark"                    },
      { name: "DAX"                        },
      { name: "M Query"                    },
      { name: "Pandas"                     },
    ],
  },
  {
    label: "Machine Learning",
    accent: true,
    tools: [
      { name: "MLflow"               },
      { name: "scikit-learn"         },
      { name: "Azure ML"             },
      { name: "Forecasting"          },
      { name: "Anomaly Detection"    },
      { name: "Statistical Modeling" },
    ],
  },
];

export function SkillsSection() {
  const [analytics, dataEng, cloud, programming, ml] = categories;

  return (
    <section id="skills">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[18ch] mb-3">
          Technology ecosystem
        </motion.h2>
        <motion.p {...reveal(0.06)} className="text-muted-foreground text-sm leading-relaxed max-w-[52ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          The full platform stack I architect and engineer — from ingestion through to executive-facing analytics products.
        </motion.p>

        {/* Row 1: Analytics + Data Engineering — equal halves */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[analytics, dataEng].map((cat, i) => (
            <motion.div
              key={cat.label}
              {...reveal(0.05 + i * 0.06)}
              className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)]"
            >
              <p className="eyebrow mb-4">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((t) => <Chip key={t.name} {...t} />)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Cloud (1/3) + Programming (1/3) + ML (1/3) */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            {...reveal(0.14)}
            className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)]"
            style={{ background: "color-mix(in srgb, var(--primary) 3%, var(--card))" }}
          >
            <p className="eyebrow mb-4">{cloud.label}</p>
            <div className="flex flex-wrap gap-2">
              {cloud.tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.18)}
            className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)]"
          >
            <p className="eyebrow mb-4">{programming.label}</p>
            <div className="flex flex-wrap gap-2">
              {programming.tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.22)}
            className="rounded-2xl p-[clamp(1.25rem,2vw,2rem)]"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, var(--card)) 0%, color-mix(in srgb, var(--primary) 3%, var(--card)) 100%)",
              border: "1px solid color-mix(in srgb, var(--primary) 22%, var(--border))",
            }}
          >
            <p className="eyebrow mb-4" style={{ color: "var(--primary)" }}>{ml.label}</p>
            <div className="flex flex-wrap gap-2">
              {ml.tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
