"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronDown } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* ── SVG diagrams ────────────────────────────────────────────────────────── */

function DiagramLatency() {
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label="Reporting latency reduced from 6 hours to under 10 minutes">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">REPORTING LATENCY</text>
        <text x="0" y="48" opacity="0.65">before</text>
        <rect x="52" y="38" width="280" height="14" fill="currentColor" opacity="0.10" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <text x="338" y="49" textAnchor="end" opacity="0.65">6 hrs</text>
        <text x="0" y="86" opacity="0.65">after</text>
        <rect x="52" y="76" width="13" height="14" fill="var(--dgrm)" />
        <text x="72" y="87" fill="var(--dgrm)">&lt;10 min</text>
        <text x="0" y="124" opacity="0.5">12 SOURCES → STREAM → 8 MARKETS</text>
        <path d="M 0 138 H 332" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 5" />
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
        <text x="0" y="130" opacity="0.5">KAFKA EVENTS → DATABRICKS ML → REAL-TIME ALERT</text>
        <text x="0" y="150" fill="var(--dgrm)">$1.2M+ flagged · first 90 days</text>
      </g>
    </svg>
  );
}

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
        <text x="0" y="158" opacity="0.5">SIX SOURCE SYSTEMS → ONELAKE</text>
      </g>
    </svg>
  );
}

