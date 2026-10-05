/* Columns are platforms, rows are the questions asked of each. "Typical
   pairing" is drawn from how each platform is combined in the case studies. */
const platforms = ["Microsoft Fabric", "Databricks", "Snowflake"] as const;
type Platform = (typeof platforms)[number];

const taglines: Record<Platform, string> = {
  "Microsoft Fabric": "All-in-one lakehouse on OneLake",
  Databricks: "Unified analytics for ML-heavy pipelines",
  Snowflake: "Cloud-agnostic SQL analytics warehouse",
};

const rows: { q: string; cells: Record<Platform, string | string[]> }[] = [
  {
    q: "Best for",
    cells: {
      "Microsoft Fabric": "Microsoft-first organisations",
      Databricks: "ML at scale",
      Snowflake: "Multi-cloud SQL",
    },
  },
  {
    q: "Reach for it when",
    cells: {
      "Microsoft Fabric": [
        "The client is Microsoft-first (Azure, M365, Teams)",
        "Power BI is the primary BI tool",
        "One governed data platform is needed for all workloads",
        "Budget is allocated to Microsoft E5 or Fabric capacity",
      ],
      Databricks: [
        "ML and feature engineering are first-class requirements",
        "PySpark workloads run at significant scale",
        "MLflow experiment tracking and a model registry are needed",
        "Unity Catalog governance spans multiple clouds",
      ],
      Snowflake: [
        "There is a multi-cloud requirement (AWS, Azure, GCP)",
        "The team is SQL-first with no PySpark investment",
        "dbt is the primary transformation layer",
        "Data is shared with external partners or vendors",
      ],
    },
  },
  {
    q: "Avoid when",
    cells: {
      "Microsoft Fabric": [
        "Heavy Python/Spark ML workflows need MLflow parity",
        "There is a multi-cloud or non-Azure storage mandate",
      ],
      Databricks: [
        "Power BI is the reporting layer (import mode limits apply)",
        "There are no ML requirements and budget is tight",
      ],
      Snowflake: [
        "Fabric is already licensed (OneLake overlap)",
        "Real-time streaming is a core requirement",
      ],
    },
  },
  {
    q: "Typical pairing",
    cells: {
      "Microsoft Fabric": "OneLake, Delta Lake and SQLMesh, with Power BI semantic models",
      Databricks: "Delta Live Tables and MLflow, with Power BI composite models",
      Snowflake: "dbt or SQL pipelines, with Power BI datasets",
    },
  },
];

export function PlatformJudgment() {
  return (
    <section id="platforms" className="section" aria-labelledby="platforms-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="label">Architecture judgment</p>
          <h2 id="platforms-title" className="section-title">How I choose an analytics platform</h2>
          <p className="lead">
            Fabric, Databricks and Snowflake each win under different constraints. This is how I
            decide between them.
          </p>
        </header>

        <div className="reveal">
          <table className="compare">
            <caption className="sr-only">Platform comparison: Microsoft Fabric, Databricks and Snowflake</caption>
            <thead>
              <tr>
                <td aria-hidden />
                {platforms.map((p) => (
                  <th key={p} scope="col" translate="no">
                    {p}
                    <span className="small">{taglines[p]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.q}>
                  <th scope="row" className="label">{row.q}</th>
                  {platforms.map((p) => {
                    const v = row.cells[p];
                    return (
                      <td key={p} data-platform={p}>
                        {Array.isArray(v) ? (
                          <ul>{v.map((x) => <li key={x}>{x}</li>)}</ul>
                        ) : (
                          v
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="verdict">
            <span className="label">My default</span>
            <p>
              Choose the simplest architecture that satisfies scale, governance, cost and business
              requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
