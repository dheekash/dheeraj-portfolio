"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { onSpotlightMove } from "@/components/common/spotlight";
import { onTiltMove, onTiltLeave } from "@/components/common/tilt";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* â"€â"€ SVG diagrams â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

function DiagramReliability() {
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Pipeline failure rate falling from 12% to under 1%">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">MONTHLY PIPELINE FAILURE RATE</text>
        <path d="M 30 26 V 126 H 340" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
        <text x="0" y="34" opacity="0.6">12%</text>
        <text x="10" y="124" opacity="0.6">1%</text>
        <path d="M 35 32 L 60 38 L 85 30 L 110 40 L 135 34 L 165 54 L 200 82 L 240 108 L 290 118 L 338 120"
          stroke="var(--dgrm)" strokeWidth="1.6" fill="none" />
        {[{ x: 150, l: "BRONZE" }, { x: 215, l: "SILVER" }, { x: 280, l: "GOLD" }].map((p) => (
          <g key={p.l}>
            <line x1={p.x} y1="26" x2={p.x} y2="126" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
            <text x={p.x} y="140" textAnchor="middle" opacity="0.6">{p.l}</text>
          </g>
        ))}
        <text x="0" y="158" opacity="0.5">6 SOURCE SYSTEMS â†' ONELAKE â†' POWER BI</text>
      </g>
    </svg>
  );
}

function DiagramFraud() {
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Fraud detection latency cut from 24 hours to under 5 minutes">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">FRAUD DETECTION LATENCY</text>
        <text x="0" y="54" opacity="0.65">before</text>
        <rect x="56" y="42" width="285" height="16" fill="currentColor" opacity="0.12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <text x="347" y="53" textAnchor="end" opacity="0.65">24 hrs</text>
        <text x="0" y="92" opacity="0.65">after</text>
        <rect x="56" y="80" width="6" height="16" fill="var(--dgrm)" />
        <text x="68" y="91" fill="var(--dgrm)">&lt;5 min</text>
        <path d="M 0 112 H 348" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 5" />
        <text x="0" y="130" opacity="0.5">KAFKA â†' DATABRICKS ML â†' REAL-TIME ALERT</text>
        <text x="0" y="150" fill="var(--dgrm)">$1.2M+ flagged · first 90 days</text>
      </g>
    </svg>
  );
}

function DiagramSales() {
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Data latency reduced from 6 hours to under 10 minutes">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">DATA LATENCY · 8 REGIONAL MARKETS</text>
        <text x="0" y="54" opacity="0.65">before</text>
        <rect x="56" y="42" width="285" height="16" fill="currentColor" opacity="0.12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <text x="347" y="53" textAnchor="end" opacity="0.65">6 hrs</text>
        <text x="0" y="92" opacity="0.65">after</text>
        <rect x="56" y="80" width="8" height="16" fill="var(--dgrm)" />
        <text x="70" y="91" fill="var(--dgrm)">&lt;10 min</text>
        <path d="M 0 112 H 348" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 5" />
        <text x="0" y="130" opacity="0.5">BRONZE â†' SILVER â†' GOLD · DELTA LIVE TABLES</text>
        <text x="0" y="150" fill="var(--dgrm)">5M+ daily transactions · 95% fewer pipeline failures</text>
      </g>
    </svg>
  );
}

