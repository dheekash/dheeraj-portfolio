/* The method, as a sequence. Each step names where it shows up in the
   case studies, so the process is backed by work rather than asserted. */
const steps = [
  {
    title: "Understand",
    what: "Business problem, KPI definitions, stakeholder alignment",
    evidence: "18 requirements workshops at DataStream; conflicting plant and finance KPIs resolved at Rockwool",
  },
  {
    title: "Model",
    what: "Source systems, dimensional model, semantic layer",
    evidence: "Star schemas and governed semantic models with row-level security",
  },
  {
    title: "Build",
    what: "Pipelines, lakehouse, DAX, Power BI",
    evidence: "Medallion lakehouses on Fabric and Databricks; 200+ tested SQLMesh models",
  },
  {
    title: "Optimise",
    what: "Performance, governance, refresh, cost",
    evidence: "Report refresh from 4 hours to 15 minutes; compute cost down 15%",
  },
  {
    title: "Measure",
    what: "Adoption, business impact, iteration",
    evidence: "Seller leadership moved to self-serve weekly reviews; manual reporting down 70%",
  },
];

export function HowIBuild() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="approach-title" className="section-title">How I build analytics systems</h2>
          <p className="lead">Five steps, in order, on every engagement.</p>
        </header>

        <ol className="steps reveal">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-what">{s.what}</p>
              <p className="step-evidence small">{s.evidence}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
