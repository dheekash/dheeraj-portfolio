/**
 * TechLogos.tsx
 * Brand-accurate SVG logo components for all technologies in the portfolio.
 * Uses simple-icons for brands available there; custom SVGs for the rest.
 */

import {
  siDatabricks,
  siSnowflake,
  siPython,
  siApachespark,
  siGrafana,
  siLooker,
  siGithub,
  siScikitlearn,
  siJupyter,
  siPandas,
  siDocker,
  siKubernetes,
  siApacheairflow,
  siApachekafka,
  siGooglebigquery,
  siTerraform,
  siNumpy,
} from "simple-icons";

export interface LogoProps {
  size?: number;
  className?: string;
}

// ── Simple-icons wrapper ──────────────────────────────────────────────────────

function SiIcon({
  icon,
  size = 24,
  className = "",
}: {
  icon: { path: string; hex: string; title: string };
} & LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={`#${icon.hex}`}
      className={className}
      role="img"
      aria-label={icon.title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

// ── simple-icons re-exports ───────────────────────────────────────────────────

export const DatabricksLogo = (p: LogoProps) => <SiIcon icon={siDatabricks} {...p} />;
export const SnowflakeLogo   = (p: LogoProps) => <SiIcon icon={siSnowflake}  {...p} />;
export const PythonLogo      = (p: LogoProps) => <SiIcon icon={siPython}     {...p} />;
export const SparkLogo       = (p: LogoProps) => <SiIcon icon={siApachespark}{...p} />;
export const GrafanaLogo     = (p: LogoProps) => <SiIcon icon={siGrafana}    {...p} />;
export const LookerLogo      = (p: LogoProps) => <SiIcon icon={siLooker}     {...p} />;
export const GithubLogoSI    = (p: LogoProps) => <SiIcon icon={siGithub}     {...p} />;
export const ScikitLearnLogo = (p: LogoProps) => <SiIcon icon={siScikitlearn}{...p} />;
export const JupyterLogo     = (p: LogoProps) => <SiIcon icon={siJupyter}    {...p} />;
export const PandasLogo      = (p: LogoProps) => <SiIcon icon={siPandas}     {...p} />;
export const DockerLogo      = (p: LogoProps) => <SiIcon icon={siDocker}     {...p} />;
export const K8sLogo         = (p: LogoProps) => <SiIcon icon={siKubernetes} {...p} />;
export const AirflowLogo     = (p: LogoProps) => <SiIcon icon={siApacheairflow}{...p} />;
export const KafkaLogo       = (p: LogoProps) => <SiIcon icon={siApachekafka}{...p} />;
export const BigQueryLogo    = (p: LogoProps) => <SiIcon icon={siGooglebigquery}{...p} />;
export const TerraformLogo   = (p: LogoProps) => <SiIcon icon={siTerraform}  {...p} />;
export const NumpyLogo       = (p: LogoProps) => <SiIcon icon={siNumpy}      {...p} />;

// ── Custom SVG logos ──────────────────────────────────────────────────────────

/** Microsoft — four-square Windows flag */
export function MicrosoftLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Microsoft" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"    y="1"    width="10.5" height="10.5" fill="#f25022" />
      <rect x="12.5" y="1"    width="10.5" height="10.5" fill="#7fba00" />
      <rect x="1"    y="12.5" width="10.5" height="10.5" fill="#00a4ef" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#ffb900" />
    </svg>
  );
}

/** Microsoft Azure — stylised "A" triangle */
export function AzureLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Microsoft Azure" xmlns="http://www.w3.org/2000/svg">
      {/* Main A body */}
      <path d="M13.1 3.5 5.5 16.8l3.1.01 3.3-5.7 3.4 8.07h3.2L13.1 3.5z" fill="#0078D4" />
      {/* Bottom bar */}
      <path d="M8.4 16.81 4.5 20.5h15.1l-2.8-3.69H8.4z" fill="#0078D4" opacity="0.7" />
    </svg>
  );
}

/** Microsoft Power BI — yellow column bars */
export function PowerBILogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Microsoft Power BI" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="11" width="4.5" height="11" rx="1" fill="#F2C811" />
      <rect x="9"  y="6"  width="4.5" height="16" rx="1" fill="#F2C811" />
      <rect x="16" y="2"  width="4.5" height="20" rx="1" fill="#F2C811" />
      {/* subtle shadow bars */}
      <rect x="2"  y="11" width="4.5" height="11" rx="1" fill="#B8980C" opacity="0.35" />
    </svg>
  );
}

