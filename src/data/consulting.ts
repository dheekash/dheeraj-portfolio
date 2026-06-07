import type { ConsultingService } from "@/types";

export const consultingServices: ConsultingService[] = [
  {
    id: "bi-analytics",
    title: "BI & Analytics Solutions",
    description:
      "End-to-end business intelligence architecture from data modelling through executive reporting. Semantic models, KPI frameworks, and self-service BI that empowers non-technical stakeholders.",
    icon: "bar-chart-3",
    deliverables: [
      "Power BI semantic model design & development",
      "KPI framework and metric catalogue",
      "Executive dashboard and reporting suite",
      "Self-service BI training and documentation",
    ],
    color: "amber",
  },
  {
    id: "fabric-implementation",
    title: "Microsoft Fabric Implementations",
    description:
      "Full-cycle Microsoft Fabric deployments including Lakehouse design, data pipeline engineering, OneLake configuration, and Power BI integration within the Fabric ecosystem.",
    icon: "layers",
    deliverables: [
      "Fabric workspace and capacity architecture",
      "Lakehouse and Warehouse design",
      "OneLake unified storage strategy",
      "Fabric pipeline and Notebook development",
    ],
    color: "violet",
  },
  {
    id: "lakehouse-architecture",
    title: "Lakehouse Architecture Design",
    description:
      "Design and implementation of Medallion (Bronze-Silver-Gold) Lakehouse architectures optimized for enterprise scale, cost efficiency, and long-term maintainability.",
    icon: "database",
    deliverables: [
      "Medallion architecture design document",
      "Data modelling and schema standards",
      "Delta Lake / Iceberg table strategy",
      "Data quality and testing framework",
    ],
    color: "blue",
  },
  {
    id: "databricks-engineering",
    title: "Databricks Data Engineering",
    description:
      "Scalable data pipeline development on Databricks using PySpark, Delta Live Tables, and MLflow for organizations building on the Databricks Lakehouse Platform.",
    icon: "zap",
    deliverables: [
      "PySpark pipeline development",
      "Delta Live Tables implementation",
      "Databricks workflow orchestration",
      "MLflow model tracking and registry",
    ],
    color: "red",
  },
  {
    id: "platform-modernization",
    title: "Data Platform Modernization",
    description:
      "Assessment, roadmap, and execution of legacy data warehouse migrations to modern cloud-native platforms — Snowflake, Microsoft Fabric, or Databricks.",
    icon: "refresh-cw",
    deliverables: [
      "Current-state assessment and gap analysis",
      "Target architecture and migration roadmap",
      "Phased migration execution",
      "Testing and validation framework",
    ],
    color: "emerald",
  },
  {
    id: "executive-dashboards",
    title: "Executive Dashboards & KPI Reporting",
    description:
      "Premium executive-grade Power BI dashboards with advanced DAX, Zebra BI visualizations, and curated KPI frameworks aligned to board and C-suite reporting requirements.",
    icon: "trending-up",
    deliverables: [
      "Executive dashboard design and build",
      "Advanced DAX measure development",
      "Zebra BI and custom visual integration",
      "Automated refresh and distribution setup",
    ],
    color: "orange",
  },
];
