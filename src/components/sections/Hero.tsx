import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

/* Proof strip. All four figures are from the experience section: years
   since Mar 2019, and the current DataStream role's models, pipelines and
   stakeholders. Stated exactly, without "+", because they are counts. */
const proof = [
  { value: "7+", label: "Years in BI & analytics" },
  { value: "12", label: "Semantic models built" },
  { value: "8", label: "Fabric pipelines deployed" },
  { value: "42", label: "Stakeholders engaged" },
];

/* The stack I build, layer by layer, with a measured result at each layer.
   Every result is from a case study below; the link goes to it. */
const layers = [
  {
    layer: "Sources",
    what: "CRM, billing, transactions, files, event streams",
  },
  {
    layer: "Pipelines",
    what: "Fabric, ADF, SQLMesh, Kafka",
    before: "12%", after: "<1%", metric: "pipeline failure rate",
    href: "/work/fabric-lakehouse-migration",
  },
  {
    layer: "Lakehouse",
    what: "Bronze → Silver → Gold on Delta",
    before: "6 hrs", after: "<10 min", metric: "data latency",
    href: "/work/sales-intelligence-platform",
  },
  {
    layer: "Semantic model",
    what: "Star schema, DAX, row-level security",
    before: "4 hrs", after: "15 min", metric: "report refresh",
    href: "/work/manufacturing-analytics-suite",
  },
  {
    layer: "Power BI",
    what: "Governed, self-serve reporting",
    before: "Baseline", after: "−70%", metric: "manual reporting effort",
    href: "/work/seller-analytics-platform",
  },
  {
    layer: "Decision",
    what: "Risk, finance, operations, leadership",
    before: "24 hrs", after: "<5 min", metric: "fraud detection time",
    href: "/work/real-time-fraud-monitoring",
    output: true,
  },
];

const working = ["Power BI", "Microsoft Fabric", "SQL", "Snowflake", "Databricks", "Azure"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-intro">
          <p className="hero-name">Dheeraj Kashyap</p>
          <h1 id="hero-title" className="display-1 hero-anim" style={{ "--d": 1 } as React.CSSProperties}>
            BI &amp; Analytics Engineer building enterprise data systems with Power BI &amp; Microsoft Fabric.
          </h1>
          <p className="lead hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
            7+ years turning complex enterprise data into governed semantic models, analytics
            platforms and decision-ready reporting.
          </p>
          <div className="hero-ctas hero-anim" style={{ "--d": 3 } as React.CSSProperties}>
            <a href="#work" className="btn btn-primary">
              View selected work <ArrowRight size={16} aria-hidden />
            </a>
            <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Download résumé
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              LinkedIn <ArrowUpRight size={16} className="arrow-out" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <p className="hero-working hero-anim" style={{ "--d": 4 } as React.CSSProperties}>
            <span className="label">Working across</span>
            {working.map((w) => (
              <span key={w} className="hero-working-item" translate="no">{w}</span>
            ))}
          </p>
        </div>

        <dl className="hero-proof proof">
          {proof.map((p, i) => (
            <div key={p.label} className="proof-item hero-anim" style={{ "--d": 5 + i } as React.CSSProperties}>
              <dt className="proof-label label">{p.label}</dt>
              <dd className="proof-value">{p.value}</dd>
            </div>
          ))}
        </dl>

        <section className="hero-results card stack-panel" aria-labelledby="stack-title">
          <div className="results-head">
            <h2 id="stack-title" className="label" style={{ color: "var(--ink)" }}>What I build, and what changed</h2>
            <p className="results-key small m-0" aria-hidden>
              <span><span className="key-swatch is-before" /> Before</span>
              <span><span className="key-swatch is-after" /> After</span>
            </p>
          </div>
          <ol className="stack-layers">
            {layers.map((l, i) => {
              const body = (
                <>
                  <span className="sl-dot" aria-hidden />
                  <span className="sl-text">
                    <span className="sl-layer">{l.layer}</span>
                    <span className="sl-what">{l.what}</span>
                  </span>
                  {l.metric && (
                    <span className="sl-result">
                      <span className="sl-value">
                        <span className="result-before">{l.before}</span>
                        <span className="result-arrow" aria-hidden> → </span>
                        <span className="sr-only"> to </span>
                        <span className="result-after">{l.after}</span>
                      </span>
                      <span className="sl-metric">{l.metric}</span>
                    </span>
                  )}
                </>
              );
              return (
                <li
                  key={l.layer}
                  className={`sl-row hero-anim${l.output ? " is-output" : ""}`}
                  style={{ "--d": 3 + i } as React.CSSProperties}
                >
                  {l.href ? (
                    <a href={l.href} className="sl-inner">
                      {body}
                    </a>
                  ) : (
                    <div className="sl-inner">{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="stack-note small m-0">Each result links to the case study it comes from.</p>
        </section>
      </div>
    </section>
  );
}
