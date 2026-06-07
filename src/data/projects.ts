import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "real-time-sales-intelligence",
    slug: "real-time-sales-intelligence",
    title: "Real-Time Sales Intelligence Platform",
    subtitle: "End-to-end streaming analytics for global retail operations",
    summary:
      "Architected a high-throughput streaming analytics platform processing 5M+ daily transactions across 8 regional markets, reducing reporting latency from 6 hours to under 10 minutes.",
    problem:
      "A global retail enterprise was operating on batch-based reporting with a 6-hour data latency, preventing sales teams from making timely decisions. Regional managers lacked real-time visibility into inventory, revenue, and demand signals across 8 markets.",
    solution:
      "Designed and implemented a streaming data pipeline on Databricks using Auto Loader and Delta Live Tables, with Power BI DirectQuery dashboards for near-real-time sales intelligence. Azure Data Factory orchestrated ingestion from 12 source systems into ADLS Gen2, with PySpark transformations applying business logic at scale.",
    challenges: [
      "Schema evolution across 12 heterogeneous source systems with varying update frequencies",
      "Achieving sub-10-minute SLA while maintaining full audit trail and data lineage",
      "Designing Power BI semantic model to support DirectQuery at 5M+ daily row scale",
      "Coordinating rollout across 8 regional markets with varying network and infrastructure constraints",
    ],
    results: [
      "Reduced reporting latency from 6 hours to under 10 minutes",
      "Enabled real-time decision-making for 8 regional sales teams",
      "Processed 5M+ daily transactions with 99.9% pipeline reliability",
      "Reduced manual reporting effort by 80% across regional teams",
    ],
    businessImpact:
      "Sales teams gained intraday visibility that previously required overnight batch runs. Regional managers could respond to demand signals and inventory anomalies within minutes, directly improving stock availability and revenue capture.",
    techStack: ["Databricks", "Azure Data Factory", "PySpark", "Power BI", "ADLS Gen2", "Delta Lake", "Auto Loader"],
    metrics: [
      { value: "5M+", label: "Daily Transactions" },
      { value: "<10min", label: "Reporting Latency" },
      { value: "8", label: "Regional Markets" },
      { value: "99.9%", label: "Pipeline Reliability" },
    ],
    tags: ["Databricks", "Streaming", "Power BI", "PySpark", "Delta Lake"],
    featured: true,
    color: "#3B82F6",
    gradient: "from-blue-600/20 to-blue-900/5",
  },
  {
    id: "customer-churn-analytics",
    slug: "customer-churn-analytics",
    title: "Customer Churn Analytics Pipeline",
    subtitle: "ML-powered churn prediction with executive BI integration",
    summary:
      "Built an end-to-end customer churn prediction system processing 2M+ customer records with 89% recall, reducing churn by 18% and generating $300K in annual savings.",
    problem:
      "A subscription-based enterprise was experiencing elevated customer churn with no early-warning system. Customer success teams were reacting to cancellations rather than proactively retaining at-risk accounts. Existing reporting offered no predictive signal.",
    solution:
      "Designed a full ML pipeline from feature engineering through model deployment using Databricks MLflow and Snowflake for feature storage. dbt transformations created the feature layer from raw CRM and product usage data. A Python-based churn model with 89% recall was integrated into Power BI dashboards, giving Customer Success teams a ranked at-risk customer list updated daily.",
    challenges: [
      "Feature engineering across fragmented CRM, billing, and product usage data sources",
      "Achieving high recall to minimize missed at-risk accounts without overwhelming CS teams with false positives",
      "Building a scalable feature store in Snowflake to support both training and inference pipelines",
      "Designing executive-level BI that surfaced ML predictions without exposing model complexity",
    ],
    results: [
      "Achieved 89% recall on churn prediction model",
      "Reduced customer churn rate by 18% within 6 months of deployment",
      "Generated $300K in annual savings from retained accounts",
      "Processed 2M+ customer records through daily inference pipeline",
    ],
    businessImpact:
      "Customer Success teams shifted from reactive to proactive engagement. The ranked churn risk list enabled targeted outreach campaigns that meaningfully reduced cancellation rates and delivered measurable revenue retention.",
    techStack: ["Databricks", "Snowflake", "dbt", "Power BI", "Python", "MLflow", "SQL"],
    metrics: [
      { value: "2M+", label: "Customer Records" },
      { value: "89%", label: "Model Recall" },
      { value: "18%", label: "Churn Reduction" },
      { value: "$300K", label: "Annual Savings" },
    ],
    tags: ["Databricks", "Snowflake", "dbt", "Machine Learning", "Power BI"],
    featured: true,
    color: "#F59E0B",
    gradient: "from-amber-600/20 to-amber-900/5",
  },
  {
    id: "fabric-lakehouse-migration",
    slug: "fabric-lakehouse-migration",
    title: "Enterprise Fabric Lakehouse Migration",
    subtitle: "Legacy warehouse to Microsoft Fabric Lakehouse modernization",
    summary:
      "Led full migration from a fragile legacy warehouse to a Microsoft Fabric Lakehouse, reducing pipeline failure rate from 12% to under 1% and cutting compute costs by 15%.",
    problem:
      "An enterprise data team was operating a legacy warehouse with 12% monthly pipeline failure rates, high maintenance overhead, and escalating cloud compute costs. Technical debt had accumulated over several years, making incremental improvements ineffective.",
    solution:
      "Designed and executed a phased migration to Microsoft Fabric using OneLake as the unified storage layer and Delta Lake for ACID-compliant tables. SQLMesh replaced ad-hoc SQL transformations with a version-controlled, tested transformation layer. The Medallion architecture (Bronze, Silver, Gold) established clear data contracts and separation of concerns.",
    challenges: [
      "Migrating 5+ years of historical data with full lineage preservation and zero data loss",
      "Re-engineering 200+ legacy SQL transformations into SQLMesh models with automated testing",
      "Maintaining business continuity — parallel-running legacy and new systems during validation",
      "Stakeholder change management and retraining on Fabric tooling",
    ],
    results: [
      "Pipeline failure rate reduced from 12% to under 1%",
      "Maintenance overhead reduced by 90%",
      "Compute costs reduced by 15% through Fabric capacity optimization",
      "Full data lineage and automated testing across all transformation layers",
    ],
    businessImpact:
      "The data team shifted from firefighting pipeline failures to delivering new analytics capabilities. Engineering time spent on maintenance dropped by 90%, freeing capacity for strategic data product development.",
    techStack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "Power BI", "OneLake", "Python"],
    metrics: [
      { value: "90%", label: "Maintenance Reduction" },
      { value: "<1%", label: "Pipeline Failure Rate" },
      { value: "15%", label: "Compute Cost Reduction" },
      { value: "200+", label: "SQL Models Migrated" },
    ],
    tags: ["Microsoft Fabric", "Lakehouse", "SQLMesh", "Delta Lake", "Migration"],
    featured: true,
    color: "#8B5CF6",
    gradient: "from-violet-600/20 to-violet-900/5",
  },
  {
    id: "global-manufacturing-analytics",
    slug: "global-manufacturing-analytics",
    title: "Global Manufacturing Analytics Suite",
    subtitle: "Enterprise-scale BI for multi-market manufacturing operations",
    summary:
      "Delivered a unified analytics suite serving 200+ users across 15 manufacturing markets, reducing dashboard refresh time from 4 hours to 15 minutes.",
    problem:
      "A global manufacturing client had siloed reporting across 15 markets with no unified analytics layer. Operational managers relied on overnight batch reports and manual Excel consolidations, making cross-market performance comparison impossible and decision cycles too slow.",
    solution:
      "Built a centralized Snowflake data warehouse with dbt-modeled transformation layers, ingested by ADF from 15 regional ERP and MES systems. Power BI semantic models with row-level security enabled region-specific views while supporting global roll-up reports for executive leadership.",
    challenges: [
      "Harmonizing data from 15 regional ERP systems with different schemas and refresh cadences",
      "Designing row-level security for 200+ users across regional, country, and global access levels",
      "Achieving 15-minute refresh SLA with complex multi-join semantic model",
      "Building an intuitive executive dashboard that surfaced operational KPIs without requiring data literacy",
    ],
    results: [
      "Reduced dashboard refresh time from 4 hours to 15 minutes",
      "Deployed to 200+ users across 15 global markets",
      "Enabled real-time cross-market performance benchmarking for executive leadership",
      "Eliminated 40+ manual Excel reports through automated BI layer",
    ],
    businessImpact:
      "Regional operations managers gained same-day visibility into production KPIs. Executive leadership could benchmark market performance in real time, enabling faster strategic reallocation of resources and production capacity.",
    techStack: ["Power BI", "Snowflake", "dbt", "Azure Data Factory", "SQL", "DAX"],
    metrics: [
      { value: "200+", label: "Active Users" },
      { value: "15", label: "Global Markets" },
      { value: "15min", label: "Refresh Time" },
      { value: "40+", label: "Excel Reports Eliminated" },
    ],
    tags: ["Power BI", "Snowflake", "dbt", "Enterprise BI", "Manufacturing"],
    featured: true,
    confidential: true,
    clientLabel: "Global Manufacturing Client",
    color: "#10B981",
    gradient: "from-emerald-600/20 to-emerald-900/5",
  },
  {
    id: "amazon-sales-forecasting",
    slug: "amazon-sales-forecasting",
    title: "Amazon Sales Forecasting Dashboard",
    subtitle: "Executive forecasting intelligence for Amazon seller operations",
    summary:
      "Built a predictive sales forecasting dashboard processing 10M+ records, identifying $500K+ in revenue opportunities through advanced DAX analytics and Zebra BI visualizations.",
    problem:
      "Amazon's seller analytics team lacked a unified forecasting tool to project sales trends, identify revenue opportunities, and surface anomalies across the seller portfolio. Existing reporting was descriptive-only with no predictive capability.",
    solution:
      "Designed a Power BI solution backed by Snowflake, with Python-based time-series forecasting models generating forecast tables loaded into the semantic model. Zebra BI visuals provided executive-grade variance analysis and waterfall charts. Advanced DAX measures powered rolling forecasts, YoY comparisons, and anomaly flagging.",
    challenges: [
      "Processing and modeling 10M+ records within Power BI performance constraints",
      "Designing DAX measures for complex time-intelligence calculations at scale",
      "Integrating Python forecasting output into Power BI refresh pipeline reliably",
      "Presenting statistical forecasts in a format accessible to non-technical sales leadership",
    ],
    results: [
      "Identified $500K+ in revenue opportunities through forecast gap analysis",
      "Dashboard adopted by senior sales leadership for weekly business reviews",
      "Processing 10M+ records with sub-30-second load times",
      "Reduced manual forecasting effort by 70%",
    ],
    businessImpact:
      "Sales leadership gained a single source of truth for revenue forecasting, enabling proactive seller engagement strategies. The $500K+ opportunity identification directly influenced resource allocation decisions.",
    techStack: ["Power BI", "Snowflake", "Zebra BI", "DAX", "Python", "SQL"],
    metrics: [
      { value: "10M+", label: "Records Processed" },
      { value: "$500K+", label: "Revenue Opportunities" },
      { value: "70%", label: "Manual Effort Reduced" },
      { value: "<30s", label: "Dashboard Load Time" },
    ],
    tags: ["Power BI", "Snowflake", "DAX", "Forecasting", "Amazon"],
    featured: false,
    color: "#F97316",
    gradient: "from-orange-600/20 to-orange-900/5",
  },
];
