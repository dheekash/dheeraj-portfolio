import { ArrowRight } from "lucide-react";
import { Mark } from "@/components/common/Mark";

/* The toolset as the layers of a data platform, in the order data moves
   through them. Every item is from the skills list and case studies. */
const layers = [
  { title: "Ingest", note: "Move data in", items: ["Azure Data Factory", "Apache Kafka"] },
  { title: "Store", note: "Land and keep it", items: ["Microsoft Fabric", "Snowflake", "Databricks", "Delta Lake", "Azure"] },
  { title: "Transform", note: "Clean and shape it", items: ["SQL", "dbt", "SQLMesh", "PySpark", "Python"] },
  { title: "Model", note: "Define the measures", items: ["DAX", "Power Query"] },
  { title: "Visualise", note: "Show the answer", items: ["Power BI", "Excel"] },
];
const alongside = ["MLflow", "scikit-learn", "Git"];

/** Technologies as a data stack: five layers left to right, ML and tooling beneath. */
export function Technologies() {
  return (
    <section id="skills" className="section sx" aria-labelledby="skills-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">My skills</p>
          <h2 id="skills-title" className="sx-title">
            Technologies<span className="sx-dot">.</span>
          </h2>
        </header>

        <ol className="stk reveal" aria-label="Tools by layer, in the order data flows">
          {layers.map((l, i) => (
            <li key={l.title} className="stk-layer" style={{ "--n": i } as React.CSSProperties}>
              <h3 className="stk-title">
                <span className="stk-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                {l.title}
              </h3>
              <p className="stk-note">{l.note}</p>
              <ul className="stk-tools">
                {l.items.map((t) => (
                  <li key={t} translate="no">
                    <span className="stk-ico"><Mark name={t} size={20} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              {i < layers.length - 1 && (
                <span className="stk-arrow" aria-hidden><ArrowRight size={14} strokeWidth={2.4} /></span>
              )}
            </li>
          ))}
        </ol>

        <div className="stk-side reveal">
          <h3 className="stk-side-title">ML &amp; tooling</h3>
          <ul className="stk-tools is-row">
            {alongside.map((t) => (
              <li key={t} translate="no">
                <span className="stk-ico"><Mark name={t} size={20} /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
