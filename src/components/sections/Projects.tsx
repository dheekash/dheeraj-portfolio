import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies, impactTone } from "@/data/work";
import { Mark } from "@/components/common/Mark";

/* Cover for each card: the project's lead technology and headline result.
   No screenshots exist yet, so the cover shows real figures rather than a
   stock or mock dashboard image. */
const leadOf: Record<string, string> = {
  "fabric-lakehouse-migration": "Microsoft Fabric",
  "seller-analytics-platform": "Power BI",
  "manufacturing-analytics-suite": "Power BI",
  "real-time-fraud-monitoring": "Databricks",
  "sales-intelligence-platform": "Databricks",
  "customer-churn-platform": "Snowflake",
};

export function Projects() {
  const shown = caseStudies.filter((s) => s.featured).slice(0, 3);
  const others = caseStudies.filter((s) => !shown.includes(s));

  return (
    <section id="work" className="section sx" aria-labelledby="work-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">My work</p>
          <h2 id="work-title" className="sx-title">
            Projects<span className="sx-dot">.</span>
          </h2>
          <p className="sx-intro">
            Enterprise builds across Power BI, Microsoft Fabric, Snowflake and Databricks. Each one
            starts with a business problem and ends with a measured result.
          </p>
        </header>

        <div className="sx-projects">
          {shown.map((s, i) => {
            const m = s.impact[0];
            return (
              <article key={s.slug} className="sx-project card card-interactive reveal" data-cover={i} aria-labelledby={`p-${s.slug}`}>
                <div className="sx-cover" aria-hidden>
                  <span className="sx-cover-mark">
                    <Mark name={leadOf[s.slug]} size={28} />
                  </span>
                  <span className={`sx-cover-value tone-${impactTone(m.value)}`}>{m.value}</span>
                  <span className="sx-cover-label">{m.label}</span>
                </div>
                <div className="sx-project-body">
                  <h3 id={`p-${s.slug}`} className="sx-project-title">
                    <Link href={`/work/${s.slug}`} className="work-title-link">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="sx-project-text">{s.summary}</p>
                  <p className="sx-tags">
                    {s.stack.slice(0, 4).map((t) => (
                      <span key={t} translate="no">#{t.toLowerCase().replace(/[^a-z0-9]+/g, "")}</span>
                    ))}
                  </p>
                  <span className="link-arrow sx-project-cta" aria-hidden>
                    Read the case study <ArrowRight size={16} className="arrow" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {others.length > 0 && (
          <p className="sx-more reveal">
            More case studies:{" "}
            {others.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && " · "}
                <Link href={`/work/${s.slug}`} className="inline-link">{s.title.replace(/, (Amazon|Rockwool)$/, "")}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
