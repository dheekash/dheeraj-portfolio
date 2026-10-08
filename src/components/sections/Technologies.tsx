import { MousePointer2 } from "lucide-react";
import { Mark } from "@/components/common/Mark";
import { DataParticles } from "@/components/common/DataParticles";

/* The toolset, grouped by what it does. Every item is from the skills list
   and case studies. */
const groups = [
  { title: "BI & semantic models", items: ["Power BI", "DAX", "Power Query", "Excel"] },
  { title: "Data platforms", items: ["Microsoft Fabric", "Azure", "Snowflake", "Databricks", "Delta Lake"] },
  { title: "Engineering & pipelines", items: ["SQL", "Azure Data Factory", "dbt", "SQLMesh", "Apache Kafka"] },
  { title: "Languages, ML & tooling", items: ["Python", "PySpark", "MLflow", "scikit-learn", "Git"] },
];

/** Bento: the DATA graphic and the grouped toolset share one panel. */
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

        <div className="bento reveal">
          <div className="tech-visual bento-visual">
            <p className="tech-tag" aria-hidden>Tools and platforms</p>
            <DataParticles word="DATA" />
            <p className="tech-caption" aria-hidden>
              <MousePointer2 size={14} /> Move your pointer through the word
            </p>
          </div>
          <div className="bento-groups">
            {groups.map((g) => (
              <section key={g.title} className="bento-group" aria-labelledby={`tg-${g.title}`}>
                <h3 id={`tg-${g.title}`} className="bento-title">{g.title}</h3>
                <ul className="bento-list">
                  {g.items.map((t) => (
                    <li key={t} className="sx-chip" translate="no">
                      <Mark name={t} size={20} />
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
