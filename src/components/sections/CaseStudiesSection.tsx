"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* ── SVG diagrams ─────────────────────────────────────────────────────────── */

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
        <text x="0" y="158" opacity="0.5">6 SOURCE SYSTEMS → ONELAKE → POWER BI</text>
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
        <text x="0" y="130" opacity="0.5">KAFKA → DATABRICKS ML → REAL-TIME ALERT</text>
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
        <text x="0" y="130" opacity="0.5">BRONZE → SILVER → GOLD · DELTA LIVE TABLES</text>
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
        <text x="0" y="115" opacity="0.5">REPORT REFRESH: 4 HRS → 15 MIN · 94% FASTER</text>
        <text x="0" y="140" opacity="0.65">dbt SCD Type 2 · ISO compliance · 15 markets</text>
      </g>
    </svg>
  );
}

function DiagramSelfServe() {
  const layers = [
    { label: "Sources", items: ["CRM", "Billing", "Usage"], y: 12 },
    { label: "Warehouse", items: ["Snowflake Gold"], y: 60 },
    { label: "Semantic", items: ["Power BI Dataset · 100+ measures"], y: 108 },
  ];
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Self-serve BI platform layers">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        {layers.map((l) => (
          <g key={l.label}>
            <text x="0" y={l.y} opacity="0.45">{l.label.toUpperCase()}</text>
            {l.items.map((item, i) => (
              <rect key={item} x={i * 115} y={l.y + 6} width="108" height="22"
                fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" rx="3" />
            ))}
            {l.items.map((item, i) => (
              <text key={`t-${item}`} x={i * 115 + 6} y={l.y + 22} fontSize="8.5">{item}</text>
            ))}
          </g>
        ))}
        <line x1="54" y1="82" x2="54" y2="106" stroke="var(--dgrm)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="54" y1="130" x2="54" y2="154" stroke="var(--dgrm)" strokeWidth="1" strokeDasharray="3 2" />
        <text x="0" y="160" opacity="0.65">100M+ daily records · 70% less manual work</text>
        <text x="255" y="162" fontSize="14" fontWeight="600" fill="var(--dgrm)">−70%</text>
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
        <text x="150" y="148" fontSize="22" fontWeight="600" fill="var(--dgrm)">−18%</text>
        <text x="230" y="146" opacity="0.5">≈ $300K retained</text>
      </g>
    </svg>
  );
}

/* ── Types & data ─────────────────────────────────────────────────────────── */

type Study = {
  id: string;
  num: string;
  domain: string;
  capability: string;
  title: string;
  challenge: string;
  built: string;
  outcome: string;
  stack: string[];
  Diagram: () => React.ReactElement;
  detailPoints: string[];
};

