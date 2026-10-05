import Link from "next/link";
import { getStudy } from "@/data/work";

/* Four capability areas. Each lists what I do (not just tool names) and
   links to the case studies where it was applied, so depth is shown by
   evidence. Every item is from the existing skills list or case studies. */
const groups: { title: string; summary: string; items: { name: string; core?: boolean }[]; applied: string[] }[] = [
  {
    title: "BI & semantic modelling",
    summary: "Governed Power BI models that stay fast and trusted under enterprise use.",
    items: [
      { name: "Power BI", core: true },
      { name: "DAX", core: true },
      { name: "Semantic models", core: true },
      { name: "Star schema" },
      { name: "Row-level security" },
      { name: "Direct Lake" },
      { name: "Incremental refresh" },
      { name: "Composite models" },
      { name: "Power Query" },
    ],
    applied: ["seller-analytics-platform", "manufacturing-analytics-suite"],
  },
  {
    title: "Data engineering",
    summary: "Lakehouse pipelines with quality checks built into every layer.",
    items: [
      { name: "Microsoft Fabric", core: true },
      { name: "Medallion architecture", core: true },
      { name: "SQL", core: true },
      { name: "OneLake & Delta Lake" },
      { name: "SQLMesh" },
      { name: "dbt" },
      { name: "Azure Data Factory" },
      { name: "PySpark" },
      { name: "Python" },
    ],
    applied: ["fabric-lakehouse-migration", "sales-intelligence-platform"],
  },
  {
    title: "Cloud & data platforms",
    summary: "Chosen per project, using the decision guide above.",
    items: [
      { name: "Azure", core: true },
      { name: "Snowflake" },
      { name: "Databricks" },
      { name: "ADLS Gen2" },
      { name: "Kafka & Event Hubs" },
      { name: "Azure DevOps & CI/CD" },
      { name: "Git" },
    ],
    applied: ["real-time-fraud-monitoring", "customer-churn-platform"],
  },
  {
    title: "Analytics & delivery",
    summary: "From requirements workshop to a report leadership uses every week.",
    items: [
      { name: "KPI definition", core: true },
      { name: "Executive reporting", core: true },
      { name: "Requirements workshops" },
      { name: "Stakeholder management" },
      { name: "Forecasting (XGBoost)" },
      { name: "Churn & anomaly models" },
      { name: "Team leadership" },
    ],
    applied: ["manufacturing-analytics-suite", "seller-analytics-platform"],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="expertise-title" className="section-title">Expertise</h2>
          <p className="lead">
            From raw ingestion to governed semantic models to the reports executives read.
          </p>
        </header>

        <div className="capabilities">
          {groups.map((g, gi) => (
            <section key={g.title} className="card capability reveal" aria-labelledby={`cap-${gi}`}>
              <h3 id={`cap-${gi}`} className="title-3" style={{ fontSize: "1.1875rem" }}>{g.title}</h3>
              <p className="small">{g.summary}</p>
              <ul>
                {g.items.map((i) => (
                  <li key={i.name} className={i.core ? "is-core" : undefined} translate="no">
                    {i.name}
                  </li>
                ))}
              </ul>
              <p className="applied small">
                <span className="label">Applied in</span>{" "}
                {g.applied.map((slug, k) => {
                  const s = getStudy(slug);
                  if (!s) return null;
                  return (
                    <span key={slug}>
                      {k > 0 && ", "}
                      <Link href={`/work/${slug}`}>{s.title.replace(/, (Amazon|Rockwool)$/, "")}</Link>
                    </span>
                  );
                })}
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
