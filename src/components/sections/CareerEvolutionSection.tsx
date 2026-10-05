
const timeline = [
  {
    period: "Aug 2026 - Present",
    role: "Senior Business Intelligence Developer",
    company: "DataStream IT Solutions Pvt Ltd",
    location: "Remote",
    type: "Full-time",
    stack: ["Power BI", "Microsoft Fabric", "DAX", "Row-Level Security", "Delta Lake", "Azure DevOps"],
    metrics: [
      { value: "7", label: "client engagements" },
      { value: "12", label: "semantic models" },
    ],
    summary:
      "Delivering enterprise Power BI and Microsoft Fabric solutions across 7 active client engagements spanning North America, Europe, and APAC, plus 3 completed handovers. 12 governed semantic models and 8 medallion lakehouse pipelines built to date.",
    highlights: [
      "Built 12 governed semantic models (6 in production, 6 in UAT/staging) and deployed 8 medallion lakehouse pipelines across Fabric workspaces.",
      "Engaged 42 stakeholders across 7 clients, facilitating 18 formal requirements workshops.",
      "Shipped 7 production Power BI dashboards spanning compliance, vendor, and incident-tracking use cases, including a Denied Access incremental report using incremental refresh.",
    ],
    caseStudyLink: undefined,
    current: true,
  },
  {
    period: "Jan 2025 - Aug 2026",
    role: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Microsoft Fabric", "SQLMesh", "Power BI", "DAX", "Azure", "Delta Lake", "ADF"],
    metrics: [
      { value: "40%", label: "faster delivery" },
      { value: "15+ hrs", label: "saved / week" },
    ],
    summary:
      "Built Fabric Lakehouse platforms and analytics products for enterprise clients across 15 countries. Cut 15+ hours of weekly manual work, reduced compute costs 15%, and shortened dashboard delivery by 40%.",
    highlights: [
      "Architected Microsoft Fabric Lakehouse with Medallion architecture across 6 source systems. Cut 15+ hrs/week of manual work.",
      "Migrated legacy SQL warehouse to SQLMesh. Pipeline failures dropped from 12% to under 1%.",
      "Shortened dashboard delivery by 40%, from stakeholder brief to published report.",
    ],
    caseStudyLink: "#case-studies",
    current: false,
  },
  {
    period: "Mar 2020 - Jun 2024",
    caseStudyLink: undefined,
    role: "Risk Data Analyst",
    company: "Amazon",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Power BI", "Python", "SQL", "Snowflake", "Databricks", "Scikit-learn"],
    metrics: [
      { value: "−30%", label: "fraud incidence" },
      { value: "65→30 min", label: "case resolution" },
    ],
    summary:
      "Moved from fraud investigation into building self-serve analytics platforms for seller leadership across 10+ global marketplaces. Shipped fraud models to production, led a 15-person team, and cut case resolution time by 35 minutes.",
    highlights: [
      "Built and deployed Random Forest and Logistic Regression fraud models. Reduced fraud incidence 30%.",
      "Led a 15-person analyst team. Cut average case resolution time from 65 min to 30 min per case.",
      "Built Power BI dashboards processing 100M+ daily records. Adopted by sales leadership globally.",
    ],
    current: false,
  },
  {
    period: "Mar 2019 - Mar 2020",
    role: "Customer Support Analyst (Data & Reporting)",
    company: "Frontizo Business Services",
    location: "Bengaluru, India",
    type: "Full-time",
    stack: ["Excel", "SQL", "Power Query"],
    metrics: [
      { value: "−31%", label: "handling time" },
      { value: "94%", label: "contact resolution" },
    ],
    summary:
      "Amazon-operated BPO. Built Excel dashboards for 20+ associates, cut average handling time 31%, pushed contact resolution to 94% vs 82% site benchmark.",
    highlights: [],
    current: false,
  },
];


/* Ranges take an en dash (The Elements of Typographic Style, 5.2.2). */
const range = (p: string) => p.replace(" - ", " – ");

/**
 * Experience as an open timeline rather than a stack of cards. The case
 * studies above are cards; repeating the device here would make the page
 * read as one template. A ruled spine carries the chronology, the current
 * role is set in ink, and each role leads with its figures.
 */
export function CareerEvolutionSection() {
  return (
    <section id="journey">
      <div className="container-page section-pad">
        <div className="max-w-[60rem] flex flex-wrap items-end justify-between gap-x-10 gap-y-4 mb-[clamp(2rem,3.5vw,3.5rem)]">
          <h2>Experience</h2>
          <dl className="career-facts">
            <div><dt className="sr-only">Experience</dt><dd><strong>7+</strong> years</dd></div>
            <div><dt className="sr-only">Employers</dt><dd><strong>4</strong> companies</dd></div>
            <div><dt className="sr-only">Markets</dt><dd><strong>15</strong> countries</dd></div>
          </dl>
        </div>

        <ol className="career">
          {timeline.map((item) => (
            <li key={`${item.period}-${item.role}`} className={`career-role ${item.current ? "is-current" : ""}`}>
              <p className="career-period">
                {range(item.period)}
                {item.current && <span className="sr-only"> (current role)</span>}
              </p>

              <div className="career-body">
                <h3 className="career-title">{item.role}</h3>
                <p className="career-org">
                  <span translate="no">{item.company}</span>
                  <span className="career-loc">{item.location}</span>
                </p>

                {"metrics" in item && item.metrics && (
                  <dl className="career-metrics">
                    {item.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd><span className="career-metric-value">{m.value}</span> {m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="career-summary">{item.summary}</p>

                {item.highlights.length > 0 && (
                  <ul className="career-highlights">
                    {item.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}

                <ul className="case-stack" aria-label="Stack">
                  {item.stack.map((t) => <li key={t} translate="no">{t}</li>)}
                </ul>

                {"caseStudyLink" in item && item.caseStudyLink && (
                  <a href={item.caseStudyLink} className="hero-link mt-4 -ml-1">See featured project</a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
