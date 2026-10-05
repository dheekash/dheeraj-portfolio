/**
 * Case studies. Single source for the home-page cards and the
 * /work/[slug] pages.
 *
 * Every figure and sentence below comes from the portfolio's existing case
 * studies and experience entries. Nothing is estimated. Where a template
 * section has no source material (`role`, `learnings`, `image`), the field is
 * left out and the section is not rendered, rather than filled with
 * invented copy.
 */

export type FlowStep = {
  stage: string;
  /** Short label for the diagram node. */
  node: string;
  detail: string;
  output?: boolean;
};
export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  domain: string;
  type: string;
  title: string;
  /** One-line summary of the build. */
  summary: string;
  /** Card: the problem, in one sentence. */
  problem: string;
  /** Card: what was built, in one sentence. */
  action: string;
  challenge: string;
  built: string;
  outcome: string;
  impact: Metric[];
  stack: string[];
  /** Source → … → consumer, taken from the build description. */
  flow: FlowStep[];
  points: string[];
  /** Where the work was done, when the portfolio states it. */
  role?: string;
  /** What I did, as disciplines, taken from the build description. */
  contribution: string[];
  /** Size of the build, from the case study's own figures. */
  scope: string[];
  learnings?: string[];
  /** Anonymised screenshot, when one is available. Lives in /public/work. */
  image?: { src: string; alt: string; width: number; height: number };
  code?: { lang: string; label: string; code: string };
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fabric-lakehouse-migration",
    domain: "Platform engineering",
    type: "Lakehouse migration",
    title: "Enterprise Fabric Lakehouse Migration",
    summary:
      "Phased Medallion migration across 6 source systems. 200+ SQLMesh models with automated quality gates. Zero downtime.",
    problem: "A legacy data warehouse was failing 12% of pipeline runs monthly.",
    action:
      "Phased migration to Microsoft Fabric with Medallion architecture, 200+ SQLMesh models and quality checks at each layer.",
    challenge:
      "A legacy data warehouse was failing 12% of pipeline runs monthly. Six source systems had no unified schema, no lineage, and no quality gates.",
    built:
      "Phased migration to Microsoft Fabric with Medallion architecture (Bronze/Silver/Gold), 200+ SQLMesh transformation models, automated quality checks at each layer, and Power BI semantic models on top.",
    outcome:
      "Pipeline failures dropped from 12% to under 1%. Maintenance effort reduced by 90%. Legacy and new platform ran in parallel throughout validation. Zero downtime.",
    impact: [
      { value: "12% → <1%", label: "Pipeline failure rate" },
      { value: "−90%", label: "Maintenance effort" },
      { value: "−15%", label: "Compute cost" },
    ],
    contribution: ["Lakehouse architecture", "Data modelling", "Migration delivery"],
    scope: ["6 source systems", "200+ SQLMesh models", "5+ years of history"],
    stack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI", "DAX"],
    flow: [
      { stage: "Sources", node: "6 source systems", detail: "No unified schema, lineage or quality gates" },
      { stage: "Bronze", node: "Bronze", detail: "Raw ingestion to OneLake, Delta Lake" },
      { stage: "Silver", node: "Silver", detail: "200+ SQLMesh models, automated quality gates" },
      { stage: "Gold", node: "Gold", detail: "Curated Fabric lakehouse tables" },
      { stage: "Semantic model", node: "Semantic model", detail: "Power BI semantic models, DAX" },
      { stage: "Reporting", node: "Power BI", detail: "Power BI", output: true },
    ],
    points: [
      "5+ years of historical data migrated with zero data loss.",
      "200+ legacy SQL transformations rebuilt as tested SQLMesh models.",
      "Automated quality gates at Bronze, Silver, and Gold Medallion layers.",
      "Pipeline failure rate: 12% to under 1%.",
      "Compute costs reduced 15% through Fabric capacity tuning.",
    ],
    role: "Built at Amplify Analytix as BI & Analytics Engineer.",
    code: {
      lang: "sql",
      label: "SQLMesh: Silver-layer quality gate",
      code: `-- models/silver/s_orders.sql
MODEL (
  name silver.s_orders,
  kind INCREMENTAL_BY_TIME_RANGE (
    time_column event_date
  ),
  audits (
    NOT_NULL(columns := [order_id, customer_id]),
    ACCEPTED_RANGE(column := revenue, min_v := 0)
  )
);

SELECT
  order_id,
  customer_id,
  revenue,
  CAST(event_ts AS DATE) AS event_date
FROM bronze.raw_orders
WHERE event_ts >= @start_ds
  AND event_ts < @end_ds`,
    },
    featured: true,
  },
  {
    slug: "seller-analytics-platform",
    domain: "Global e-commerce",
    type: "Self-serve analytics platform",
    title: "Seller Analytics Self-Serve Platform, Amazon",
    summary:
      "Snowflake Gold layer aggregating 100M+ daily records across 10 marketplaces, backed by 100+ DAX measures for fully self-serve analysis.",
    problem:
      "Seller leadership across 10+ global marketplaces depended on analysts for every data request, and reports took days to produce.",
    action:
      "A unified Snowflake Gold layer and a Power BI semantic dataset with 100+ DAX measures, fed by automated SQL pipelines.",
    challenge:
      "Seller leadership across 10+ global marketplaces depended on analysts for every data request. Reports were stale and took days to produce. Decisions waited on people, not data.",
    built:
      "A unified Snowflake Gold layer aggregating 100M+ daily transaction records from 10 marketplaces. A Power BI semantic dataset with 100+ DAX measures. Automated SQL pipelines replacing manual extracts. Python predictive models surfacing revenue signals directly in the dashboard.",
    outcome:
      "Manual reporting effort cut 70%. Sales leadership moved to self-serve weekly reviews. $500K+ in revenue opportunities identified in the first year.",
    impact: [
      { value: "−70%", label: "Manual reporting effort" },
      { value: "$500K+", label: "Revenue opportunities, first year" },
      { value: "100M+", label: "Records a day" },
    ],
    contribution: ["Semantic modelling", "Pipeline automation", "Predictive models"],
    scope: ["10 marketplaces", "100M+ records a day", "100+ DAX measures"],
    stack: ["Power BI", "Snowflake", "Python", "SQL", "DAX", "Scikit-learn", "Azure"],
    flow: [
      { stage: "Sources", node: "10 marketplaces", detail: "Transaction data from 10 marketplaces" },
      { stage: "Ingestion", node: "SQL pipelines", detail: "Automated SQL pipelines replacing manual extracts" },
      { stage: "Warehouse", node: "Snowflake", detail: "Snowflake Gold layer, 100M+ records a day" },
      { stage: "Semantic model", node: "Semantic model", detail: "Power BI dataset, 100+ DAX measures" },
      { stage: "Analytics", node: "Python models", detail: "Python predictive models for revenue signals" },
      { stage: "Decision", node: "Weekly reviews", detail: "Seller leadership weekly business reviews", output: true },
    ],
    points: [
      "100M+ daily records aggregated across 10 global marketplaces into one Snowflake Gold layer.",
      "100+ DAX measures. Sales leadership slices data without waiting on an analyst.",
      "Automated SQL pipelines replaced 70% of manual reporting effort.",
      "$500K+ in revenue opportunities surfaced through Python predictive models.",
      "Adopted by seller leadership for weekly business reviews across all regional markets.",
    ],
    role: "Built at Amazon as Risk Data Analyst.",
    code: {
      lang: "dax",
      label: "DAX: revenue vs. prior period",
      code: `Revenue vs Prior Period =
VAR _current =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(
            'Date'[Date],
            LASTDATE('Date'[Date]),
            -1,
            MONTH
        )
    )
VAR _prior =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(
            'Date'[Date],
            LASTDATE('Date'[Date]),
            -2,
            MONTH
        ) -
        DATESINPERIOD(
            'Date'[Date],
            LASTDATE('Date'[Date]),
            -1,
            MONTH
        )
    )
RETURN
    DIVIDE(_current - _prior, _prior)`,
    },
    featured: true,
  },
  {
    slug: "manufacturing-analytics-suite",
    domain: "Manufacturing",
    type: "Enterprise BI",
    title: "Global Manufacturing Analytics Suite, Rockwool",
    summary:
      "ADF pipelines chained with dbt SCD Type 2 transforms and Power BI incremental refresh. Full ISO audit trail from source to report.",
    problem:
      "200+ factory-floor users across 15 markets worked from stale morning exports, and report refresh took 4 hours.",
    action:
      "Chained ADF pipelines, dbt transformations with SCD Type 2 history, and Power BI incremental refresh for yield, downtime and OEE.",
    challenge:
      "200+ factory-floor users across 15 markets worked from stale morning exports. Report refresh took 4 hours. KPI definitions conflicted between plant controllers and corporate finance. No audit trail existed for ISO compliance.",
    built:
      "Chained ADF pipelines, dbt transformations with SCD Type 2 history, and Power BI incremental refresh. Modeled production yield, downtime, and OEE metrics with full audit trails. SharePoint integration for file-based sources.",
    outcome:
      "Report refresh cut from 4 hours to 15 minutes, 94% faster. 200+ users moved from stale exports to live figures. KPI conflicts resolved. Full ISO audit trail in place.",
    impact: [
      { value: "4 hrs → 15 min", label: "Report refresh" },
      { value: "200+", label: "Users on live data" },
      { value: "15", label: "Markets" },
    ],
    contribution: ["Pipeline engineering", "Data modelling", "Power BI delivery"],
    scope: ["15 markets", "200+ users", "ISO audit trail"],
    stack: ["Power BI", "Snowflake", "dbt", "Azure Data Factory", "SharePoint", "DAX"],
    flow: [
      { stage: "Sources", node: "Production data", detail: "Production data and SharePoint file sources" },
      { stage: "Ingestion", node: "ADF", detail: "Chained Azure Data Factory pipelines" },
      { stage: "Transformation", node: "dbt", detail: "dbt models, SCD Type 2 history, audit trail" },
      { stage: "Warehouse", node: "Snowflake", detail: "Snowflake" },
      { stage: "Semantic model", node: "Power BI", detail: "Power BI, incremental refresh; yield, downtime, OEE" },
      { stage: "Decision", node: "200+ users", detail: "200+ factory-floor users in 15 markets", output: true },
    ],
    points: [
      "Report refresh: 4 hours to 15 minutes. 94% faster.",
      "200+ factory-floor users across 15 global markets on live data.",
      "dbt SCD Type 2 history. Full audit trail for ISO compliance.",
      "Resolved KPI conflicts between plant controllers and corporate finance.",
      "ADF, dbt, and Power BI incremental refresh chained in one pipeline.",
    ],
    featured: true,
  },
  {
    slug: "real-time-fraud-monitoring",
    domain: "Risk & compliance",
    type: "Real-time analytics",
    title: "Real-Time Fraud Monitoring Platform",
    summary:
      "Kafka event stream into Databricks Random Forest scoring, surfaced on a live Power BI dashboard with sub-5-min end-to-end latency.",
    problem:
      "Fraud detection ran on daily batch reports, so patterns surfaced only after losses had occurred.",
    action:
      "A Kafka streaming pipeline scored in Databricks and surfaced on a live Power BI dashboard for the risk team.",
    challenge:
      "Fraud detection ran on daily batch reports. By the time patterns surfaced, losses had occurred and intervention windows had closed.",
    built:
      "Kafka streaming pipeline processing transaction events in real time through Databricks anomaly detection, surfaced on a live Power BI dashboard with sub-5-minute refresh for the risk team.",
    outcome:
      "Detection latency cut from 24 hours to under 5 minutes. $1.2M+ in suspicious transactions flagged in the first 90 days of operation.",
    impact: [
      { value: "24 hrs → <5 min", label: "Detection latency" },
      { value: "$1.2M+", label: "Flagged in the first 90 days" },
      { value: "94%", label: "Detection precision" },
    ],
    contribution: ["Streaming pipeline", "Anomaly detection", "Real-time reporting"],
    scope: ["100K+ events an hour", "Sub-5-minute refresh"],
    stack: ["Apache Kafka", "Databricks", "PySpark", "Azure Event Hubs", "Power BI", "Python"],
    flow: [
      { stage: "Sources", node: "Events", detail: "Transaction events, 100K+ an hour" },
      { stage: "Streaming", node: "Kafka", detail: "Apache Kafka, Azure Event Hubs" },
      { stage: "Scoring", node: "Databricks ML", detail: "Databricks Random Forest anomaly detection, PySpark" },
      { stage: "Storage", node: "Delta", detail: "Delta table of fraud alerts" },
      { stage: "Reporting", node: "Power BI", detail: "Live Power BI dashboard, sub-5-minute refresh" },
      { stage: "Decision", node: "Risk team", detail: "Risk team intervention", output: true },
    ],
    points: [
      "100K+ transaction events per hour through the Kafka streaming pipeline.",
      "Anomaly detection at 94% precision, minimising false-positive alert fatigue.",
      "$1.2M+ flagged in first 90 days.",
      "Detection latency: 24 hours → under 5 minutes.",
      "Live Power BI dashboard with auto-refresh for real-time risk visibility.",
    ],
    code: {
      lang: "python",
      label: "PySpark: streaming anomaly score",
      code: `from pyspark.sql import functions as F
from pyspark.ml import PipelineModel

model = PipelineModel.load("/mnt/models/fraud_rf_v3")

stream = (
  spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", KAFKA_BROKERS)
    .option("subscribe", "txn-events")
    .load()
)

scored = model.transform(
  stream.select(F.from_json("value", TXN_SCHEMA).alias("t"))
        .select("t.*")
)

(
  scored
    .filter("prediction = 1.0")
    .select("txn_id", "amount", "probability", "event_ts")
    .writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", CHECKPOINT)
    .table("gold.fraud_alerts")
)`,
    },
    featured: true,
  },
  {
    slug: "sales-intelligence-platform",
    domain: "Sales intelligence",
    type: "Real-time analytics",
    title: "Real-Time Sales Intelligence Platform",
    summary:
      "Delta Live Tables pipeline with XGBoost forecasting under Unity Catalog governance, served via Power BI composite models on the Gold layer.",
    problem: "Eight regional markets were running on 6-hour-old sales data.",
    action:
      "A Databricks Delta Live Tables workflow with XGBoost forecasting, served through Power BI composite models.",
    challenge:
      "Eight regional markets were running on 6-hour-old sales data. Demand signals were stale by the time managers acted, leading to missed opportunities and reactive decisions.",
    built:
      "Databricks Delta Live Tables workflow processing 5M+ daily transactions through Bronze, Silver, and Gold layers with schema auto-evolution and DLT quality expectations. XGBoost forecasting models tracked via MLflow under Unity Catalog governance, surfaced via Power BI composite models on the Gold layer.",
    outcome:
      "Data latency dropped from 6 hours to under 10 minutes. Pipeline failures reduced 95%. Sales volume forecast accuracy improved 22%. Regional managers slice live figures without waiting on an analyst.",
    impact: [
      { value: "6 hrs → <10 min", label: "Data latency" },
      { value: "−95%", label: "Pipeline failures" },
      { value: "+22%", label: "Forecast accuracy" },
    ],
    contribution: ["Lakehouse pipelines", "Forecasting", "Composite models"],
    scope: ["8 regional markets", "5M+ transactions a day"],
    stack: ["Databricks", "Delta Live Tables", "MLflow", "Azure Data Factory", "PySpark", "Power BI", "ADLS Gen2"],
    flow: [
      { stage: "Sources", node: "Transactions", detail: "5M+ transactions a day" },
      { stage: "Ingestion", node: "ADF", detail: "Azure Data Factory, ADLS Gen2" },
      { stage: "Transformation", node: "Delta Live Tables", detail: "Delta Live Tables, Bronze → Silver → Gold" },
      { stage: "Forecasting", node: "XGBoost", detail: "XGBoost on MLflow, Unity Catalog governance" },
      { stage: "Semantic model", node: "Power BI", detail: "Power BI composite models on Gold" },
      { stage: "Decision", node: "8 markets", detail: "Regional managers in 8 markets", output: true },
    ],
    points: [
      "5M+ daily transactions processed through Bronze, Silver, and Gold Medallion layers.",
      "Schema auto-evolution and DLT quality expectations. 95% fewer pipeline failures.",
      "XGBoost forecasting models. Prediction accuracy improved 22%.",
      "Unity Catalog governance across all model artifacts and feature sets.",
      "Self-serve Power BI composite models. No analyst needed for regional data slicing.",
    ],
    featured: false,
  },
  {
    slug: "customer-churn-platform",
    domain: "Customer intelligence",
    type: "Data science",
    title: "Customer Segmentation & Churn Platform",
    summary:
      "Daily ML inference via Databricks ranking 2M+ customers by churn risk. Prioritised intervention list pushed directly to the CS team's Power BI workspace.",
    problem: "The customer success team only learned about churn after cancellations.",
    action:
      "An ML pipeline ranking 2M+ customers daily by churn risk, delivered into the CS team's Power BI workspace.",
    challenge:
      "The customer success team only learned about churn after cancellations. No early-warning system, no way to prioritise outreach, no data on who to save.",
    built:
      "End-to-end ML pipeline using Databricks and Snowflake ranking 2M+ customers daily by churn risk, delivering a prioritised intervention list directly into the CS team's Power BI workspace.",
    outcome:
      "Churn dropped 18% within 6 months, retaining approximately $300K in annual revenue. CS team shifted from reactive firefighting to proactive retention.",
    impact: [
      { value: "−18%", label: "Customer churn in 6 months" },
      { value: "≈$300K", label: "Annual revenue retained" },
      { value: "89%", label: "Recall on at-risk customers" },
    ],
    contribution: ["ML pipeline", "Feature store", "Power BI delivery"],
    scope: ["2M+ customers scored daily"],
    stack: ["Databricks", "Snowflake", "dbt", "MLflow", "Power BI", "Python"],
    flow: [
      { stage: "Sources", node: "CRM & billing", detail: "CRM, billing and usage data" },
      { stage: "Features", node: "Snowflake", detail: "Feature store in Snowflake" },
      { stage: "Models", node: "Databricks ML", detail: "Databricks ML, MLflow; daily inference on 2M+ customers" },
      { stage: "Delivery", node: "Power BI", detail: "Prioritised list in the CS team's Power BI workspace" },
      { stage: "Decision", node: "CS team", detail: "Customer success outreach", output: true },
    ],
    points: [
      "Feature store built in Snowflake from CRM, billing, and usage data.",
      "89% recall on at-risk customers without flooding the CS team with false positives.",
      "Daily ML inference across 2M+ customer records. Fully automated.",
      "Churn rate down 18% within 6 months.",
      "Manual forecasting effort reduced by 70%.",
    ],
    featured: false,
  },
];

export const getStudy = (slug: string) => caseStudies.find((s) => s.slug === slug);
