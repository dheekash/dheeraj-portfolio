import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/work";
import { Mark } from "@/components/common/Mark";
import { PinnedTrack } from "@/components/common/PinnedTrack";
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

export function Projects() {
  const studies = [...caseStudies.filter((s) => s.featured), ...caseStudies.filter((s) => !s.featured)];

  return (
    <section id="work" className="sx pt-section" aria-labelledby="work-title">
      <PinnedTrack
        count={studies.length}
        head={
          <header className="pt-heading reveal">
            <div>
              <p className="sx-eyebrow">Featured work</p>
              <h2 id="work-title" className="sx-title">
                <Scribble>Projects</Scribble>
                <span className="sx-dot">.</span>
              </h2>
            </div>
            <p className="sx-intro pt-intro">
              Six enterprise builds across Power BI, Microsoft Fabric, Snowflake and Databricks. Each
              one starts with a business problem and ends with a measured result.
            </p>
          </header>
        }
      >
        {studies.map((s, i) => {
          const m = s.impact[0];
          return (
            <article key={s.slug} data-card className="pt-card" data-cover={i % 3} style={{ "--tilt": `${i % 2 ? 1.6 : -1.6}deg` } as React.CSSProperties}>
              <Link href={`/work/${s.slug}`} className="pt-link" aria-labelledby={`pt-${s.slug}`}>
                <div className="pt-cover" aria-hidden>
                  <span className="pt-cover-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sx-cover-mark">
                    <Mark name={leadOf[s.slug]} size={28} />
                  </span>
                  <span className="pt-cover-value">{m.value}</span>
                  <span className="pt-cover-label">{m.label}</span>
                </div>
                <div className="pt-meta">
                  <h3 id={`pt-${s.slug}`} className="pt-title">{s.title}</h3>
                  <ArrowUpRight size={22} aria-hidden className="pt-arrow" />
                </div>
                <p className="pt-sub">
                  <span>{s.type}</span>
                  <span>{s.domain}</span>
                </p>
              </Link>
            </article>
          );
        })}
      </PinnedTrack>
    </section>
  );
}
