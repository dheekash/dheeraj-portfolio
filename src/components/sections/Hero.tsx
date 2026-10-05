import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

/* Proof strip. Each figure is stated in the experience section:
   7+ years (Mar 2019 to present), and the semantic models, lakehouse
   pipelines and stakeholders from the current DataStream role. */
const proof = [
  { value: "7+", label: "Years in BI & analytics" },
  { value: "12", label: "Governed semantic models" },
  { value: "8", label: "Fabric lakehouse pipelines" },
  { value: "42", label: "Stakeholders across 7 clients" },
];

/* Results. Before/after pairs from the case studies. `r` is after ÷ before
   on each row's own scale, so every bar length is a true ratio. The
   reporting-effort row is reported only as a reduction, so it is drawn
   against its own baseline. */
const results = [
  { before: "12%", after: "<1%", r: 1 / 12, label: "Pipeline failure rate", source: "Fabric lakehouse migration", href: "/work/fabric-lakehouse-migration" },
  { before: "4 hrs", after: "15 min", r: 15 / 240, label: "Report refresh time", source: "Manufacturing analytics suite", href: "/work/manufacturing-analytics-suite" },
  { before: "Baseline", after: "−70%", r: 0.3, label: "Manual reporting effort", source: "Seller analytics platform", href: "/work/seller-analytics-platform" },
  { before: "24 hrs", after: "<5 min", r: 5 / 1440, label: "Fraud detection latency", source: "Real-time fraud monitoring", href: "/work/real-time-fraud-monitoring" },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-intro">
          <p className="label">Dheeraj Kashyap · BI &amp; Analytics Engineer</p>
          <h1 id="hero-title" className="display-1">
            I build enterprise analytics systems that turn complex data into decisions.
          </h1>
          <p className="lead">
            7+ years across Power BI, Microsoft Fabric, SQL, Snowflake and modern data
            platforms, building governed semantic models, analytics platforms and executive
            reporting.
          </p>
          <div className="hero-ctas">
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
        </div>

        <dl className="hero-proof proof">
          {proof.map((p) => (
            <div key={p.label} className="proof-item">
              <dt className="sr-only">{p.label}</dt>
              <dd className="m-0">
                <span className="proof-value">{p.value}</span>
                <span className="proof-label label" aria-hidden>{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <section className="hero-results card results-panel" aria-labelledby="results-title">
          <div className="results-head">
            <h2 id="results-title" className="label" style={{ color: "var(--ink)" }}>Results</h2>
            <p className="results-key small m-0" aria-hidden>
              <span><span className="key-swatch is-before" /> Before</span>
              <span><span className="key-swatch is-after" /> After</span>
            </p>
          </div>
          <ul className="results-grid list-none m-0 p-0">
            {results.map((r, i) => (
              <li key={r.label} className="result-cell">
                <a href={r.href} className="result">
                  <span className="result-value">
                    <span className="result-before">{r.before}</span>
                    <span className="result-arrow" aria-hidden>→</span>
                    <span className="sr-only">to</span>
                    <span className="result-after">{r.after}</span>
                  </span>
                  <span className="result-bars" aria-hidden>
                    <span className="result-bar is-before" />
                    <span
                      className="result-bar is-after"
                      style={{ "--r": Math.max(r.r, 0.012), "--i": i } as React.CSSProperties}
                    />
                  </span>
                  <span className="result-label">{r.label}</span>
                  <span className="result-source">{r.source}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
