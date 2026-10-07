import { Mark } from "@/components/common/Mark";
import { DataParticles } from "@/components/common/DataParticles";

/* The working toolset as chips, each with its mark where one exists.
   Every item is from the skills list and case studies. Core tools first. */
const tech = [
  "Power BI", "Microsoft Fabric", "SQL", "DAX", "Power Query", "Azure", "Azure Data Factory",
  "Snowflake", "Databricks", "Python", "PySpark", "dbt", "SQLMesh", "Delta Lake",
  "Apache Kafka", "MLflow", "scikit-learn", "Git", "Excel",
];

export function Technologies() {
  return (
    <section id="skills" className="section sx" aria-labelledby="skills-title">
      <div className="container">
        <div className="tech-panel reveal">
          <div className="tech-visual">
            <p className="tech-tag" aria-hidden>Tools / Platforms</p>
            <DataParticles word="DATA" />
            <p className="tech-caption" aria-hidden>Move your pointer through the word</p>
          </div>
          <div className="tech-body">
            <p className="sx-eyebrow">My skills</p>
            <h2 id="skills-title" className="sx-title">
              Technologies<span className="sx-dot">.</span>
            </h2>
            <p className="sx-intro">
              The toolset behind every build, from ingestion and lakehouse engineering to semantic
              models and the reports executives read.
            </p>
            <ul className="sx-chips tech-chips" aria-label="Technologies">
              {tech.map((t) => (
                <li key={t} className="sx-chip" translate="no">
                  <Mark name={t} size={16} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
