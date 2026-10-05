/* Capability groups. Every item is from the existing skills list; the
   self-rated years and levels are dropped because a bar next to a tool
   name says little a recruiter can check. Core tools are outlined in ink. */
const groups: { title: string; summary: string; items: { name: string; core?: boolean }[] }[] = [
  {
    title: "Power BI & semantic modelling",
    summary: "Governed models and reports that hold up under real enterprise use.",
    items: [
      { name: "Power BI", core: true },
      { name: "DAX", core: true },
      { name: "Semantic modelling", core: true },
      { name: "Star schema" },
      { name: "Power Query" },
      { name: "Row-level security" },
      { name: "Direct Lake" },
      { name: "Incremental refresh" },
    ],
  },
  {
    title: "Microsoft Fabric & lakehouse",
    summary: "One governed platform from ingestion to the semantic layer.",
    items: [
      { name: "Microsoft Fabric", core: true },
      { name: "Medallion architecture", core: true },
      { name: "OneLake" },
      { name: "Delta Lake" },
      { name: "SQLMesh" },
      { name: "Lakehouse pipelines" },
    ],
  },
  {
    title: "Data engineering",
    summary: "Pipelines and models with quality checks built in.",
    items: [
      { name: "SQL", core: true },
      { name: "Python" },
      { name: "PySpark" },
      { name: "dbt" },
      { name: "Azure Data Factory" },
      { name: "Data modelling" },
      { name: "Pipeline monitoring" },
    ],
  },
  {
    title: "Cloud & platforms",
    summary: "Chosen per project, not by habit.",
    items: [
      { name: "Azure", core: true },
      { name: "Snowflake" },
      { name: "Databricks" },
      { name: "ADLS Gen2" },
      { name: "Azure DevOps" },
      { name: "CI/CD" },
      { name: "Git" },
    ],
  },
  {
    title: "Business analytics & delivery",
    summary: "Turning requirements into analytics products people use.",
    items: [
      { name: "Stakeholder management", core: true },
      { name: "Requirements workshops" },
      { name: "Executive reporting" },
      { name: "Client presentations" },
      { name: "Team leadership" },
      { name: "Agile / Scrum" },
      { name: "Power Automate" },
    ],
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
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
