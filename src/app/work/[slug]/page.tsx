import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, ClipboardList, Code, Cpu, FileText, Lightbulb, Network, TrendingUp,
  TriangleAlert, UserRound, type LucideIcon,
} from "lucide-react";

const sectionIcons: Record<string, LucideIcon> = {
  context: FileText,
  challenge: TriangleAlert,
  role: UserRound,
  architecture: Network,
  implementation: Code,
  technology: Cpu,
  outcome: TrendingUp,
  learnings: Lightbulb,
};
const iconFor = (id: string) => sectionIcons[id] ?? ClipboardList;
import { caseStudies, getStudy, impactTone, type CaseStudy } from "@/data/work";
import { ArchitectureDiagram, WorkImage } from "@/components/work/ArchitectureFlow";

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

type Block = { id: string; title: string; body: React.ReactNode };

/* The template is fixed; a section with no source material is skipped
   rather than filled, and the numbering follows what is shown. */
function blocks(s: CaseStudy): Block[] {
  const all: (Block | null)[] = [
    { id: "context", title: "Context", body: <p>{s.summary}</p> },
    { id: "challenge", title: "Business challenge", body: <p>{s.challenge}</p> },
    {
      id: "role",
      title: "My role",
      body: (
        <>
          <p>{s.contribution.join(", ")}.{s.role ? ` ${s.role}` : ""}</p>
          <p className="small" style={{ marginTop: 12 }}>Scope: {s.scope.join(" · ")}</p>
        </>
      ),
    },
    {
      id: "architecture",
      title: "Architecture",
      body: (
        <div className="card">
          <ArchitectureDiagram study={s} />
          {s.image && <div style={{ marginTop: 24 }}><WorkImage study={s} /></div>}
        </div>
      ),
    },
    {
      id: "implementation",
      title: "Implementation",
      body: (
        <>
          <p>{s.built}</p>
          <ul className="points">
            {s.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </>
      ),
    },
    {
      id: "technology",
      title: "Technology",
      body: (
        <>
          <p className="stack-line" style={{ marginTop: 0, fontSize: "1rem" }}>
            {s.stack.map((t) => <span key={t} translate="no">{t}</span>)}
          </p>
          {s.code && (
            <details className="code-block">
              <summary>{s.code.label}</summary>
              <pre><code>{s.code.code}</code></pre>
            </details>
          )}
        </>
      ),
    },
    { id: "outcome", title: "Outcome", body: <p className="cs-outcome">{s.outcome}</p> },
    s.learnings?.length
      ? {
          id: "learnings",
          title: "Key learnings",
          body: <ul className="points">{s.learnings.map((l) => <li key={l}>{l}</li>)}</ul>,
        }
      : null,
  ];
  return all.filter((b): b is Block => b !== null);
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStudy(slug);
  if (!s) notFound();

  const sections = blocks(s);
  const i = caseStudies.findIndex((c) => c.slug === s.slug);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article>
      <header className="cs-hero">
        <div className="container">
          <Link href="/#work" className="link-arrow cs-back">
            <ArrowLeft size={16} aria-hidden /> All work
          </Link>
          <p className="label">
            {s.domain} · {s.type}
          </p>
          <h1 className="display-1">{s.title}</h1>
          <p className="lead">{s.problem}</p>
          <dl className="impact">
            {s.impact.map((m) => (
              <div key={m.label} className={`tone-${impactTone(m.value)}`}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <div className="impact-value" style={{ fontSize: "1.75rem" }}>{m.value}</div>
                  <div className="impact-label" aria-hidden>{m.label}</div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container cs-layout">
        <nav className="cs-toc glass" aria-label="On this page">
          <span className="label">On this page</span>
          <ol>
            {sections.map((b, n) => (
              <li key={b.id}>
                <a href={`#${b.id}`}>
                  <span className="n">{pad(n + 1)}</span> {b.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-sections">
          {sections.map((b, n) => (
            <section key={b.id} id={b.id} className="cs-section" aria-labelledby={`h-${b.id}`}>
              <h2 id={`h-${b.id}`}>
                <span className="n">{pad(n + 1)}</span>
                {(() => { const I = iconFor(b.id); return <I size={20} strokeWidth={1.75} aria-hidden className="cs-h-icon" />; })()}
                {b.title}
              </h2>
              {b.body}
            </section>
          ))}
        </div>
      </div>

      <div className="container">
        <nav className="cs-next" aria-label="Next case study">
          <span className="label">Next case study</span>
          <p style={{ margin: "8px 0 0" }}>
            <Link href={`/work/${next.slug}`} className="link-arrow" style={{ fontSize: "1.25rem" }}>
              {next.title} <ArrowRight size={18} className="arrow" aria-hidden />
            </Link>
          </p>
        </nav>
      </div>
    </article>
  );
}