function DiagramManufacturing() {
  const bars = [72, 68, 74, 71, 78, 80, 83, 85, 87, 89, 91, 92];
  const maxH = 60;
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="OEE improvement across 15 markets">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">OEE TREND · 200+ FACTORY-FLOOR USERS</text>
        {bars.map((v, i) => {
          const h = (v / 100) * maxH;
          const x = 10 + i * 28;
          const isNew = i >= 8;
          return (
            <g key={i}>
              <rect x={x} y={95 - h} width="18" height={h}
                fill={isNew ? "var(--dgrm)" : "currentColor"} opacity={isNew ? 0.9 : 0.2} />
              {i === 7 && <line x1={x + 20} y1="28" x2={x + 20} y2="100" stroke="var(--dgrm)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />}
            </g>
          );
        })}
        <text x="238" y="22" fill="var(--dgrm)" fontSize="8">ADF+dbt deployed</text>
        <path d="M 230 26 L 238 22" stroke="var(--dgrm)" strokeWidth="1" />
        <text x="0" y="115" opacity="0.5">REPORT REFRESH: 4 HRS â†' 15 MIN · 94% FASTER</text>
        <text x="0" y="140" opacity="0.65">dbt SCD Type 2 · ISO compliance · 15 markets</text>
      </g>
    </svg>
  );
}

function DiagramSelfServe() {
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Self-serve BI platform layers">
      <g fontFamily="var(--font-mono)" fontSize="8.5" fill="currentColor">
        {/* Sources row â€" y=0..28 */}
        <text x="0" y="10" opacity="0.45" fontSize="7.5">SOURCES</text>
        <rect x="0"   y="14" width="90" height="18" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" rx="3" />
        <rect x="96"  y="14" width="90" height="18" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" rx="3" />
        <rect x="192" y="14" width="90" height="18" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" rx="3" />
        <text x="6"   y="27">CRM</text>
        <text x="102" y="27">Billing</text>
        <text x="198" y="27">Usage</text>

        {/* Arrow */}
        <line x1="45" y1="32" x2="45" y2="44" stroke="var(--dgrm)" strokeWidth="1" strokeDasharray="3 2" />

        {/* Warehouse row â€" y=44..68 */}
        <text x="0" y="54" opacity="0.45" fontSize="7.5">WAREHOUSE</text>
        <rect x="0" y="58" width="175" height="18" fill="none" stroke="var(--dgrm)" strokeOpacity="0.4" strokeWidth="1" rx="3" />
        <text x="6" y="71">Snowflake Gold</text>

        {/* Arrow */}
        <line x1="45" y1="76" x2="45" y2="88" stroke="var(--dgrm)" strokeWidth="1" strokeDasharray="3 2" />

        {/* Semantic row â€" y=88..112 */}
        <text x="0" y="98" opacity="0.45" fontSize="7.5">SEMANTIC MODEL</text>
        <rect x="0" y="102" width="230" height="18" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" rx="3" />
        <text x="6" y="115">Power BI Dataset · 100+ measures</text>

        {/* Stat row â€" y=128..170 */}
        <text x="0" y="140" opacity="0.55" fontSize="8">100M+ daily records</text>
        <text x="0" y="155" fontSize="13" fontWeight="600" fill="var(--dgrm)">âˆ'70%</text>
        <text x="32" y="155" opacity="0.55" fontSize="8"> manual work</text>
      </g>
    </svg>
  );
}

function DiagramChurn() {
  const cells = Array.from({ length: 40 });
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="2M customers ranked by churn risk">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">2M CUSTOMERS, RANKED BY CHURN RISK</text>
        {cells.map((_, i) => {
          const x = (i % 20) * 17.5;
          const y = 28 + Math.floor(i / 20) * 26;
          const hot = i < 5 || (i >= 20 && i < 23);
          return (
            <rect key={i} x={x} y={y} width="13" height="18"
              fill={hot ? "var(--dgrm)" : "none"}
              stroke="currentColor" strokeOpacity={hot ? 0 : 0.35} strokeWidth="1" />
          );
        })}
        <path d="M 4 90 V 98 H 60 V 90" stroke="var(--dgrm)" strokeWidth="1.2" fill="none" />
        <text x="4" y="112" fill="var(--dgrm)">daily outreach list · 89% recall</text>
        <text x="0" y="146" opacity="0.65">churn, 6 months later:</text>
        <text x="150" y="148" fontSize="22" fontWeight="600" fill="var(--dgrm)">âˆ'18%</text>
        <text x="230" y="146" opacity="0.5">â‰ˆ $300K retained</text>
      </g>
    </svg>
  );
}