const studies: Study[] = [
  {
    id: "03", num: "01", domain: "Platform engineering",
    capability: "Architecture",
    title: "Enterprise Fabric Lakehouse Migration",
    challenge: "A legacy data warehouse was failing 12% of pipeline runs monthly. Six source systems had no unified schema, no lineage, and no quality gates.",
    built: "Phased migration to Microsoft Fabric with Medallion architecture (Bronze/Silver/Gold), 200+ SQLMesh transformation models, automated quality checks at each layer, and Power BI semantic models on top.",
    outcome: "Pipeline failures dropped from 12% to under 1%. Maintenance effort reduced by 90%. Legacy and new platform ran in parallel throughout validation. Zero downtime.",
    stack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI", "DAX"],
    Diagram: DiagramReliability,
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
    challenge: "Fraud detection ran on daily batch reports. By the time patterns surfaced, losses had occurred and intervention windows had closed.",
    built: "Kafka streaming pipeline processing transaction events in real time through Databricks anomaly detection, surfaced on a live Power BI dashboard with sub-5-minute refresh for the risk team.",
    outcome: "Detection latency cut from 24 hours to under 5 minutes. $1.2M+ in suspicious transactions flagged in the first 90 days of operation.",
    stack: ["Apache Kafka", "Databricks", "PySpark", "Azure Event Hubs", "Power BI", "Python"],
    Diagram: DiagramFraud,
    detailPoints: [
      "100K+ transaction events per hour through the Kafka streaming pipeline",
      "Anomaly detection at 94% precision, minimising false-positive alert fatigue",
      "$1.2M+ flagged in first 90 days",
      "Detection latency: 24 hours → under 5 minutes",
      "Live Power BI dashboard with auto-refresh for real-time risk visibility",
    ],
  },
  {
    id: "07", num: "03", domain: "Business intelligence",
    capability: "Self-Serve Analytics",
    title: "Seller Analytics Self-Serve Platform, Amazon",
    challenge: "Seller leadership across 10+ global marketplaces depended on analysts for every data request. Reports were stale and took days to produce. Decisions waited on people, not data.",
    built: "A unified Snowflake Gold layer aggregating 100M+ daily transaction records from 10 marketplaces. A Power BI semantic dataset with 100+ DAX measures. Automated SQL pipelines replacing manual extracts. Python predictive models surfacing revenue signals directly in the dashboard.",
    outcome: "Manual reporting effort cut 70%. Sales leadership moved to self-serve weekly reviews. $500K+ in revenue opportunities identified in the first year.",
    stack: ["Power BI", "Snowflake", "Python", "SQL", "DAX", "Scikit-learn", "Azure"],
    Diagram: DiagramSelfServe,
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
    challenge: "Eight regional markets were running on 6-hour-old sales data. Demand signals were stale by the time managers acted, leading to missed opportunities and reactive decisions.",
    built: "Databricks Delta Live Tables workflow processing 5M+ daily transactions through Bronze, Silver, and Gold layers with schema auto-evolution and DLT quality expectations. XGBoost forecasting models tracked via MLflow under Unity Catalog governance, surfaced via Power BI composite models on the Gold layer.",
    outcome: "Data latency dropped from 6 hours to under 10 minutes. Pipeline failures reduced 95%. Sales volume forecast accuracy improved 22%. Regional managers slice live figures without waiting on an analyst.",
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
    challenge: "200+ factory-floor users across 15 markets worked from stale morning exports. Report refresh took 4 hours. KPI definitions conflicted between plant controllers and corporate finance. No audit trail existed for ISO compliance.",
    built: "Chained ADF pipelines, dbt transformations with SCD Type 2 history, and Power BI incremental refresh. Modeled production yield, downtime, and OEE metrics with full audit trails. SharePoint integration for file-based sources.",
    outcome: "Report refresh cut from 4 hours to 15 minutes, 94% faster. 200+ users moved from stale exports to live figures. KPI conflicts resolved. Full ISO audit trail in place.",
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
    challenge: "The customer success team only learned about churn after cancellations. No early-warning system, no way to prioritise outreach, no data on who to save.",
    built: "End-to-end ML pipeline using Databricks and Snowflake ranking 2M+ customers daily by churn risk, delivering a prioritised intervention list directly into the CS team's Power BI workspace.",
    outcome: "Churn dropped 18% within 6 months, retaining approximately $300K in annual revenue. CS team shifted from reactive firefighting to proactive retention.",
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

/* ── Modal ────────────────────────────────────────────────────────────────── */

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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          className="relative panel rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
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

/* ── Card ─────────────────────────────────────────────────────────────────── */

function StudyCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article {...reveal()} className="panel panel-lift rounded-2xl overflow-hidden flex flex-col">
      <div className="border-b border-border p-[clamp(1.25rem,2vw,2rem)] text-foreground bg-background">
        <study.Diagram />
      </div>
      <div className="p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] accent-text">CASE {study.num}</span>
          <span className="eyebrow">{study.domain}</span>
          <span
            className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: "color-mix(in srgb, var(--primary) 10%, var(--card))",
              color: "var(--primary)",
              border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
          >
            {study.capability}
          </span>
        </div>
        <h3 className="text-[clamp(1rem,0.95rem+0.4vw,1.2rem)] font-semibold leading-snug mb-3 max-w-[28ch]">
          {study.title}
        </h3>
        <div
          className="panel rounded-xl px-4 py-3 mb-4 flex-1"
          style={{ borderLeft: "3px solid var(--primary)" }}
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">Outcome</p>
          <p className="text-sm leading-relaxed font-medium">{study.outcome}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.stack.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground"
              style={{ background: "color-mix(in srgb, var(--primary) 7%, var(--card))", border: "1px solid var(--border)" }}>
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={onOpen}
          className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          View case study <ArrowUpRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */

export function CaseStudiesSection() {
  const [openStudy, setOpenStudy] = useState<Study | null>(null);

  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Flagship work</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[18ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Featured projects
        </motion.h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {studies.map((study) => (
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
