export interface Dashboard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  placeholderIcon: string;
  metrics: { label: string; value: string }[];
}

export const dashboards: Dashboard[] = [
  {
    id: "executive-dashboard",
    title: "Executive Dashboard",
    description: "C-suite KPI command centre with real-time revenue, margin, and operational health metrics across all business units.",
    tags: ["Power BI", "DAX", "Snowflake", "Executive"],
    color: "#3B82F6",
    placeholderIcon: "📊",
    metrics: [
      { label: "KPIs tracked", value: "40+" },
      { label: "Business units", value: "8" },
      { label: "Refresh cadence", value: "Hourly" },
    ],
  },
  {
    id: "lead-performance",
    title: "Lead Performance Dashboard",
    description: "End-to-end funnel visibility from lead acquisition through conversion, with rep-level and territory drill-through.",
    tags: ["Power BI", "CRM Data", "Zebra BI", "Sales"],
    color: "#F59E0B",
    placeholderIcon: "🎯",
    metrics: [
      { label: "Lead sources tracked", value: "12" },
      { label: "Conversion stages", value: "6" },
      { label: "Active reps monitored", value: "80+" },
    ],
  },
  {
    id: "opportunity-report",
    title: "Opportunity Report",
    description: "Pipeline health and deal velocity analytics with weighted forecast, stage progression heatmaps, and win/loss attribution.",
    tags: ["Power BI", "DAX", "ADF", "Pipeline"],
    color: "#10B981",
    placeholderIcon: "💼",
    metrics: [
      { label: "Pipeline value tracked", value: "$50M+" },
      { label: "Deal stages", value: "7" },
      { label: "Forecast accuracy", value: "92%" },
    ],
  },
  {
    id: "sales-engagement",
    title: "Sales Engagement Dashboard",
    description: "Activity analytics measuring outreach cadence, response rates, and engagement quality across channels and segments.",
    tags: ["Power BI", "Python", "Databricks", "Engagement"],
    color: "#8B5CF6",
    placeholderIcon: "📈",
    metrics: [
      { label: "Touchpoints analysed", value: "500K+" },
      { label: "Channels tracked", value: "5" },
      { label: "Response rate lift", value: "+23%" },
    ],
  },
  {
    id: "commercial-maturity",
    title: "Commercial Maturity Dashboard",
    description: "Strategic assessment framework scoring commercial capability across 12 dimensions, benchmarked against industry peers.",
    tags: ["Power BI", "Snowflake", "dbt", "Strategy"],
    color: "#EF4444",
    placeholderIcon: "🏆",
    metrics: [
      { label: "Maturity dimensions", value: "12" },
      { label: "Countries benchmarked", value: "8" },
      { label: "Stakeholder groups", value: "6" },
    ],
  },
];
