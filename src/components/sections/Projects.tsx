import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/work";
import { Mark, hasMark } from "@/components/common/Mark";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { leadOf, ratioOf } from "@/lib/results";

/**
 * Selected projects as one product-style showcase card: the coloured panel
 * shows the chosen project's result and lead technology, the thumbnails
 * switch project, and the right side carries the details and the link.
 * The remaining case studies are linked underneath.
 */
export function Projects() {
  const shown = caseStudies.filter((s) => s.featured).slice(0, 4);
  const others = caseStudies.filter((s) => !shown.includes(s));

  const covers = shown.map((s, i) => {
    const m = s.impact[0];
    const ratio = ratioOf(m.value);
    return (
      <>
        <span className="pc-num">{String(i + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}</span>
        <span className="pc-logo"><Mark name={leadOf[s.slug]} size={44} /></span>
        <span className="pc-value">{m.value}</span>
        <span className="pc-label">{m.label}</span>
        {ratio !== null && (
          <span className="pg-bars pc-bars" style={{ "--r": Math.max(ratio, 0.02) } as React.CSSProperties}>
            <span className="pg-bar"><span>Before</span></span>
            <span className="pg-bar is-after"><span>After</span></span>
          </span>
        )}
      </>
    );
  });

  const thumbs = shown.map((s, i) => (
    <>
      <span className="pc-thumb-logo"><Mark name={leadOf[s.slug]} size={22} /></span>
      <span className="pc-thumb-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
    </>
  ));

  const infos = shown.map((s) => {
    const rest = s.impact.slice(1);
    return (
      <>
        <div className="pc-title">
          <h3>{s.title}</h3>
          <p>{s.domain} · {s.type}</p>
        </div>
        <dl className="pc-story">
          <div><dt>Problem</dt><dd>{s.problem}</dd></div>
          <div><dt>Solution</dt><dd>{s.action}</dd></div>
        </dl>
        <div className="pc-block">
          <h4>Stack</h4>
          <ul className="pc-stack">
            {s.stack.slice(0, 4).map((t) => (
              <li key={t} translate="no">
                {hasMark(t) && <span className="pc-stack-ico"><Mark name={t} size={18} /></span>}
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="pc-block">
          <h4>Impact</h4>
          <ul className="pc-results">
            {rest.map((r) => (
              <li key={r.label}><strong>{r.value}</strong> {r.label}</li>
            ))}
          </ul>
        </div>
        <Link href={`/work/${s.slug}`} className="btn btn-primary pc-btn">
          Read case study <ArrowRight size={16} aria-hidden />
        </Link>
      </>
    );
  });

  return (
    <section id="work" className="section sx" aria-labelledby="work-title">
      <div className="container">
        <header className="pt-heading sx-head-row reveal">
          <div>
            <p className="sx-eyebrow">Featured work</p>
            <h2 id="work-title" className="sx-title">
              Selected projects
              <span className="sx-dot">.</span>
            </h2>
          </div>
          <p className="sx-intro pt-intro">
            Enterprise builds across Power BI, Microsoft Fabric, Snowflake and Databricks. Each one
            starts with a business problem and ends with a measured result.
          </p>
        </header>

        <div className="reveal">
          <ProjectShowcase covers={covers} thumbs={thumbs} infos={infos} labels={shown.map((s) => s.title)} />
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
