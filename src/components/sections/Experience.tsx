import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const year = (d: string) => d.slice(-4);

/**
 * Experience: a progression strip first (the career story in one line),
 * then each role as a rail entry led by three figures.
 */
export function Experience() {
  const progression = [...roles].reverse();

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="experience-title" className="section-title">Experience</h2>
          <p className="lead">
            From support-floor reporting to enterprise BI architecture, in four roles over 7+ years.
          </p>
        </header>

        <ol className="progression reveal" aria-label="Career progression">
          {progression.map((r) => (
            <li key={r.company} className={r.current ? "is-current" : undefined}>
              <span className="pg-year">{year(r.start)}</span>
              <span className="pg-title">{r.short}</span>
              <span className="pg-org">{r.company}</span>
            </li>
          ))}
        </ol>

        <ol className="rail">
          {roles.map((r) => (
            <li key={r.company} className="rail-item reveal">
              <div className="rail-when">
                <span className="rail-year">{year(r.start)}</span>
                <span className="rail-range">
                  {r.start} – {r.end}
                </span>
                {r.current && <span className="rail-current">Current role</span>}
              </div>

              <div className="rail-main">
                <h3 className="title-3">{r.title}</h3>
                <p className="rail-org m-0">
                  <span translate="no">{r.company}</span>
                  <span className="muted">{r.location}</span>
                </p>
                <p className="rail-summary">{r.summary}</p>
                <ul className="rail-bullets">
                  {r.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <p className="stack-line">
                  <strong className="sr-only">Stack: </strong>
                  {r.stack.map((t) => <span key={t} translate="no">{t}</span>)}
                </p>
                {r.caseStudy && (
                  <Link href={r.caseStudy.href} className="link-arrow">
                    Case study: {r.caseStudy.label} <ArrowRight size={16} className="arrow" aria-hidden />
                  </Link>
                )}
              </div>

              <dl className="rail-impact" aria-label={`${r.company} impact`}>
                {r.impact.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="m-0">
                      <span className="ri-value">{m.value}</span>
                      <span className="ri-label" aria-hidden>{m.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
