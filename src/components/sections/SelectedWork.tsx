import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/work";
import { WorkVisual } from "@/components/work/ArchitectureFlow";

/**
 * Selected work. Four substantial previews, each answering the same four
 * questions in the same order: problem, action, result, stack. The visual
 * column is the project's architecture (or an anonymised screenshot when
 * one exists). Remaining projects follow as a compact list.
 */
export function SelectedWork() {
  const featured = caseStudies.filter((s) => s.featured);
  const more = caseStudies.filter((s) => !s.featured);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="work-title" className="section-title">Selected work</h2>
          <p className="lead">
            Enterprise builds across Power BI, Microsoft Fabric, Snowflake and Databricks. Each one
            starts with a business problem and ends with a measured result.
          </p>
        </header>

        <div className="work-list">
          {featured.map((s) => (
            <article key={s.slug} className="card card-interactive work-card reveal" aria-labelledby={`t-${s.slug}`}>
              <div className="work-visual">
                <WorkVisual study={s} />
              </div>

              <div className="work-body">
                <p className="label">
                  {s.domain} · {s.type}
                </p>
                <h3 id={`t-${s.slug}`} className="title-3">
                  <Link href={`/work/${s.slug}`} className="work-title-link">
                    {s.title}
                  </Link>
                </h3>

                <div className="work-story">
                  <p><strong>Problem.</strong> {s.problem}</p>
                  <p><strong>Action.</strong> {s.action}</p>
                </div>

                <dl className="impact" aria-label="Impact">
                  {s.impact.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <div className="impact-value">{m.value}</div>
                        <div className="impact-label" aria-hidden>{m.label}</div>
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="stack-line">
                  <strong className="sr-only">Stack: </strong>
                  {s.stack.slice(0, 5).map((t) => (
                    <span key={t} translate="no">{t}</span>
                  ))}
                </p>

                <div className="work-cta">
                  <span className="link-arrow" aria-hidden>
                    Read the case study <ArrowRight size={16} className="arrow" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {more.length > 0 && (
          <div className="more-work reveal">
            <h3 className="label">More projects</h3>
            <ul>
              {more.map((s) => (
                <li key={s.slug}>
                  <Link href={`/work/${s.slug}`}>
                    <span className="mw-metric">
                      {s.impact[0].value} <span className="small">{s.impact[0].label.toLowerCase()}</span>
                    </span>
                    <span className="mw-title">{s.title}</span>
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
