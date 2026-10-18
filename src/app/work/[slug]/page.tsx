import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { caseStudies, getStudy, type CaseStudy } from "@/data/work";
import { ArchitectureDiagram, WorkImage } from "@/components/work/ArchitectureFlow";
import { Mark, hasMark } from "@/components/common/Mark";
import { leadOf, ratioOf } from "@/lib/results";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStudy(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: `${s.summary} ${s.outcome}`.slice(0, 300),
    alternates: { canonical: `/work/${s.slug}` },
  };
}

/* The story sections, in reading order. Each one is built only from the
   study's own fields; a section with no material is left out. */
const storyOf = (s: CaseStudy) =>
  [
    { id: "challenge", title: "The challenge" },
    { id: "architecture", title: "Architecture" },
    { id: "built", title: "What I built" },
    { id: "technology", title: "Technology" },
    { id: "outcome", title: "Outcome" },
    s.learnings?.length ? { id: "learnings", title: "Key learnings" } : null,
  ].filter((x): x is { id: string; title: string } => x !== null);

/** The headline result as a big figure, with before/after bars when it has both ends. */
function Headline({ value, label }: { value: string; label: string }) {
  const r = ratioOf(value);
  return (
    <div className="cs2-headline">
      <span className="cs2-headline-value">{value}</span>
      <span className="cs2-headline-label">{label}</span>
      {r !== null && (
        <span className="pg-bars cs2-bars" style={{ "--r": Math.max(r, 0.02) } as React.CSSProperties} aria-hidden>
          <span className="pg-bar"><span>Before</span></span>
          <span className="pg-bar is-after"><span>After</span></span>
        </span>
      )}
    </div>
  );
}

/** Previous / next project card. */
function ProjectLink({ study, dir }: { study: CaseStudy; dir: "prev" | "next" }) {
  return (
    <Link href={`/work/${study.slug}`} className={`cs2-pn is-${dir}`}>
      <span className="cs2-pn-dir">
        {dir === "prev" ? <ArrowLeft size={16} aria-hidden /> : null}
        {dir === "prev" ? "Previous project" : "Next project"}
        {dir === "next" ? <ArrowRight size={16} aria-hidden /> : null}
      </span>
      <span className="cs2-pn-body">
        <span className="cs2-pn-mark"><Mark name={leadOf[study.slug]} size={24} /></span>
        <span>
          <span className="cs2-pn-title">{study.title}</span>
          <span className="cs2-pn-meta">{study.impact[0].value} {study.impact[0].label.toLowerCase()}</span>
        </span>
      </span>
    </Link>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStudy(slug);
  if (!s) notFound();

  const story = storyOf(s);
  const i = caseStudies.findIndex((c) => c.slug === s.slug);
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const [headline, ...rest] = s.impact;

  /* Search engines: the page as an article by Dheeraj, and its place in the site. */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: s.title,
      description: s.summary,
      about: s.stack,
      author: { "@type": "Person", name: "Dheeraj Kashyap", url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/work/${s.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: s.title, item: `${SITE_URL}/work/${s.slug}` },
      ],
    },
  ];

  return (
    <article className="cs2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Overview: who it was for and what it was, beside the facts */}
      <header className="cs2-hero">
        <div className="container cs2-hero-grid">
          <div className="cs2-intro">
            <Link href="/#work" className="link-arrow cs-back">
              <ArrowLeft size={16} aria-hidden /> All projects
            </Link>
            <p className="label">{s.domain} · {s.type}</p>
            <h1 className="display-1">{s.title}</h1>
            <p className="cs2-lead">{s.summary}</p>
          </div>

          <aside className="cs2-facts" aria-label="Project facts">
            <span className="cs2-facts-mark"><Mark name={leadOf[s.slug]} size={30} /></span>
            <dl>
              {s.role && <div><dt>Role</dt><dd>{s.role}</dd></div>}
              <div><dt>Focus</dt><dd>{s.contribution.join(" · ")}</dd></div>
              <div><dt>Scope</dt><dd>{s.scope.join(" · ")}</dd></div>
              <div>
                <dt>Stack</dt>
                <dd>
                  <ul className="cs2-chips">
                    {s.stack.map((t) => (
                      <li key={t} translate="no">
                        {hasMark(t) && <span className="cs2-chip-ico"><Mark name={t} size={16} /></span>}
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Results: the headline gets the before/after bars, the rest sit beside it */}
        <div className="container">
          <dl className="cs2-results" aria-label="Results">
            <div className="cs2-result is-lead">
              <dt className="sr-only">{headline.label}</dt>
              <dd><Headline value={headline.value} label={headline.label} /></dd>
            </div>
            {rest.map((m) => (
              <div key={m.label} className="cs2-result">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="cs2-result-value">{m.value}</span>
                  <span className="cs2-result-label">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container cs2-body">
        <nav className="cs2-toc" aria-label="On this page">
          <span className="label">On this page</span>
          <ol>
            {story.map((b) => (
              <li key={b.id}><a href={`#${b.id}`}>{b.title}</a></li>
            ))}
          </ol>
        </nav>

        <div className="cs2-story">
          <section id="challenge" className="cs2-section reveal" aria-labelledby="h-challenge">
            <h2 id="h-challenge">The challenge</h2>
            <p className="cs2-big">{s.challenge}</p>
          </section>

          <section id="architecture" className="cs2-section reveal" aria-labelledby="h-architecture">
            <h2 id="h-architecture">Architecture</h2>
            <div className="cs2-arch">
              <ArchitectureDiagram study={s} />
              {s.image && <div className="cs2-image"><WorkImage study={s} /></div>}
            </div>
          </section>

          <section id="built" className="cs2-section reveal" aria-labelledby="h-built">
            <h2 id="h-built">What I built</h2>
            <p>{s.built}</p>
            <ul className="cs2-points">
              {s.points.map((p) => (
                <li key={p}><span className="cs2-tick" aria-hidden><Check size={14} strokeWidth={2.6} /></span>{p}</li>
              ))}
            </ul>
          </section>

          <section id="technology" className="cs2-section reveal" aria-labelledby="h-technology">
            <h2 id="h-technology">Technology</h2>
            <ul className="cs2-stack">
              {s.stack.map((t) => (
                <li key={t} translate="no">
                  <span className="cs2-stack-ico">{hasMark(t) ? <Mark name={t} size={22} /> : <span className="cs2-stack-dot" />}</span>
                  {t}
                </li>
              ))}
            </ul>
            {s.code && (
              <details className="code-block cs2-code">
                <summary>{s.code.label}</summary>
                <pre><code>{s.code.code}</code></pre>
              </details>
            )}
          </section>

          <section id="outcome" className="cs2-section reveal" aria-labelledby="h-outcome">
            <h2 id="h-outcome">Outcome</h2>
            <blockquote className="cs2-outcome"><p>{s.outcome}</p></blockquote>
          </section>

          {s.learnings?.length ? (
            <section id="learnings" className="cs2-section reveal" aria-labelledby="h-learnings">
              <h2 id="h-learnings">Key learnings</h2>
              <ul className="cs2-points">
                {s.learnings.map((l) => (
                  <li key={l}><span className="cs2-tick" aria-hidden><Check size={14} strokeWidth={2.6} /></span>{l}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      <nav className="container cs2-prevnext" aria-label="More projects">
        <ProjectLink study={prev} dir="prev" />
        <ProjectLink study={next} dir="next" />
      </nav>
    </article>
  );
}
