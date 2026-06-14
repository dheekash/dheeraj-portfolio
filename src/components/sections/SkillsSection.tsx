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

/* Tool chip — logo + name */
function Chip({ name, Logo }: Tool) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg panel panel-lift text-sm font-medium text-foreground">
      {Logo && <Logo size={16} />}
      <span className="text-[12px] text-muted-foreground font-medium leading-none">{name}</span>
    </div>
  );
}

/* Six-category bento grid */
const categories: { label: string; tools: Tool[]; accent?: boolean; wide?: boolean }[] = [
  {
    label: "Analytics & BI",
    wide: true,
    tools: [
      { name: "Power BI",  Logo: PowerBILogo  },
      { name: "Fabric",    Logo: FabricLogo   },
      { name: "BigQuery",  Logo: BigQueryLogo  },
      { name: "Tableau",   Logo: TableauLogo   },
      { name: "DAX"                            },
      { name: "Paginated Reports"              },
    ],
  },
  {
    label: "Cloud",
    tools: [
      { name: "Azure",  Logo: AzureLogo  },
      { name: "AWS",    Logo: AWSLogo    },
      { name: "GCP",    Logo: GCPLogo    },
      { name: "Docker", Logo: DockerLogo },
    ],
  },
  {
    label: "Data Engineering",
    tools: [
      { name: "Python",     Logo: PythonLogo     },
      { name: "SQL",        Logo: SQLLogo         },
      { name: "dbt",        Logo: DbtLogo         },
      { name: "Airflow",    Logo: AirflowLogo     },
      { name: "PySpark",    Logo: SparkLogo       },
      { name: "Kafka",      Logo: KafkaLogo       },
      { name: "Databricks", Logo: DatabricksLogo  },
      { name: "Snowflake",  Logo: SnowflakeLogo   },
      { name: "SQLMesh"                           },
    ],
  },
  {
    label: "Visualization",
    tools: [
      { name: "Power BI",  Logo: PowerBILogo  },
      { name: "Tableau",   Logo: TableauLogo  },
      { name: "Zebra BI"                      },
      { name: "Matplotlib"                    },
      { name: "Seaborn"                       },
    ],
  },
  {
    label: "Programming",
    tools: [
      { name: "Python",  Logo: PythonLogo },
      { name: "SQL",     Logo: SQLLogo    },
      { name: "DAX"                       },
      { name: "M Query"                   },
      { name: "Pandas"                    },
      { name: "NumPy"                     },
    ],
  },
  {
    label: "AI & ML",
    accent: true,
    tools: [
      { name: "MLflow"              },
      { name: "scikit-learn"        },
      { name: "Azure ML"            },
      { name: "Statistical Modeling"},
      { name: "Anomaly Detection"   },
      { name: "Forecasting"         },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[18ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          What I work with
        </motion.h2>

        {/* Bento grid: row-1 wide+narrow, row-2 three equal, row-3 full-width accent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Row 1: Analytics (2/3) + Cloud (1/3) */}
          <motion.div
            {...reveal(0.05)}
            className="md:col-span-2 rounded-2xl panel p-[clamp(1.25rem,2vw,2rem)]"
          >
            <p className="eyebrow mb-4">{categories[0].label}</p>
            <div className="flex flex-wrap gap-2">
              {categories[0].tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.09)}
            className="rounded-2xl panel p-[clamp(1.25rem,2vw,2rem)]"
            style={{ background: "color-mix(in srgb, var(--primary) 4%, var(--card))" }}
          >
            <p className="eyebrow mb-4">{categories[1].label}</p>
            <div className="flex flex-wrap gap-2">
              {categories[1].tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>

          {/* Row 2: Data Engineering + Visualization + Programming */}
          {categories.slice(2, 5).map((cat, i) => (
            <motion.div
              key={cat.label}
              {...reveal(0.12 + i * 0.06)}
              className="rounded-2xl panel p-[clamp(1.25rem,2vw,2rem)]"
            >
              <p className="eyebrow mb-4">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((t) => <Chip key={t.name} {...t} />)}
              </div>
            </motion.div>
          ))}

          {/* Row 3: AI & ML full width with accent gradient */}
          <motion.div
            {...reveal(0.26)}
            className="md:col-span-3 rounded-2xl p-[clamp(1.25rem,2vw,2rem)]"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, var(--card)) 0%, color-mix(in srgb, var(--primary) 3%, var(--card)) 100%)",
              border: "1px solid color-mix(in srgb, var(--primary) 20%, var(--border))",
            }}
          >
            <p className="eyebrow mb-4" style={{ color: "var(--primary)" }}>
              {categories[5].label}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories[5].tools.map((t) => <Chip key={t.name} {...t} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
