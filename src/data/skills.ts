import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Data Engineering",
    icon: "database",
    color: "blue",
    skills: [
      { name: "Microsoft Fabric" },
      { name: "Databricks" },
      { name: "Snowflake" },
      { name: "Azure Data Factory" },
      { name: "SQLMesh" },
      { name: "dbt" },
      { name: "Delta Lake" },
      { name: "OneLake" },
      { name: "Lakehouse Architecture" },
      { name: "Medallion Architecture" },
    ],
  },
  {
    category: "Business Intelligence",
    icon: "bar-chart-3",
    color: "amber",
    skills: [
      { name: "Power BI" },
      { name: "DAX" },
      { name: "Zebra BI" },
      { name: "Tableau" },
      { name: "Grafana" },
      { name: "Looker" },
    ],
  },
  {
    category: "Programming",
    icon: "code-2",
    color: "violet",
    skills: [
      { name: "SQL" },
      { name: "Python" },
      { name: "PySpark" },
      { name: "KQL" },
    ],
  },
  {
    category: "Machine Learning",
    icon: "brain",
    color: "emerald",
    skills: [
      { name: "Time-Series Forecasting" },
      { name: "Feature Engineering" },
      { name: "Anomaly Detection" },
      { name: "Predictive Analytics" },
    ],
  },
];