/** Microsoft Fabric — hexagonal fabric weave */
export function FabricLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Microsoft Fabric" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 21.5 7.5v9L12 22 2.5 16.5v-9z"
        fill="none" stroke="#0078D4" strokeWidth="1.5" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#0078D4" opacity="0.85" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" fill="#29B5E8" />
    </svg>
  );
}

/** dbt — orange triangle network (the dbt "transformation" motif) */
export function DbtLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="dbt" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12"  cy="4.5"  r="2.5" fill="#FF694B" />
      <circle cx="4.5" cy="18"   r="2.5" fill="#FF694B" />
      <circle cx="19.5"cy="18"   r="2.5" fill="#FF694B" />
      <line x1="12"   y1="7"  x2="4.5"  y2="15.5" stroke="#FF694B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12"   y1="7"  x2="19.5" y2="15.5" stroke="#FF694B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4.5"  y1="18" x2="19.5" y2="18"   stroke="#FF694B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Tableau — coloured cross of rectangles */
export function TableauLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Tableau" xmlns="http://www.w3.org/2000/svg">
      {/* vertical bar */}
      <rect x="9.5" y="2"  width="5"  height="8"  rx="1" fill="#E97627" />
      <rect x="9.5" y="14" width="5"  height="8"  rx="1" fill="#E97627" />
      {/* horizontal bar */}
      <rect x="2"  y="9.5" width="8"  height="5"  rx="1" fill="#4E79A7" />
      <rect x="14" y="9.5" width="8"  height="5"  rx="1" fill="#4E79A7" />
      {/* centre */}
      <rect x="9.5" y="9.5" width="5" height="5"  rx="1" fill="#59A14F" />
    </svg>
  );
}

/** SQLMesh — database cylinders with mesh lines */
export function SQLMeshLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="SQLMesh" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5.5" rx="8.5" ry="3" fill="none" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M3.5 5.5v13c0 1.66 3.81 3 8.5 3s8.5-1.34 8.5-3v-13" fill="none" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M3.5 12c0 1.66 3.81 3 8.5 3s8.5-1.34 8.5-3" fill="none" stroke="#2563EB" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

/** Delta Lake — hollow delta triangle */
export function DeltaLakeLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Delta Lake" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3 22 20H2z" fill="none" stroke="#E25A1C" strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="8"  y1="16.5" x2="16" y2="16.5" stroke="#E25A1C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="12.5" x2="14" y2="12.5" stroke="#E25A1C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Generic SQL — database cylinder */
export function SQLLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="SQL" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5.5" rx="9" ry="3.5" fill="#3B82F6" opacity="0.18" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M3 5.5v13c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-13" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M3 12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5" fill="none" stroke="#3B82F6" strokeWidth="1.3" opacity="0.5" />
    </svg>
  );
}

/** KQL — like SQL but in teal for Kusto */
export function KQLLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="KQL" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5.5" rx="9" ry="3.5" fill="#0EA5E9" opacity="0.18" stroke="#0EA5E9" strokeWidth="1.5" />
      <path d="M3 5.5v13c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-13" fill="none" stroke="#0EA5E9" strokeWidth="1.5" />
      <path d="M3 12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5" fill="none" stroke="#0EA5E9" strokeWidth="1.3" opacity="0.5" />
    </svg>
  );
}

/** Excel — green E */
export function ExcelLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Microsoft Excel" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#217346" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="#185C37" strokeWidth="1" />
      <path d="M5 7.5l4.5 9M14 7.5l-4.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="8.5" x2="19" y2="8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="15.5" x2="19" y2="15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Zebra BI — stylised Z */
export function ZebraBILogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Zebra BI" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#1A1A2E" />
      <path d="M6 7h12L6 17h12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** AWS — orange "aws" smile */
export function AWSLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Amazon Web Services" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="13" fontSize="8.5" fontWeight="900" fill="#FF9900"
        fontFamily="Arial, sans-serif" letterSpacing="0.5">AWS</text>
      <path d="M3 17c4.5 3.5 13.5 3.5 18 0" fill="none" stroke="#FF9900"
        strokeWidth="2" strokeLinecap="round" />
      <path d="M19 15.5l2 1.5-1.5 1" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** OneLake — blue lake/droplet */
