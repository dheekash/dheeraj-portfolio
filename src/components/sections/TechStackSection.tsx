import {
  PythonLogo, SQLLogo, DbtLogo, SparkLogo,
  SnowflakeLogo, PowerBILogo, AzureLogo,
  DatabricksLogo, FabricLogo, PowerQueryLogo,
  MicrosoftLogo, ExcelLogo,
} from "@/components/common/TechLogos";


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
    accent: "var(--forest)",
    chipText: "#0B0E14",
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
    accent: "var(--coral)",
    chipText: "#0B0E14",
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
    accent: "var(--gold)",
    chipText: "#0B0E14",
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


/**
 * Platform decision guide as a comparison: three ruled columns, one per
 * platform, reading the same three questions down each. The earlier cards
 * gave every platform its own accent hue and a gradient header — three
 * colours and a gradient in a system that uses one colour to mean "better".
 * A decision guide is a comparison, so it is now laid out as one.
 */
export function PlatformGuideSection() {
  return (
    <section id="platforms">
      <div className="container-page section-pad">
        <div className="max-w-[60ch] mb-[clamp(2rem,3vw,3rem)]">
          <h2 className="mb-3">Platform decision guide</h2>
          <p className="text-muted-foreground text-[1.0625rem] leading-relaxed">
            How I choose between Fabric, Databricks, and Snowflake based on project constraints.
          </p>
        </div>

        <div className="platform-grid">
          {platformGuide.map((p) => (
            <section key={p.platform} className="platform-col" aria-labelledby={`pf-${p.platform}`}>
              <h3 id={`pf-${p.platform}`} className="platform-name" translate="no">{p.platform}</h3>
              <p className="platform-tagline">{p.tagline}</p>
              <p className="platform-best"><span>Best for</span> {p.bestFor}</p>

              <h4 className="platform-q">Reach for it when</h4>
              <ul className="platform-list is-reach">
                {p.reach.map((r) => <li key={r}>{r}</li>)}
              </ul>

              <h4 className="platform-q">Skip it when</h4>
              <ul className="platform-list is-skip">
                {p.skip.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Longest tenure in the data; every years bar is drawn against it. */
const MAX_YEARS = 7;
const yearsOf = (y?: string) => (y ? parseFloat(y) || 0 : 0);

/**
 * Skills as a matrix rather than chip cards. The data already carried years
 * and proficiency for every tool, but only inside a hover tooltip, so touch
 * users and almost every visitor never saw it. Each group is now a real
 * table: tool, years drawn to a shared scale, level in words. Uncoloured on
 * purpose — proficiency is not an improvement, so it does not get the gain
 * hue; weight carries the distinction instead.
 */
export function CoreExpertiseSection() {
  return (
    <section id="skills">
      <div className="container-page section-pad">
        <div className="max-w-[60ch] mb-[clamp(2rem,3vw,3rem)]">
          <h2 className="mb-3">Core expertise</h2>
          <p className="text-muted-foreground text-[1.0625rem] leading-relaxed">
            Full-stack analytics engineering. Raw data ingestion through governed semantic models to executive-facing dashboards.
          </p>
        </div>

        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {categories.map((cat) => (
            <table key={cat.title} className="skill-table">
              <caption className="skill-caption">{cat.title}</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Level</th>
                </tr>
              </thead>
              <tbody>
                {cat.tools.map((t) => {
                  const yrs = yearsOf(t.years);
                  const expert = t.level === "Expert";
                  return (
                    <tr key={t.name}>
                      <th scope="row" className={`skill-name ${expert ? "is-expert" : ""}`}>
                        <span translate="no">{t.name}</span>
                      </th>
                      <td className="skill-years">
                        <span className="skill-track" aria-hidden>
                          <span className="skill-fill" style={{ width: `${(yrs / MAX_YEARS) * 100}%` }} />
                        </span>
                        <span className="skill-years-text">{t.years}</span>
                      </td>
                      <td className={`skill-level ${expert ? "is-expert" : ""}`}>{t.level}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </section>
  );
}
