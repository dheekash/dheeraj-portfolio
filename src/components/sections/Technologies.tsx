import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Mark } from "@/components/common/Mark";
import { caseStudies } from "@/data/work";

/* The toolset as the layers of a data platform, in the order data moves
   through them, plus the ML tooling alongside. Every item is from the
   skills list and case studies. */
const layers = [
  { tag: "Ingest", line: "Moving data in from source systems, in batches and streams.", items: ["Azure Data Factory", "Apache Kafka"] },
  { tag: "Store", line: "Landing data in lakehouses and warehouses built to scale.", items: ["Microsoft Fabric", "Snowflake", "Databricks", "Delta Lake", "Azure"] },
  { tag: "Transform", line: "Cleaning and shaping raw data into tested models.", items: ["SQL", "dbt", "SQLMesh", "PySpark", "Python"] },
  { tag: "Model", line: "Semantic models and DAX measures that define the numbers.", items: ["DAX", "Power Query"] },
  { tag: "Visualise", line: "Reports and dashboards that answer the question asked.", items: ["Power BI", "Excel"] },
  { tag: "ML & tooling", line: "Training, tracking and versioning the models behind predictions.", items: ["MLflow", "scikit-learn", "Git"] },
];

/* Each card links to a case study that used its tools: the one sharing the
   most of them, preferring featured studies and ones no earlier card took. */
const ordered = [...caseStudies.filter((s) => s.featured), ...caseStudies.filter((s) => !s.featured)];
const used = new Set<string>();
const studyFor = (items: string[]) => {
  const want = new Set(items.map((t) => t.toLowerCase()));
  const score = (stack: string[]) => stack.filter((t) => want.has(t.toLowerCase())).length;
  const best = Math.max(...ordered.map((s) => score(s.stack)));
  const pick = ordered.find((s) => score(s.stack) === best && !used.has(s.slug)) ?? ordered.find((s) => score(s.stack) === best)!;
  used.add(pick.slug);
  return pick;
};
const cards = layers.map((l) => ({ ...l, study: studyFor(l.items) }));

/** Technologies as link cards, one per layer of the stack. */
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

        <ul className="sk reveal">
          {cards.map((c, i) => (
            <li key={c.tag} style={{ "--n": i } as React.CSSProperties}>
              <Link href={`/work/${c.study.slug}`} className="sk-card">
                <span className="sk-visual" aria-hidden>
                  {c.items.map((t) => (
                    <span key={t} className="sk-logo" title={t}><Mark name={t} size={22} /></span>
                  ))}
                </span>
                <span className="sk-tag">{c.tag}</span>
                <h3 className="sk-title">{c.line}</h3>
                <p className="sk-tools" translate="no">{c.items.join(" · ")}</p>
                <span className="sk-foot">
                  <span className="sk-see">
                    See it in <span translate="no">{c.study.title.replace(/, (Amazon|Rockwool)$/, "")}</span>
                  </span>
                  <span className="sk-arrow" aria-hidden><ArrowRight size={16} /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