export function OneLakeLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="OneLake" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C12 3 5 10 5 15a7 7 0 0 0 14 0c0-5-7-12-7-12z" fill="#0078D4" opacity="0.85" />
      <path d="M9 16a3 3 0 0 0 3 2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Power Query M — purple funnel */
export function PowerQueryLogo({ size = 24, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      role="img" aria-label="Power Query" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16l-6 8v7l-4-2v-5L4 4z" fill="#742774" opacity="0.85" />
    </svg>
  );
}

// ── Master logo map ───────────────────────────────────────────────────────────

export const TECH_LOGO_MAP: Record<string, (props: LogoProps) => React.ReactElement> = {
  // Microsoft family
  "Microsoft":           MicrosoftLogo,
  "Microsoft Fabric":    FabricLogo,
  "Azure":               AzureLogo,
  "Azure SQL":           AzureLogo,
  "Azure Data Factory":  AzureLogo,
  "Azure Synapse":       AzureLogo,
  "Azure ML":            AzureLogo,
  "ADLS Gen2":           AzureLogo,
  "Power BI":            PowerBILogo,
  "DAX":                 PowerBILogo,
  "Zebra BI":            ZebraBILogo,
  "Excel":               ExcelLogo,
  "Power Query (M)":     PowerQueryLogo,
  "Power Automate":      MicrosoftLogo,
  "OneLake":             OneLakeLogo,
  // Data platforms
  "Databricks":          DatabricksLogo,
  "Snowflake":           SnowflakeLogo,
  "Delta Lake":          DeltaLakeLogo,
  "dbt":                 DbtLogo,
  "SQLMesh":             SQLMeshLogo,
  // Prog / SQL
  "Python":              PythonLogo,
  "PySpark":             SparkLogo,
  "SQL":                 SQLLogo,
  "KQL":                 KQLLogo,
  // BI / viz
  "Tableau":             TableauLogo,
  "Grafana":             GrafanaLogo,
  "Looker":              LookerLogo,
  // Cloud
  "AWS":                 AWSLogo,
  // Other
  "GitHub":              GithubLogoSI,
  "Git / GitHub":        GithubLogoSI,
  "Apache Spark":        SparkLogo,
  "Scikit-learn":        ScikitLearnLogo,
  "Jupyter":             JupyterLogo,
  "Pandas":              PandasLogo,
  "NumPy":               NumpyLogo,
  "Docker":              DockerLogo,
  "Kubernetes":          K8sLogo,
  "Airflow":             AirflowLogo,
  "Kafka":               KafkaLogo,
  "BigQuery":            BigQueryLogo,
  "Terraform":           TerraformLogo,
};

export function getTechLogo(name: string): ((props: LogoProps) => React.ReactElement) | null {
  return TECH_LOGO_MAP[name] ?? null;
}

// ── Marquee logo list (ordered by visual importance) ─────────────────────────

export const MARQUEE_LOGOS: Array<{ name: string; Logo: (p: LogoProps) => React.ReactElement }> = [
  { name: "Microsoft Fabric",   Logo: FabricLogo     },
  { name: "Databricks",         Logo: DatabricksLogo },
  { name: "Snowflake",          Logo: SnowflakeLogo  },
  { name: "Power BI",           Logo: PowerBILogo    },
  { name: "Azure",              Logo: AzureLogo      },
  { name: "Python",             Logo: PythonLogo     },
  { name: "Apache Spark",       Logo: SparkLogo      },
  { name: "dbt",                Logo: DbtLogo        },
  { name: "SQL",                Logo: SQLLogo        },
  { name: "Delta Lake",         Logo: DeltaLakeLogo  },
  { name: "SQLMesh",            Logo: SQLMeshLogo    },
  { name: "Tableau",            Logo: TableauLogo    },
  { name: "Grafana",            Logo: GrafanaLogo    },
  { name: "Looker",             Logo: LookerLogo     },
  { name: "Microsoft",          Logo: MicrosoftLogo  },
  { name: "KQL",                Logo: KQLLogo        },
  { name: "Zebra BI",           Logo: ZebraBILogo    },
  { name: "OneLake",            Logo: OneLakeLogo    },
];
