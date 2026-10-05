import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Role = {
  start: string;
  end: string;
  title: string;
  company: string;
  location: string;
  current?: boolean;
  /** Up to three. `[[...]]` marks the figure to set in the metric style. */
  bullets: string[];
  stack: string[];
  caseStudy?: { href: string; label: string };
};

/* Official titles and dates as on the résumé. Bullets are the existing
   highlights, cut to three per role, leading with the figure. */
const roles: Role[] = [
  {
    start: "Aug 2026",
    end: "Present",
    title: "Senior Business Intelligence Developer",
    company: "DataStream IT Solutions",
    location: "Remote",
    current: true,
    bullets: [
      "Built [[12 governed semantic models]] (6 in production) and deployed [[8 medallion lakehouse pipelines]] across Microsoft Fabric workspaces.",
      "Engaged [[42 stakeholders]] across 7 client engagements in North America, Europe and APAC, running 18 requirements workshops.",
      "Shipped [[7 production Power BI dashboards]] for compliance, vendor and incident tracking, including incremental-refresh reporting.",
    ],
    stack: ["Power BI", "Microsoft Fabric", "DAX", "Row-level security", "Delta Lake", "Azure DevOps"],
  },
  {
    start: "Jan 2025",
    end: "Aug 2026",
    title: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    bullets: [
      "Cut pipeline failures from [[12% to under 1%]] by migrating a legacy SQL warehouse to SQLMesh.",
      "Architected a Microsoft Fabric lakehouse with Medallion architecture across 6 source systems, removing [[15+ hours a week]] of manual work.",
      "Shortened dashboard delivery by [[40%]], from stakeholder brief to published report, for clients across 15 countries.",
    ],
    stack: ["Microsoft Fabric", "SQLMesh", "Power BI", "DAX", "Azure", "Delta Lake", "ADF"],
    caseStudy: { href: "/work/fabric-lakehouse-migration", label: "Fabric lakehouse migration" },
  },
  {
    start: "Mar 2020",
    end: "Jun 2024",
    title: "Risk Data Analyst",
    company: "Amazon",
    location: "Bengaluru, India",
    bullets: [
      "Reduced fraud incidence [[30%]] with Random Forest and Logistic Regression models deployed to production.",
      "Led a 15-person analyst team and cut average case resolution from [[65 to 30 minutes]].",
      "Built Power BI dashboards on [[100M+ daily records]] for seller leadership across 10+ global marketplaces.",
    ],
    stack: ["Power BI", "Python", "SQL", "Snowflake", "Databricks", "Scikit-learn"],
    caseStudy: { href: "/work/seller-analytics-platform", label: "Seller analytics platform" },
  },
  {
    start: "Mar 2019",
    end: "Mar 2020",
    title: "Customer Support Analyst (Data & Reporting)",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    bullets: [
      "Cut average handling time [[31%]] with Excel dashboards built for 20+ associates.",
      "Raised contact resolution to [[94%]], against an 82% site benchmark.",
    ],
    stack: ["Excel", "SQL", "Power Query"],
  },
];

/** Renders `[[figure]]` spans in the metric style. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <span key={i} className="figure">{p}</span> : p))}
    </>
  );
}

const year = (d: string) => d.slice(-4);

/**
 * Experience as a career rail: the start year leads each entry, so the
 * progression from reporting analyst to senior BI developer reads down the
 * left edge before any bullet is read.
 */
export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head reveal">
          <h2 id="experience-title" className="section-title">Experience</h2>
          <p className="lead">
            7+ years and four roles, from operational reporting to enterprise BI architecture.
          </p>
        </header>

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

              <div>
                <h3 className="title-3">{r.title}</h3>
                <p className="rail-org m-0">
                  <span translate="no">{r.company}</span>
                  <span className="muted">{r.location}</span>
                </p>
                <ul className="rail-bullets">
                  {r.bullets.map((b) => (
                    <li key={b}><Rich text={b} /></li>
                  ))}
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

            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
