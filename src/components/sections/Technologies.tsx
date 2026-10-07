import { Mark } from "@/components/common/Mark";

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
        <header className="sx-head is-center reveal">
          <p className="sx-eyebrow">My skills</p>
          <h2 id="skills-title" className="sx-title">
            Technologies<span className="sx-dot">.</span>
          </h2>
        </header>
        <ul className="sx-chips reveal" aria-label="Technologies">
          {tech.map((t) => (
            <li key={t} className="sx-chip" translate="no">
              <Mark name={t} size={16} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
