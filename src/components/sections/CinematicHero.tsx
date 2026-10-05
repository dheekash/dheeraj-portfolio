import { profile } from "@/data/profile";

/**
 * Hero.
 *
 * Left: who, what, and the three ways to act. Right: the page's one bold
 * element, a results chart in IBCS notation (the reporting standard Dheeraj
 * works in). Each row is a real before/after figure taken from the case
 * studies and experience below: "before" is an outlined bar, "after" is
 * solid ink, both on that row's own scale, so every bar length is a true
 * ratio and not an illustration.
 *
 * Server-rendered with no client JS. The single animation is CSS: each
 * "after" bar starts at the "before" length and shrinks to its value, so
 * the motion shows the reduction itself. Because the resting state is the
 * element's static style, the chart is correct with JS disabled, with a
 * failed chunk, and under reduced motion.
 */

type Result = {
  label: string;
  source: string;
  before: string;
  after: string;
  /** after ÷ before, on the row's own scale. */
  ratio: number;
};

/* Sorted by size of improvement, largest first. Rows that only report a
   percentage reduction are indexed to their own baseline. */
const results: Result[] = [
  { label: "Fraud detection time",    source: "Real-time fraud platform",  before: "24 hrs",   after: "<5 min", ratio: 5 / 1440 },
  { label: "Pipeline failure rate",   source: "Fabric Lakehouse migration", before: "12%",      after: "<1%",    ratio: 1 / 12 },
  { label: "Manual reporting effort", source: "Seller self-serve platform", before: "Baseline", after: "−70%",   ratio: 0.30 },
  { label: "Case resolution time",    source: "Amazon",                     before: "65 min",   after: "30 min", ratio: 30 / 65 },
  { label: "Dashboard delivery time", source: "Amplify Analytix",           before: "Baseline", after: "−40%",   ratio: 0.60 },
  { label: "Average handling time",   source: "Frontizo",                   before: "Baseline", after: "−31%",   ratio: 0.69 },
];

/* A sub-pixel bar disappears. The fraud row's true ratio (0.35%) would draw
   at about one pixel, so drawing has a floor; the label carries the value. */
const MIN_DRAWN = 0.008;

const facts = [
  { value: "7+", label: "years in analytics" },
  { value: "15+", label: "countries served" },
  { value: "13", label: "certifications" },
  { value: "5M+", label: "records processed daily" },
];

export function CinematicHero() {
  return (
    <section id="top" className="relative">
      <div className="container-page grid gap-x-14 gap-y-14 lg:grid-cols-12 items-start pt-[clamp(6rem,3.5rem+4vw,8rem)] pb-[clamp(3.5rem,2rem+3vw,5.5rem)]">
        {/* ── Introduction ── */}
        <div className="lg:col-span-7 min-w-0">
          <p className="hero-status">
            <span className="hero-status-dot" aria-hidden />
            Available for full-time roles and consulting
          </p>

          <p className="hero-name">Dheeraj Kashyap</p>

          <h1 className="hero-statement">
            Building analytics platforms that power enterprise decisions.
          </h1>

          <p className="hero-lede">
            Senior BI &amp; Analytics Engineer. I design Power BI semantic models
            and Microsoft Fabric lakehouses for enterprise teams, and hold 13
            certifications across Microsoft, Snowflake and Databricks.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="gradient-btn h-12 px-6 text-[15px]">
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-btn h-12 px-6 text-[15px]"
            >
              Résumé
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              LinkedIn
            </a>
          </div>

          <dl className="hero-facts">
            {facts.map((f) => (
              <div key={f.label} className="hero-fact">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="hero-fact-value">{f.value}</span>{" "}
                  <span className="hero-fact-label">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Results ── */}
        <figure className="lg:col-span-5 min-w-0 m-0">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
            <span className="results-title">Results</span>
            <span className="results-legend">
              <span><span className="swatch swatch--before" aria-hidden /> Before</span>
              <span><span className="swatch swatch--after" aria-hidden /> After</span>
            </span>
          </figcaption>

          <ul className="results">
            {results.map((r, i) => {
              const drawn = Math.max(r.ratio, MIN_DRAWN);
              return (
                <li key={r.label} className="results-row">
                  <div className="min-w-0">
                    <p className="results-label">{r.label}</p>
                    <p className="results-source">{r.source}</p>
                  </div>
                  <div
                    className="results-bars"
                    role="img"
                    aria-label={`${r.label}: before ${r.before}, after ${r.after}`}
                  >
                    <div className="results-bar">
                      <span className="results-track">
                        <span className="results-fill results-fill--before" style={{ width: "100%" }} />
                      </span>
                      <span className="results-value">{r.before}</span>
                    </div>
                    <div className="results-bar">
                      <span className="results-track">
                        <span
                          className="results-fill results-fill--after"
                          style={{ width: "100%", "--r": drawn, "--i": i } as React.CSSProperties}
                        />
                      </span>
                      <span className="results-value results-value--after">{r.after}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="results-note">
            Each row is drawn to its own starting point. Figures come from the case
            studies and roles below.{" "}
            <a href="#case-studies" className="hero-link">See the case studies</a>
          </p>
        </figure>
      </div>
    </section>
  );
}
