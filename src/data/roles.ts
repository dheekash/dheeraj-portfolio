/* Work history, newest first. Official titles and dates as on the résumé;
   shared by the Experience section and the printable CV. */

export type Role = {
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

export const roles: Role[] = [
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
