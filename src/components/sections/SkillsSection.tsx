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

// [NEEDS REAL CONTENT] Add GCP logo to TechLogos.tsx or replace with a placeholder
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

function PostgreSQLLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="PostgreSQL" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="7" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="1.5"/>
      <path d="M4 7v10c0 2.2 3.58 4 8 4s8-1.8 8-4V7" fill="none" stroke="#336791" strokeWidth="1.5"/>
      <path d="M4 12c0 2.2 3.58 4 8 4s8-1.8 8-4" fill="none" stroke="#336791" strokeWidth="1.2" strokeDasharray="3 2"/>
    </svg>
  );
}

const categories = [
  {
    label: "Data Engineering",
    tools: [
      { name: "Python",    Logo: PythonLogo    },
      { name: "SQL",       Logo: SQLLogo       },
      { name: "dbt",       Logo: DbtLogo       },
      { name: "Airflow",   Logo: AirflowLogo   },
      { name: "Spark",     Logo: SparkLogo     },
      { name: "Kafka",     Logo: KafkaLogo     },
      { name: "PostgreSQL",Logo: PostgreSQLLogo },
      { name: "Databricks",Logo: DatabricksLogo },
      { name: "Snowflake", Logo: SnowflakeLogo  },
    ],
  },
  {
    label: "Analytics & BI",
    tools: [
      { name: "Power BI",  Logo: PowerBILogo   },
      { name: "Tableau",   Logo: TableauLogo   },
      { name: "BigQuery",  Logo: BigQueryLogo  },
      { name: "Fabric",    Logo: FabricLogo    },
    ],
  },
  {
    label: "Infrastructure & Cloud",
    tools: [
      { name: "AWS",       Logo: AWSLogo    },
      { name: "Azure",     Logo: AzureLogo  },
      { name: "GCP",       Logo: GCPLogo    },
      { name: "Docker",    Logo: DockerLogo },
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

        <div className="space-y-[clamp(2rem,3vw,3.5rem)]">
          {categories.map((cat, ci) => (
            <motion.div key={cat.label} {...reveal(0.05 + ci * 0.08)}>
              <p className="eyebrow mb-4">{cat.label}</p>
              <div className="flex flex-wrap gap-3">
                {cat.tools.map(({ name, Logo }) => (
                  <div
                    key={name}
                    className="panel panel-lift rounded-xl px-4 py-3 flex flex-col items-center gap-2 min-w-[5rem]"
                  >
                    <Logo size={22} />
                    <span className="text-[11px] font-medium text-muted-foreground leading-none text-center">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
