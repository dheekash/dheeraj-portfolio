/**
 * The résumé, as written in Dheeraj_Kashyap_Resume.pdf. Used only by the
 * printable /cv page; the home page keeps its own data. Copy is kept as in
 * the résumé, with spacing and punctuation tidied. The phone number is left
 * out on purpose: the page is public.
 */

export type ResumeRole = {
  title: string;
  company: string;
  where: string;
  start: string;
  end: string;
  bullets: string[];
};

export const resume = {
  headline: "Senior BI & Analytics Engineer",
  tools: ["Microsoft Fabric", "Power BI", "Snowflake", "Databricks"],
  location: "Bengaluru, India",
  summary:
    "Senior BI & Analytics Engineer with 7+ years delivering enterprise analytics on Microsoft Fabric, Power BI, Snowflake, and Databricks. Experienced in lakehouse architecture, semantic modeling, DAX, and governed reporting, with proven gains in pipeline reliability (12% to under 1% failure rate) and refresh performance across 15 country markets.",

  skills: [
    { area: "BI & Semantic Modeling", items: "Power BI, DAX, Semantic Models, Star Schema, Dimensional Modeling (Kimball), RLS/OLS, Direct Lake, Incremental Refresh, IBCS" },
    { area: "Data Engineering", items: "SQL, Python, PySpark, ETL/ELT, Microsoft Fabric Lakehouse, OneLake, Dataflows Gen2, Snowflake, Databricks, Delta Lake, dbt, SQLMesh, Apache Airflow" },
    { area: "Cloud & Data Platforms", items: "Microsoft Fabric, Azure Data Factory, Azure Synapse, AWS, Deployment Pipelines" },
    { area: "Engineering & Delivery", items: "Data Governance, Medallion Architecture, SCD Type 2, Git, Azure DevOps, CI/CD, Agile/Scrum, Requirements Gathering, UAT, Stakeholder Management" },
  ],

  experience: [
    {
      title: "Senior Business Intelligence Developer",
      company: "DataStream IT Solutions Pvt Ltd",
      where: "Remote",
      start: "Aug 2026",
      end: "Present",
      bullets: [
        "Deliver Power BI and Microsoft Fabric solutions for 7 active client engagements across North America, Europe, and APAC.",
        "Develop 12 Microsoft Fabric semantic models (6 in production, 6 in UAT/staging) and deploy 8 medallion lakehouse pipelines across bronze, silver, and gold layers.",
        "Run 18 requirements workshops with 42 stakeholders across 7 clients.",
        "Apply DAX standards and row-level security across 9 client workspaces in 4 regions for consistent, governed reporting.",
        "Ship 7 production Power BI dashboards (Fatigue Management, Override Usage Summary, Real-Time Head Count Monitoring, Audit, Procurement, Controller & Reader) covering compliance, vendor, and incident tracking.",
        "Deliver a Denied Access report using incremental refresh to track access-control exceptions in near real time, and manage work items in Azure DevOps across all 7 engagements.",
      ],
    },
    {
      title: "Business Analyst – BI & Analytics Delivery",
      company: "Amplify Analytix",
      where: "Bengaluru",
      start: "Jan 2025",
      end: "Aug 2026",
      bullets: [
        "Improved pipeline throughput by 25% and lowered compute costs by 15% against pre-migration baselines by implementing Microsoft Fabric medallion architecture, OneLake, Dataflows Gen2, partitioning, and incremental refresh.",
        "Saved 15+ hours of weekly manual reporting for client finance teams by building Power BI semantic models with 100+ DAX measures and automated variance commentary across 15 markets.",
        "Cut dashboard build time by 40% by standardizing SQLMesh transformation logic across finance, supply chain, and retail, with row- and object-level security enforced in all 15 markets.",
        "Led requirements gathering, solution design, and UAT sign-off for 4 enterprise accounts across 15 country markets through stakeholder workshops and Agile ceremonies.",
      ],
    },
    {
      title: "Career Break: Intensive Certification & Upskilling",
      company: "Professional Development",
      where: "Bengaluru",
      start: "Jul 2024",
      end: "Dec 2024",
      bullets: [
        "Earned the Microsoft Fabric Analytics Engineer Associate certification (DP-600) while completing MSc Data Science coursework at Deakin University.",
      ],
    },
    {
      title: "Investigation Specialist – Analytics",
      company: "Amazon",
      where: "Bengaluru",
      start: "Mar 2020",
      end: "Jun 2024",
      bullets: [
        "Drove 500+ weekly stakeholder views and reclaimed 6 hours of weekly reporting with 8 Power BI dashboards tracking fraud KPIs and SLA compliance across 10 global marketplaces.",
        "Shortened case resolution time by 35 minutes per analyst by working alongside data scientists to build and validate fraud-detection models (Random Forest, Logistic Regression), contributing feature engineering and investigation expertise.",
        "Enabled batch scoring for 10 marketplaces and millions of daily transactions by partnering with data science and platform engineering to productionize fraud models on AWS.",
        "Improved team reporting turnaround 25% by mentoring 5 junior analysts on SQL optimization and dashboard standards.",
      ],
    },
    {
      title: "Customer Service Associate",
      company: "Frontizo Business Services (An Amazon JV)",
      where: "Bengaluru",
      start: "Mar 2019",
      end: "Mar 2020",
      bullets: [
        "Contributed to a 31% reduction in Average Handling Time across 3 product lines through root cause analysis and redesigned resolution templates.",
      ],
    },
  ] satisfies ResumeRole[],

  projects: [
    {
      name: "Enterprise Lakehouse Migration",
      client: "The Mole Clinic (Amplify Analytix client)",
      year: "2025",
      tech: "Microsoft Fabric, OneLake, Dataflows Gen2, Power BI",
      impact: "Cut pipeline failure rate from 12% to under 1%; consolidated 6 source systems; saved 3 hours of daily reconciliation; brought incident resolution down from 4 hours to under 45 minutes.",
    },
    {
      name: "Global Manufacturing Analytics Suite",
      client: "Rockwool (Amplify Analytix client)",
      year: "2025",
      tech: "Snowflake, dbt, Power BI, Direct Lake",
      impact: "Slashed report refresh time from 4 hours to 15 minutes; served 200+ factory-floor users; enabled SCD Type 2 historical auditability.",
    },
    {
      name: "EMEA Sales Forecasting",
      client: "Stanley Black & Decker (Amplify Analytix client)",
      year: "2026",
      tech: "Snowflake, Power BI, DAX, IBCS",
      impact: "Identified $500K+ in revenue opportunities; unified 10M+ records across 10 markets; condensed executive reporting preparation time by 60%.",
    },
  ],

  certifications: [
    { name: "Microsoft Fabric Analytics Engineer Associate (DP-600)", issuer: "Microsoft", year: "2024" },
    { name: "Microsoft Fabric Data Engineer Associate (DP-700)", issuer: "Microsoft", year: "2025" },
    { name: "Microsoft Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft", year: "2021" },
    { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", year: "2026" },
    { name: "Snowflake SnowPro Associate: Platform", issuer: "Snowflake", year: "2026" },
    { name: "Astronomer Certification: DAG Authoring for Apache Airflow 3", issuer: "Astronomer", year: "2026" },
  ],

  education: [
    { degree: "Master of Science in Data Science", school: "Deakin University", years: "2022 to 2024" },
    { degree: "Bachelor of Engineering, Information Science and Engineering", school: "REVA University", years: "2014 to 2018" },
  ],
};