function DiagramFileFlow() {
  const stages = ["Mailbox", "Validator", "Router", "Blob", "SQL"];
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label="Automated file pipeline from vendor mailbox to SQL">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">500+ DAILY FILES · 15 VENDORS · ZERO MANUAL STEPS</text>
        {stages.map((label, i) => {
          const x = 10 + i * 70;
          const isEnd = i === stages.length - 1;
          return (
            <g key={label}>
              <rect x={x} y="40" width="52" height="28" rx="4"
                fill={isEnd ? "var(--dgrm)" : "none"}
                stroke={isEnd ? "var(--dgrm)" : "currentColor"}
                strokeOpacity={isEnd ? 1 : 0.45} strokeWidth="1" />
              <text x={x + 26} y="57" textAnchor="middle"
                fill={isEnd ? "var(--background)" : "currentColor"} opacity={isEnd ? 1 : 0.7} fontSize="8">
                {label}
              </text>
              {i < stages.length - 1 && (
                <path d={`M ${x + 52} 54 L ${x + 66} 54`}
                  stroke="var(--dgrm)" strokeWidth="1.2" markerEnd="url(#arr2)" opacity="0.7" />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--dgrm)" opacity="0.7" />
          </marker>
        </defs>
        <text x="0" y="108" opacity="0.65">before: 3 hrs/day manual processing</text>
        <text x="0" y="124" fill="var(--dgrm)">after: 99.8% automated · &lt;5 min per batch</text>
      </g>
    </svg>
  );
}

function DiagramMRR() {
  const sources = ["Stripe", "Chargebee", "Zuora", "Recurly", "Paddle", "Maxio", "Braintree", "Custom"];
  return (
    <svg viewBox="0 0 360 165" className="w-full h-auto" role="img" aria-label="8 billing sources unified into one MRR model">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">8 BILLING SOURCES → ONE VERIFIED MRR MODEL</text>
        {sources.map((s, i) => {
          const row = Math.floor(i / 4); const col = i % 4;
          const x = col * 84; const y = 24 + row * 28;
          return (
            <g key={s}>
              <rect x={x} y={y} width="74" height="18" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
              <text x={x + 37} y={y + 12} textAnchor="middle" opacity="0.65">{s}</text>
              <path d={`M ${x + 37} ${y + 18} L 180 100`} stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.8" />
            </g>
          );
        })}
        <circle cx="180" cy="110" r="16" fill="var(--dgrm)" opacity="0.9" />
        <text x="180" y="113" textAnchor="middle" fill="var(--background)" fontSize="8">dbt</text>
        <text x="0" y="145" opacity="0.65">close: 4 days</text>
        <text x="80" y="145" fill="var(--dgrm)">→ 2 hours</text>
        <text x="0" y="160" opacity="0.4">zero reconciliation errors since launch</text>
      </g>
    </svg>
  );
}

/* ── Types & data ────────────────────────────────────────────────────────── */

type Study = {
  id: string;
  num: string;
  domain: string;
  title: string;
  challenge: string;
  built: string;
  outcome: string;
  stack: string[];
  Diagram: () => React.ReactElement;
  detailPoints: string[];
};

const allStudies: Study[] = [
  {
    id: "01", num: "01", domain: "Revenue intelligence",
    title: "Real-Time Sales Intelligence Platform",
    challenge: "Sales teams were making decisions on 6-hour-old data. By the time batch reports arrived, inventory gaps had already cost revenue.",
    built: "A Databricks streaming pipeline processing 5M+ daily transactions across 8 markets, feeding Power BI DirectQuery dashboards with near-real-time visibility.",
    outcome: "Reporting time down from 6 hours to under 10 minutes, saving ~$90K/yr in analyst hours and enabling same-day decisions across 8 regional markets.",
    stack: ["Databricks", "Azure Data Factory", "PySpark", "Delta Live Tables", "Power BI"],
    Diagram: DiagramLatency,
    detailPoints: [
      "Medallion pipeline (Bronze → Silver → Gold) with automated quality monitoring",
      "Schema evolution handled across 12 heterogeneous source systems",
      "Sub-10-minute SLA with full audit trail and data lineage",
      "Pipeline failures reduced by 95% vs. legacy batch approach",
      "Forecast accuracy improved 22% through intraday signal availability",
    ],
  },
  {
    id: "02", num: "02", domain: "Customer retention",
    title: "Customer Segmentation Platform",
    challenge: "The customer success team only learned about churn after cancellations happened. No early-warning system, no way to intervene.",
    built: "End-to-end ML pipeline using Databricks and Snowflake ranking 2M+ customers by churn risk daily, delivering a prioritised intervention list to the CS team.",
    outcome: "Churn dropped 18% within 6 months, retaining approximately $300K in annual revenue. CS team shifted from reactive to proactive.",
    stack: ["Databricks", "Snowflake", "dbt", "MLflow", "Power BI", "Python"],
    Diagram: DiagramChurn,
    detailPoints: [
      "Feature store built in Snowflake from fragmented CRM, billing, and usage data",
      "89% recall on at-risk customers without overwhelming CS team capacity",
      "Daily inference across 2M+ records — fully automated",
      "ML predictions surfaced in Power BI without exposing model complexity",
      "Manual forecasting effort reduced by 70%",
    ],
  },
  {
    id: "05", num: "05", domain: "Risk and compliance",
    title: "Real-Time Fraud Monitoring Platform",
    challenge: "Fraud detection ran on daily batch reports. By the time patterns were flagged, losses had already occurred and intervention windows had closed.",
    built: "Kafka streaming pipeline processing transaction events in real time, feeding a Databricks anomaly detection model and a live Power BI dashboard for the risk team.",
    outcome: "Detection latency cut from 24 hours to under 5 minutes. Over $1.2M in suspicious transactions flagged in the first 90 days.",
    stack: ["Apache Kafka", "Databricks", "PySpark", "Azure Event Hubs", "Power BI", "Python"],
    Diagram: DiagramFraud,
    detailPoints: [
      "Detection latency: 24 hours → under 5 minutes",
      "100K+ transaction events per hour through the Kafka pipeline",
      "Anomaly detection at 94% precision, minimising false-positive workload",
      "$1.2M+ in suspicious transactions surfaced in first 90 days",
      "Live Power BI dashboard with auto-refresh for real-time risk visibility",
    ],
  },
];

const compactStudies: Study[] = [
  {
    id: "03", num: "03", domain: "Platform modernisation",
    title: "Enterprise Fabric Lakehouse Migration",
    challenge: "Legacy data warehouse failing 12% of pipeline runs monthly.",
    built: "Phased migration to Microsoft Fabric with Medallion architecture and 200+ SQLMesh models.",
    outcome: "Failures from 12% to under 1%. Maintenance effort fell 90%.",
    stack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI"],
    Diagram: DiagramReliability,
    detailPoints: [
      "5+ years of historical data migrated with zero data loss",
      "200+ legacy SQL transformations re-engineered into tested SQLMesh models",
      "Zero downtime: legacy and new platform ran in parallel through validation",
      "Compute costs reduced 15% through Fabric capacity optimisation",
      "Automated testing and data quality gates at each Medallion layer",
    ],
  },
  {
    id: "04", num: "04", domain: "Process automation",
    title: "Automated File Ingestion Pipeline",
    challenge: "Finance manually processed 500+ daily files from 15 vendors — 3 hours every morning before any analysis could begin.",
    built: "Python + Azure Logic Apps pipeline monitoring mailboxes, validating schemas, routing to storage, and triggering SQL processing automatically.",
    outcome: "3 hours of daily manual work eliminated. 99.8% processing accuracy. Finance now works on analysis, not file-wrangling.",
    stack: ["Python", "Azure Logic Apps", "Azure Blob Storage", "Power Automate", "SQL"],
    Diagram: DiagramFileFlow,
    detailPoints: [
      "3 hours daily file-handling eliminated across a 5-person finance team",
      "Schema validation layer catches malformed files before reaching the database",
      "99.8% accuracy vs. ~96% manual accuracy",
      "End-of-month close prep time reduced by 60%",
      "Same-day vendor data availability instead of next-day manual processing",
    ],
  },
  {
    id: "06", num: "06", domain: "Revenue analytics",
    title: "Unified MRR Reporting Pipeline",
    challenge: "Finance calculated MRR manually from 8 disconnected billing systems. A 4-day close with frequent reconciliation errors.",
    built: "dbt pipeline consolidating 8 billing feeds via Fivetran into a single verified MRR model with automated cohort analysis and churn attribution.",
    outcome: "Close process from 4 days to 2 hours. Zero reconciliation errors since launch.",
    stack: ["dbt", "Snowflake", "Fivetran", "Python", "Power BI", "SQL"],
    Diagram: DiagramMRR,
    detailPoints: [
      "8 billing systems unified into one authoritative MRR definition",
      "Automated cohort analysis, churn attribution, and expansion MRR tracking",
      "Monthly close time reduced from 4 days to 2 hours",
      "Zero reconciliation errors since pipeline launch",
      "CFO team adopted dashboard as single source of truth for board reporting",
    ],
  },
];

/* ── Modal ──────────────────────────────────────────────────────────────── */

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
                <p className="eyebrow mb-2">{study.domain}</p>
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

/* ── Featured card ───────────────────────────────────────────────────────── */

function FeaturedCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article {...reveal()} className="panel panel-lift rounded-2xl overflow-hidden flex flex-col">
      <div className="border-b border-border p-[clamp(1.25rem,2vw,2rem)] text-foreground bg-background">
        <study.Diagram />
      </div>
      <div className="p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] accent-text">CASE STUDY {study.num}</span>
          <span className="eyebrow">{study.domain}</span>
        </div>
        <h3 className="text-[clamp(1rem,0.95rem+0.5vw,1.3rem)] font-semibold leading-snug mb-3 max-w-[28ch]">
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

/* ── Compact card ────────────────────────────────────────────────────────── */

function CompactCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal()}
      className="panel panel-lift rounded-xl p-[clamp(1rem,1.5vw,1.5rem)] flex flex-col gap-3 cursor-pointer"
      onClick={onOpen}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow">{study.domain}</span>
        <span className="font-mono text-[10px] accent-text">{study.num}</span>
      </div>
      <h3 className="text-[clamp(0.85rem,0.8rem+0.3vw,1rem)] font-semibold leading-snug max-w-[24ch]">
        {study.title}
      </h3>
      <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2 flex-1">{study.outcome}</p>
      <div className="flex flex-wrap gap-1">
        {study.stack.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded"
            style={{ background: "var(--muted)" }}>
            {t}
          </span>
        ))}
        {study.stack.length > 3 && (
          <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded"
            style={{ background: "var(--muted)" }}>
            +{study.stack.length - 3}
          </span>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
        className="self-start inline-flex items-center gap-1 text-[12px] font-medium accent-text hover:opacity-70 transition-opacity"
      >
        Details <ChevronDown size={12} className="-rotate-90" />
      </button>
    </motion.article>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function CaseStudiesSection() {
  const [openStudy, setOpenStudy] = useState<Study | null>(null);

  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Flagship work</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[18ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Featured projects
        </motion.h2>

        {/* 3 featured case studies */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-[clamp(2rem,3.5vw,4rem)]">
          {allStudies.map((study) => (
            <FeaturedCard key={study.id} study={study} onOpen={() => setOpenStudy(study)} />
          ))}
        </div>

        {/* Compact additional projects */}
        <motion.div {...reveal(0.1)}>
          <p className="eyebrow mb-4">Additional projects</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compactStudies.map((study) => (
              <CompactCard key={study.id} study={study} onOpen={() => setOpenStudy(study)} />
            ))}
          </div>
        </motion.div>
      </div>

      {openStudy && (
        <StudyModal study={openStudy} onClose={() => setOpenStudy(null)} />
      )}
    </section>
  );
}
