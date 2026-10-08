import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Scribble } from "@/components/common/Scribble";

type Role = {
  start: string;
  end: string;
  title: string;
  /** Short form for the progression strip. */
  short: string;
  company: string;
  location: string;
  current?: boolean;
  summary: string;
  /** Three figures that prove the role. */
  impact: { value: string; label: string }[];
  bullets: string[];
  stack: string[];
  caseStudy?: { href: string; label: string };
};

/* Official titles and dates as on the résumé. Figures and wording are the
   existing experience entries, reorganised: the numbers move into impact
   blocks and the bullets say how. */
const roles: Role[] = [
  {
    start: "Aug 2026",
    end: "Present",
    title: "Senior Business Intelligence Developer",
    short: "Senior BI Developer",
    company: "DataStream IT Solutions",
    location: "Remote",
    current: true,
    summary:
      "Delivering enterprise Power BI and Microsoft Fabric solutions across 7 client engagements in North America, Europe and APAC.",
    impact: [
      { value: "12", label: "Semantic models built" },
      { value: "8", label: "Fabric pipelines deployed" },
      { value: "18", label: "Requirements workshops" },
    ],
    bullets: [
      "Built governed semantic models (6 in production, 6 in UAT) and medallion lakehouse pipelines across Fabric workspaces.",
      "Engaged 42 stakeholders across 7 clients, turning workshop requirements into analytics products.",
      "Shipped 7 production Power BI dashboards for compliance, vendor and incident tracking, including incremental refresh.",
    ],
    stack: ["Power BI", "Microsoft Fabric", "DAX", "Row-level security", "Delta Lake", "Azure DevOps"],
  },
  {
    start: "Jan 2025",
    end: "Aug 2026",
    title: "BI & Analytics Engineer",
    short: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    summary: "Built Fabric lakehouse platforms and analytics products for enterprise clients across 15 countries.",
    impact: [
      { value: "12% → <1%", label: "Pipeline failure rate" },
      { value: "15+ hrs", label: "Manual work saved a week" },
      { value: "−40%", label: "Dashboard delivery time" },
    ],
    bullets: [
      "Architected a Microsoft Fabric lakehouse with Medallion architecture across 6 source systems.",
      "Migrated a legacy SQL warehouse to SQLMesh with automated quality gates.",
      "Reduced compute costs 15% and shortened delivery from stakeholder brief to published report.",
    ],
    stack: ["Microsoft Fabric", "SQLMesh", "Power BI", "DAX", "Azure", "Delta Lake", "ADF"],
    caseStudy: { href: "/work/fabric-lakehouse-migration", label: "Fabric lakehouse migration" },
  },
  {
    start: "Mar 2020",
    end: "Jun 2024",
    title: "Risk Data Analyst",
    short: "Risk Data Analyst",
    company: "Amazon",
    location: "Bengaluru, India",
    summary:
      "Moved from fraud investigation into building self-serve analytics for seller leadership across 10+ global marketplaces.",
    impact: [
      { value: "−30%", label: "Fraud incidence" },
      { value: "65 → 30 min", label: "Case resolution time" },
      { value: "15", label: "Analysts led" },
    ],
    bullets: [
      "Built and deployed Random Forest and Logistic Regression fraud models to production.",
      "Built Power BI dashboards on 100M+ daily records, adopted by sales leadership globally.",
    ],
    stack: ["Power BI", "Python", "SQL", "Snowflake", "Databricks", "Scikit-learn"],
    caseStudy: { href: "/work/seller-analytics-platform", label: "Seller analytics platform" },
  },
  {
    start: "Mar 2019",
    end: "Mar 2020",
    title: "Customer Support Analyst (Data & Reporting)",
    short: "Support Analyst, Reporting",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    summary: "Data and reporting for an Amazon-operated support operation.",
    impact: [
      { value: "−31%", label: "Average handling time" },
      { value: "94%", label: "Contact resolution, vs 82% site benchmark" },
      { value: "20+", label: "Associates on my dashboards" },
    ],
    bullets: ["Built the Excel dashboards the support floor used to track handling time and resolution."],
    stack: ["Excel", "SQL", "Power Query"],
  },
];

/**
 * Work experience as a compact two-sided timeline. One continuous line runs
 * down the centre; cards alternate left and right and overlap by half a
 * card, so the section is about half the height of a one-card-per-row
 * layout. Document order stays chronological for screen readers. On narrow
 * screens the line moves to the left and cards stack.
 */
export function Experience() {
  return (
    <section id="experience" className="section sx" aria-labelledby="experience-title">
      <div className="container">
        <header className="sx-head is-center reveal">
          <p className="sx-eyebrow">Career</p>
          <h2 id="experience-title" className="sx-title">
            Work <Scribble>Experience</Scribble><span className="sx-dot">.</span>
          </h2>
        </header>

        <ol className="xt">
          {roles.map((r, i) => {
            return (
              <li
                key={r.company}
                className={`xt-item ${i % 2 ? "is-right" : "is-left"} reveal`}
                style={{ "--row": i + 1 } as React.CSSProperties}
              >
                {/* A plain marker on the line; the card names the company. */}
                <span className={`xt-node${r.current ? " is-current" : ""}`} aria-hidden />
                <article className="xt-card card" aria-labelledby={`role-${i}`}>
                  <p className="xt-date">
                    {r.start} – {r.end}
                    {r.current && <span className="xt-current">Current role</span>}
                  </p>
                  <h3 id={`role-${i}`} className="tl-role">{r.title}</h3>
                  <p className="tl-org">
                    <span translate="no">{r.company}</span>
                    <span className="tl-loc">{r.location}</span>
                  </p>
                  <dl className="tl-impact">
                    {r.impact.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd>
                          <span className="tl-impact-value">{m.value}</span>
                          <span className="tl-impact-label" aria-hidden>{m.label}</span>
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
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
