import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/work";
import { ArchitectureDiagram, NodeChain, WorkImage } from "@/components/work/ArchitectureFlow";

function Impact({ study, limit }: { study: CaseStudy; limit?: number }) {
  return (
    <dl className="impact" aria-label="Impact">
      {study.impact.slice(0, limit).map((m) => (
        <div key={m.label}>
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <div className="impact-value">{m.value}</div>
            <div className="impact-label" aria-hidden>{m.label}</div>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function RoleScope({ study }: { study: CaseStudy }) {
  return (
    <dl className="role-scope">
      <div>
        <dt className="label">My role</dt>
        <dd>{study.contribution.join(" · ")}</dd>
      </div>
      <div>
        <dt className="label">Scope</dt>
        <dd>{study.scope.join(" · ")}</dd>
      </div>
    </dl>
  );
}

/**
 * Selected work. One flagship case study at full width with its
 * architecture drawn out, then three smaller cards, then the rest as a
 * list. Unequal weight on purpose: the flagship is the one to read.
 */
export function SelectedWork() {
  const featured = caseStudies.filter((s) => s.featured);
  const [flagship, ...rest] = featured;
  const more = caseStudies.filter((s) => !s.featured);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="work-title" className="section-title">Selected work</h2>
          <p className="lead">
            Business problem, architecture, engineering and a measured result, for each build.
          </p>
        </header>

        {/* ── Flagship ── */}
        <article className="card card-interactive flagship reveal" aria-labelledby={`t-${flagship.slug}`}>
          <div className="flagship-head">
            <p className="label">
              <span className="flag">Featured case study</span> {flagship.domain} · {flagship.type}
            </p>
            <h3 id={`t-${flagship.slug}`} className="flagship-title">
              <Link href={`/work/${flagship.slug}`} className="work-title-link">
                {flagship.title}
              </Link>
            </h3>
          </div>

          <div className="flagship-visual">
            {flagship.image ? <WorkImage study={flagship} /> : <ArchitectureDiagram study={flagship} />}
          </div>

          <div className="flagship-body">
            <div className="work-story">
              <p><strong>Problem.</strong> {flagship.problem}</p>
              <p><strong>Approach.</strong> {flagship.action}</p>
            </div>
            <div>
              <Impact study={flagship} />
              <RoleScope study={flagship} />
              <div className="work-cta">
                <span className="link-arrow" aria-hidden>
                  Read the case study <ArrowRight size={16} className="arrow" />
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ── More selected work ── */}
        <h3 className="label more-head reveal">More selected work</h3>
        <div className="work-grid">
          {rest.map((s) => (
            <article key={s.slug} className="card card-interactive work-small reveal" aria-labelledby={`t-${s.slug}`}>
              <p className="label">{s.domain}</p>
              <h4 id={`t-${s.slug}`} className="title-3 work-small-title">
                <Link href={`/work/${s.slug}`} className="work-title-link">
                  {s.title}
                </Link>
              </h4>
              <NodeChain study={s} />
              <p className="small work-small-problem">{s.problem}</p>
              <Impact study={s} limit={2} />
              <p className="role-line small">
                <span className="label">My role</span> {s.contribution.join(" · ")}
              </p>
              <div className="work-cta">
                <span className="link-arrow" aria-hidden>
                  Read the case study <ArrowRight size={16} className="arrow" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {more.length > 0 && (
          <div className="more-work reveal">
            <h3 className="label">Also built</h3>
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
