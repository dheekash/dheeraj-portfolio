import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/work";
import { Mark } from "@/components/common/Mark";
import { Scribble } from "@/components/common/Scribble";

/* Lead technology for each cover. No screenshots exist yet, so each cover
   shows the project's real headline result rather than a mock image. */
const leadOf: Record<string, string> = {
  "fabric-lakehouse-migration": "Microsoft Fabric",
  "seller-analytics-platform": "Power BI",
  "manufacturing-analytics-suite": "Power BI",
  "real-time-fraud-monitoring": "Databricks",
  "sales-intelligence-platform": "Databricks",
  "customer-churn-platform": "Snowflake",
};

/**
 * Selected projects as an editorial grid: wide / narrow, then narrow / wide.
 * The remaining case studies are linked underneath.
 */
export function Projects() {
  const shown = caseStudies.filter((s) => s.featured).slice(0, 4);
  const others = caseStudies.filter((s) => !shown.includes(s));

  return (
    <section id="work" className="section sx" aria-labelledby="work-title">
      <div className="container">
        <header className="pt-heading sx-head-row reveal">
          <div>
            <p className="sx-eyebrow">Featured work</p>
            <h2 id="work-title" className="sx-title">
              Selected <Scribble>projects</Scribble>
              <span className="sx-dot">.</span>
            </h2>
          </div>
          <p className="sx-intro pt-intro">
            Enterprise builds across Power BI, Microsoft Fabric, Snowflake and Databricks. Each one
            starts with a business problem and ends with a measured result.
          </p>
        </header>

        <div className="pg">
          {shown.map((s, i) => {
            const m = s.impact[0];
            return (
              <article key={s.slug} className={`pg-card reveal${i === 0 || i === 3 ? " is-wide" : ""}`}>
                <Link href={`/work/${s.slug}`} className="pg-link" aria-labelledby={`pg-${s.slug}`}>
                  <div className="pg-cover" aria-hidden>
                    <span className="pg-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sx-cover-mark pg-mark">
                      <Mark name={leadOf[s.slug]} size={26} />
                    </span>
                    <span className="pg-value">{m.value}</span>
                    <span className="pg-label">{m.label}</span>
                  </div>
                  <div className="pg-body">
                    <p className="pg-sub">
                      <span>{s.domain}</span>
                      <span>{s.type}</span>
                    </p>
                    <h3 id={`pg-${s.slug}`} className="pg-title">
                      {s.title}
                      <ArrowUpRight size={20} aria-hidden className="pg-arrow" />
                    </h3>
                    <p className="pg-text">{s.summary}</p>
                    <p className="sx-tags">
                      {s.stack.slice(0, 3).map((t) => (
                        <span key={t} translate="no">#{t.toLowerCase().replace(/[^a-z0-9]+/g, "")}</span>
                      ))}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {others.length > 0 && (
          <div className="sx-more reveal">
            <p>More case studies</p>
            {others.map((s) => (
              <Link key={s.slug} href={`/work/${s.slug}`} className="btn btn-secondary btn-sm">
                {s.title.replace(/, (Amazon|Rockwool)$/, "")} <ArrowRight size={14} aria-hidden />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
