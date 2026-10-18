import Link from "next/link";
import { roles } from "@/data/roles";
import { ArrowRight, Briefcase, ChartColumnBig, Database, Headset, ShieldCheck, type LucideIcon } from "lucide-react";



/* Shown in the chevron: years only; the full months sit in the details. */
const yearOf = (d: string) => (d === "Present" ? "Now" : d.slice(-4));
const iconOf: Record<string, LucideIcon> = {
  "Frontizo Business Services": Headset,
  Amazon: ShieldCheck,
  "Amplify Analytix": Database,
  "DataStream IT Solutions": ChartColumnBig,
};

/**
 * Work experience as a horizontal timeline, earliest role on the left: one
 * chevron per role carries its years, an icon on a stem marks it, and the
 * details sit on the opposite side of the line, alternating above and
 * below. On narrow screens it becomes a vertical list with the same parts.
 */
export function Experience() {
  const chronological = [...roles].reverse();
  return (
    <section id="experience" className="section sx" aria-labelledby="experience-title">
      <div className="container">
        <header className="sx-head reveal">
          <p className="sx-eyebrow">Career</p>
          <h2 id="experience-title" className="sx-title">
            Work Experience<span className="sx-dot">.</span>
          </h2>
        </header>

        <ol className="ht" aria-label="Roles, earliest first">
          {chronological.map((r, i) => {
            const Icon = iconOf[r.company] ?? Briefcase;
            return (
              <li
                key={r.company}
                className={`ht-item ${i % 2 ? "is-down" : "is-up"}${r.current ? " is-current" : ""} reveal`}
                style={{ "--n": i } as React.CSSProperties}
              >
                <article className="ht-card" aria-labelledby={`role-${i}`}>
                  <p className="ht-company" translate="no">{r.company}</p>
                  <h3 id={`role-${i}`} className="ht-role">{r.title}</h3>
                  <p className="ht-meta">
                    {r.start} – {r.end} · {r.location}
                    {r.current && <span className="xt-current">Current role</span>}
                  </p>
                  <dl className="ht-impact">
                    {r.impact.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd>
                          <span className="ht-impact-value">{m.value}</span>{" "}
                          <span aria-hidden>{m.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {/* Highlights fold away so the whole timeline fits one screen. */}
                  <details className="xt-more">
                    <summary>Highlights</summary>
                    <ul className="rail-bullets tl-bullets">
                      {r.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    {r.caseStudy && (
                      <Link href={r.caseStudy.href} className="link-arrow tl-link">
                        Case study: {r.caseStudy.label} <ArrowRight size={16} className="arrow" aria-hidden />
                      </Link>
                    )}
                  </details>
                </article>
                <span className="ht-bar" aria-hidden>
                  {yearOf(r.start)} – {yearOf(r.end)}
                </span>
                <span className="ht-icon" aria-hidden>
                  <Icon size={24} strokeWidth={1.9} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