/* â"€â"€ Types & data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

type Study = {
  id: string;
  num: string;
  domain: string;
  capability: string;
  title: string;
  how: string;
  challenge: string;
  built: string;
  outcome: string;
  keyMetric: { value: string; label: string; color: string };
  stack: string[];
  Diagram: () => React.ReactElement;
  detailPoints: string[];
  codeSnippet?: { lang: string; label: string; code: string };
};

const studies: Study[] = [
  {
    id: "03", num: "01", domain: "Platform engineering",
    capability: "Architecture",
    title: "Enterprise Fabric Lakehouse Migration",
    how: "Phased Medallion migration across 6 source systems. 200+ SQLMesh models with automated quality gates. Zero downtime.",
    challenge: "A legacy data warehouse was failing 12% of pipeline runs monthly. Six source systems had no unified schema, no lineage, and no quality gates.",
    built: "Phased migration to Microsoft Fabric with Medallion architecture (Bronze/Silver/Gold), 200+ SQLMesh transformation models, automated quality checks at each layer, and Power BI semantic models on top.",
    outcome: "Pipeline failures dropped from 12% to under 1%. Maintenance effort reduced by 90%. Legacy and new platform ran in parallel throughout validation. Zero downtime.",
    keyMetric: { value: "12% → <1%", label: "pipeline failure rate", color: "16,185,129" },
    stack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI", "DAX"],
    Diagram: DiagramReliability,
    codeSnippet: {
      lang: "sql",
      label: "SQLMesh — Silver quality gate",
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
    detailPoints: [
      "5+ years of historical data migrated with zero data loss.",
      "200+ legacy SQL transformations rebuilt as tested SQLMesh models.",
      "Automated quality gates at Bronze, Silver, and Gold Medallion layers.",
      "Pipeline failure rate: 12% to under 1%.",
      "Compute costs reduced 15% through Fabric capacity tuning.",
    ],
  },
  {
    id: "05", num: "02", domain: "Risk & compliance",
    capability: "Real-time Analytics",
    title: "Real-Time Fraud Monitoring Platform",
    how: "Kafka event stream into Databricks Random Forest scoring, surfaced on a live Power BI dashboard with sub-5-min end-to-end latency.",
    challenge: "Fraud detection ran on daily batch reports. By the time patterns surfaced, losses had occurred and intervention windows had closed.",
    built: "Kafka streaming pipeline processing transaction events in real time through Databricks anomaly detection, surfaced on a live Power BI dashboard with sub-5-minute refresh for the risk team.",
    outcome: "Detection latency cut from 24 hours to under 5 minutes. $1.2M+ in suspicious transactions flagged in the first 90 days of operation.",
    keyMetric: { value: "$1.2M+", label: "flagged in 90 days", color: "239,68,68" },
    stack: ["Apache Kafka", "Databricks", "PySpark", "Azure Event Hubs", "Power BI", "Python"],
    Diagram: DiagramFraud,
    codeSnippet: {
      lang: "python",
      label: "PySpark — Streaming anomaly score",
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
    detailPoints: [
      "100K+ transaction events per hour through the Kafka streaming pipeline",
      "Anomaly detection at 94% precision, minimising false-positive alert fatigue",
      "$1.2M+ flagged in first 90 days",
      "Detection latency: 24 hours â†' under 5 minutes",
      "Live Power BI dashboard with auto-refresh for real-time risk visibility",
    ],
  },
  {
    id: "07", num: "03", domain: "Business intelligence",
    capability: "Self-Serve Analytics",
    title: "Seller Analytics Self-Serve Platform, Amazon",
    how: "Snowflake Gold layer aggregating 100M+ daily records across 10 marketplaces, backed by 100+ DAX measures for fully self-serve analysis.",
    challenge: "Seller leadership across 10+ global marketplaces depended on analysts for every data request. Reports were stale and took days to produce. Decisions waited on people, not data.",
    built: "A unified Snowflake Gold layer aggregating 100M+ daily transaction records from 10 marketplaces. A Power BI semantic dataset with 100+ DAX measures. Automated SQL pipelines replacing manual extracts. Python predictive models surfacing revenue signals directly in the dashboard.",
    outcome: "Manual reporting effort cut 70%. Sales leadership moved to self-serve weekly reviews. $500K+ in revenue opportunities identified in the first year.",
    keyMetric: { value: "−70%", label: "manual reporting effort", color: "16,185,129" },
    stack: ["Power BI", "Snowflake", "Python", "SQL", "DAX", "Scikit-learn", "Azure"],
    Diagram: DiagramSelfServe,
    codeSnippet: {
      lang: "dax",
      label: "DAX — Revenue vs. Prior Period",
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
    detailPoints: [
      "100M+ daily records aggregated across 10 global marketplaces into one Snowflake Gold layer.",
      "100+ DAX measures. Sales leadership slices data without waiting on an analyst.",
      "Automated SQL pipelines replaced 70% of manual reporting effort.",
      "$500K+ in revenue opportunities surfaced through Python predictive models.",
      "Adopted by seller leadership for weekly business reviews across all regional markets.",
    ],
  },
  {
    id: "04", num: "04", domain: "Sales intelligence",
    capability: "Real-Time Analytics",
    title: "Real-Time Sales Intelligence Platform",
    how: "Delta Live Tables pipeline with XGBoost forecasting under Unity Catalog governance, served via Power BI composite models on the Gold layer.",
    challenge: "Eight regional markets were running on 6-hour-old sales data. Demand signals were stale by the time managers acted, leading to missed opportunities and reactive decisions.",
    built: "Databricks Delta Live Tables workflow processing 5M+ daily transactions through Bronze, Silver, and Gold layers with schema auto-evolution and DLT quality expectations. XGBoost forecasting models tracked via MLflow under Unity Catalog governance, surfaced via Power BI composite models on the Gold layer.",
    outcome: "Data latency dropped from 6 hours to under 10 minutes. Pipeline failures reduced 95%. Sales volume forecast accuracy improved 22%. Regional managers slice live figures without waiting on an analyst.",
    keyMetric: { value: "6 hrs → 10 min", label: "data latency", color: "37,99,235" },
    stack: ["Databricks", "Delta Live Tables", "MLflow", "Azure Data Factory", "PySpark", "Power BI", "ADLS Gen2"],
    Diagram: DiagramSales,
    detailPoints: [
      "5M+ daily transactions processed through Bronze, Silver, and Gold Medallion layers.",
      "Schema auto-evolution and DLT quality expectations. 95% fewer pipeline failures.",
      "XGBoost forecasting models. Prediction accuracy improved 22%.",
      "Unity Catalog governance across all model artifacts and feature sets.",
      "Self-serve Power BI composite models. No analyst needed for regional data slicing.",
    ],
  },
  {
    id: "06", num: "05", domain: "Manufacturing analytics",
    capability: "Enterprise BI",
    title: "Global Manufacturing Analytics Suite, Rockwool",
    how: "ADF pipelines chained with dbt SCD Type 2 transforms and Power BI incremental refresh. Full ISO audit trail from source to report.",
    challenge: "200+ factory-floor users across 15 markets worked from stale morning exports. Report refresh took 4 hours. KPI definitions conflicted between plant controllers and corporate finance. No audit trail existed for ISO compliance.",
    built: "Chained ADF pipelines, dbt transformations with SCD Type 2 history, and Power BI incremental refresh. Modeled production yield, downtime, and OEE metrics with full audit trails. SharePoint integration for file-based sources.",
    outcome: "Report refresh cut from 4 hours to 15 minutes, 94% faster. 200+ users moved from stale exports to live figures. KPI conflicts resolved. Full ISO audit trail in place.",
    keyMetric: { value: "94%", label: "faster report refresh", color: "16,185,129" },
    stack: ["Power BI", "Snowflake", "dbt", "Azure Data Factory", "SharePoint", "DAX"],
    Diagram: DiagramManufacturing,
    detailPoints: [
      "Report refresh: 4 hours to 15 minutes. 94% faster.",
      "200+ factory-floor users across 15 global markets on live data.",
      "dbt SCD Type 2 history. Full audit trail for ISO compliance.",
      "Resolved KPI conflicts between plant controllers and corporate finance.",
      "ADF, dbt, and Power BI incremental refresh chained in one pipeline.",
    ],
  },
  {
    id: "02", num: "06", domain: "Customer intelligence",
    capability: "Data Science",
    title: "Customer Segmentation & Churn Platform",
    how: "Daily ML inference via Databricks ranking 2M+ customers by churn risk. Prioritised intervention list pushed directly to the CS team's Power BI workspace.",
    challenge: "The customer success team only learned about churn after cancellations. No early-warning system, no way to prioritise outreach, no data on who to save.",
    built: "End-to-end ML pipeline using Databricks and Snowflake ranking 2M+ customers daily by churn risk, delivering a prioritised intervention list directly into the CS team's Power BI workspace.",
    outcome: "Churn dropped 18% within 6 months, retaining approximately $300K in annual revenue. CS team shifted from reactive firefighting to proactive retention.",
    keyMetric: { value: "−18%", label: "customer churn", color: "239,68,68" },
    stack: ["Databricks", "Snowflake", "dbt", "MLflow", "Power BI", "Python"],
    Diagram: DiagramChurn,
    detailPoints: [
      "Feature store built in Snowflake from CRM, billing, and usage data.",
      "89% recall on at-risk customers without flooding the CS team with false positives.",
      "Daily ML inference across 2M+ customer records. Fully automated.",
      "Churn rate down 18% within 6 months.",
      "Manual forecasting effort reduced by 70%.",
    ],
  },
];

/* â"€â"€ Code snippet block â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

type Snippet = { lang: string; label: string; code: string };
function CodeBlock({ snippet }: { snippet: Snippet }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors"
        style={{ background: "color-mix(in srgb, var(--card) 80%, var(--muted))" }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="text-[9px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 rounded"
            style={{
              background: "color-mix(in srgb, var(--primary) 12%, transparent)",
              color: "var(--primary)",
              border: "1px solid color-mix(in srgb, var(--primary) 22%, transparent)",
            }}
          >
            {snippet.lang}
          </span>
          <span className="text-[12px] font-mono text-muted-foreground">{snippet.label}</span>
        </div>
        {open ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      {open && (
        <pre
          className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto"
          style={{ background: "color-mix(in srgb, var(--card) 50%, var(--background))", color: "var(--foreground)" }}
        >
          <code>{snippet.code}</code>
        </pre>
      )}
    </div>
  );
}

/* â"€â"€ Modal â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

function StudyModal({ study, onClose }: { study: Study; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <motion.div
          className="relative panel glow-border rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-[clamp(1.5rem,3vw,2.5rem)]">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="eyebrow">{study.domain}</p>
                  <span className="text-[10px] font-mono text-muted-foreground/50">·</span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] accent-text">{study.capability}</p>
                </div>
                <h3 className="text-xl font-semibold leading-tight">{study.title}</h3>
              </div>
              <button onClick={onClose} aria-label="Close"
                className="flex-shrink-0 w-9 h-9 rounded-full panel flex items-center justify-center hover:border-primary/30 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="panel rounded-2xl p-5 text-foreground mb-6">
              <study.Diagram />
            </div>
            <div className="space-y-5 mb-6">
              <div>
                <p className="eyebrow mb-2">The challenge</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">What I built</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{study.built}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Business outcome</p>
                <p className="text-sm leading-relaxed text-foreground font-medium">{study.outcome}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="eyebrow mb-3">Key results</p>
              <ul className="space-y-2">
                {study.detailPoints.map((pt) => (
                  <li key={pt} className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l-2 border-primary/50">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            {study.codeSnippet && (
              <div className="mb-6">
                <p className="eyebrow mb-3">Code pattern</p>
                <CodeBlock snippet={study.codeSnippet} />
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {study.stack.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium panel text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* â"€â"€ Card â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

/* Brand colors for tech chips — recognizable vendor tints on glass */
const CHIP_COLORS: Record<string, string> = {
  "Microsoft Fabric": "#A78BFA",
  "Power BI": "#F59E0B",
  Snowflake: "#60A5FA",
  Databricks: "#FF5A3C",
  PySpark: "#FF5A3C",
  "Delta Lake": "#FF5A3C",
  OneLake: "#A78BFA",
  SQLMesh: "#34D399",
  "Apache Kafka": "#EC4899",
  Python: "#F59E0B",
  DAX: "#F59E0B",
  Azure: "#00A4EF",
  "Azure Event Hubs": "#00A4EF",
  SQL: "#B0B8C5",
  "Scikit-learn": "#F59E0B",
};

function StudyCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal()}
      onPointerMove={(e) => { onSpotlightMove(e); onTiltMove(e); }}
      onPointerLeave={onTiltLeave}
      className="spotlight gradient-frame overflow-hidden group grid lg:grid-cols-[0.9fr_1.1fr]"
      style={{ willChange: "transform" }}
    >
      {/* Left — animated data-flow visual (the project's own diagram) */}
      <div className="relative p-[clamp(1.25rem,2vw,2rem)] flex items-center border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
        {/* Role pill — top-left, neon border */}
        <span
          className="absolute top-4 left-4 z-10 text-[10px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
          style={{
            color: "var(--cyan)",
            border: "1px solid rgba(96, 165, 250, 0.5)",
            background: "rgba(96, 165, 250, 0.08)",
            boxShadow: "0 0 12px rgba(96, 165, 250, 0.25)",
          }}
        >
          {study.capability}
        </span>
        <div className="w-full pt-8 text-foreground opacity-90 transition-opacity duration-300 group-hover:opacity-100">
          <study.Diagram />
        </div>
      </div>

      {/* Right — case narrative */}
      <div className="p-[clamp(1.35rem,2vw,2rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px]" style={{ color: "var(--cyan)" }}>CASE {study.num}</span>
          <span className="eyebrow">{study.domain}</span>
        </div>

        {/* Impact metric — the card hero */}
        <div className="mb-4">
          <span
            className="block tabular-nums leading-none text-gradient"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.6rem, 1.6rem + 2.6vw, 4rem)" }}
          >
            {study.keyMetric.value}
          </span>
          <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{study.keyMetric.label}</span>
        </div>

        {/* Project name */}
        <h3 className="text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] font-semibold leading-snug mb-2">
          {study.title}
        </h3>

        {/* One-line description */}
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-4 flex-1">{study.how}</p>

        {/* Tech stack — brand-tinted chip pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {study.stack.slice(0, 5).map((t) => {
            const c = CHIP_COLORS[t] ?? "#B0B8C5";
            return (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                style={{ color: c, background: `color-mix(in srgb, ${c} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)` }}
              >
                {t}
              </span>
            );
          })}
        </div>

        {/* CTA — glowing arrow button */}
        <button
          onClick={onOpen}
          className="gradient-btn group/btn self-start inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          View case study
          <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* â"€â"€ Section â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */

export function CaseStudiesSection() {
  const [openStudy, setOpenStudy] = useState<Study | null>(null);

  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Flagship work</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[18ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Featured projects
        </motion.h2>

        <div className="flex flex-col gap-8">
          {studies.slice(0, 3).map((study) => (
            <StudyCard key={study.id} study={study} onOpen={() => setOpenStudy(study)} />
          ))}
        </div>
      </div>

      {openStudy && (
        <StudyModal study={openStudy} onClose={() => setOpenStudy(null)} />
      )}
    </section>
  );
}

