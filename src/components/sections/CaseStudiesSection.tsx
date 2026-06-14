"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";

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
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="2M customers ranked by churn risk; daily outreach list with 89% recall">
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

function DiagramReliability() {
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Pipeline failure rate falling from 12% to under 1% through migration phases">
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
        <text x="0" y="158" opacity="0.5">SIX SOURCE SYSTEMS CONSOLIDATED INTO ONELAKE</text>
      </g>
    </svg>
  );
}

function DiagramFileFlow() {
  const stages = ["Mailbox", "Validator", "Router", "Blob", "SQL"];
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label="Automated file pipeline from vendor mailbox to SQL database">
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
                strokeOpacity={isEnd ? 1 : 0.45}
                strokeWidth="1" />
              <text x={x + 26} y="57" textAnchor="middle"
                fill={isEnd ? "var(--background)" : "currentColor"}
                opacity={isEnd ? 1 : 0.7}
                fontSize="8">
                {label}
              </text>
              {i < stages.length - 1 && (
                <path d={`M ${x + 52} 54 L ${x + 66} 54`}
                  stroke="var(--dgrm)" strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.7" />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--dgrm)" opacity="0.7" />
          </marker>
        </defs>
        <text x="0" y="108" opacity="0.65">before: 3 hrs/day manual processing</text>
        <text x="0" y="124" fill="var(--dgrm)">after: 99.8% automated · &lt;5 min per batch</text>
        <text x="0" y="142" opacity="0.4">finance team: data analysis, not file-wrangling</text>
      </g>
    </svg>
  );
}

function DiagramFraud() {
  const bars = [24, 24, 24, 24, 24, 0.08]; // hours, last bar is <5min normalized to tiny
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

function DiagramMRR() {
  const sources = ["Stripe", "Chargebee", "Zuora", "Recurly", "Paddle", "Maxio", "Braintree", "Custom"];
  return (
    <svg viewBox="0 0 360 165" className="w-full h-auto" role="img" aria-label="8 billing sources unified into a single MRR model">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">8 BILLING SOURCES → ONE VERIFIED MRR MODEL</text>
        {sources.map((s, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const x = col * 84;
          const y = 24 + row * 28;
          return (
            <g key={s}>
              <rect x={x} y={y} width="74" height="18" rx="3"
                fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
              <text x={x + 37} y={y + 12} textAnchor="middle" opacity="0.65">{s}</text>
              <path d={`M ${x + 37} ${y + 18} L 180 100`} stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.8" />
            </g>
          );
        })}
        <circle cx="180" cy="110" r="16" fill="var(--dgrm)" opacity="0.9" />
        <text x="180" y="113" textAnchor="middle" fill="var(--background)" fontSize="8">dbt</text>
        <text x="0" y="145" opacity="0.65">close time: 4 days</text>
        <text x="180" y="145" fill="var(--dgrm)">→ 2 hours</text>
        <text x="0" y="160" opacity="0.4">zero reconciliation errors since launch</text>
      </g>
    </svg>
  );
}

/* ── Study data ─────────────────────────────────────────────────────────── */

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
  githubUrl?: string;
};

const studies: Study[] = [
  {
    id: "01",
    num: "01",
    domain: "Revenue intelligence",
    title: "Real-Time Sales Intelligence Platform",
    challenge: "Sales teams were making decisions on 6-hour-old data. By the time batch reports arrived, inventory gaps had already cost revenue.",
    built: "A Databricks streaming pipeline processing 5M+ daily transactions across 8 markets, feeding Power BI DirectQuery dashboards with near-real-time visibility.",
    outcome: "Reduced reporting time from 6 hours to under 10 minutes, saving ~$90K/yr in analyst hours and enabling same-day decisions across 8 regional markets.",
    stack: ["Databricks", "Azure Data Factory", "PySpark", "Delta Live Tables", "Power BI"],
    Diagram: DiagramLatency,
    detailPoints: [
      "Architected Bronze to Silver to Gold Medallion pipeline with automated quality monitoring",
      "Handled schema evolution across 12 heterogeneous source systems",
      "Achieved sub-10-minute SLA with full audit trail and data lineage",
      "Reduced pipeline failures by 95% over the legacy batch approach",
      "Increased forecast accuracy by 22% through intraday signal availability",
    ],
  },
  {
    id: "02",
    num: "02",
    domain: "Customer retention",
    title: "Customer Churn Analytics Pipeline",
    challenge: "The customer success team only learned about churn after cancellations happened; there was no early-warning system and no way to intervene.",
    built: "An end-to-end ML pipeline using Databricks and Snowflake that ranked 2M+ customers by churn risk daily, delivering a prioritised intervention list to the CS team.",
    outcome: "Churn dropped 18% within 6 months, retaining approximately $300K in annual revenue and shifting the CS team from reactive to proactive.",
    stack: ["Databricks", "Snowflake", "dbt", "MLflow", "Power BI", "Python"],
    Diagram: DiagramChurn,
    detailPoints: [
      "Built feature store in Snowflake from fragmented CRM, billing, and usage data",
      "Achieved 89% recall on at-risk customers without overwhelming CS capacity",
      "Automated daily inference pipeline across 2M+ customer records",
      "Integrated ML predictions into Power BI without exposing model complexity to end users",
      "Reduced manual forecasting effort by 70%",
    ],
  },
  {
    id: "03",
    num: "03",
    domain: "Platform modernisation",
    title: "Enterprise Fabric Lakehouse Migration",
    challenge: "A legacy data warehouse was failing 12% of pipeline runs every month. The data team spent more time firefighting than building new analytics.",
    built: "A phased migration to Microsoft Fabric with a Medallion architecture and 200+ SQLMesh-managed transformation models, run in parallel with the legacy system until every number reconciled.",
    outcome: "Pipeline failures dropped from 12% to under 1%. Maintenance effort fell 90%, freeing the team to build new capabilities instead of fixing old ones.",
    stack: ["Microsoft Fabric", "SQLMesh", "Delta Lake", "OneLake", "Power BI", "Python"],
    Diagram: DiagramReliability,
    detailPoints: [
      "Migrated 5+ years of historical data with zero data loss and full lineage preservation",
      "Re-engineered 200+ legacy SQL transformations into tested, versioned SQLMesh models",
      "Zero downtime: legacy and new platform ran in parallel through full validation",
      "Compute costs reduced by 15% through Fabric capacity optimisation",
      "Established automated testing and data quality gates at each Medallion layer",
    ],
  },
  {
    id: "04",
    num: "04",
    domain: "Process automation",
    title: "Automated File Ingestion Pipeline",
    challenge: "Finance processed 500+ daily files from 15 vendors by hand, taking 3 hours every morning before any analysis could begin.",
    built: "Python and Azure Logic Apps automated pipeline that monitors mailboxes, validates file schemas, routes to correct storage paths, and triggers downstream SQL processing without manual intervention.",
    outcome: "Three hours of daily manual work eliminated. File processing accuracy improved to 99.8%. Finance team now spends mornings on analysis, not file-wrangling.",
    stack: ["Python", "Azure Logic Apps", "Azure Blob Storage", "Power Automate", "SQL"],
    Diagram: DiagramFileFlow,
    detailPoints: [
      "Eliminated 3 hours of daily manual file handling across a 5-person finance team",
      "Built schema validation layer catching malformed files before they reach the database",
      "Achieved 99.8% processing accuracy vs. ~96% manual accuracy",
      "Reduced end-of-month close prep time by 60%",
      "Enabled same-day availability of vendor data instead of next-day manual processing",
    ],
  },
  {
    id: "05",
    num: "05",
    domain: "Risk and compliance",
    title: "Real-Time Fraud Monitoring Platform",
    challenge: "Fraud detection ran on daily batch reports. By the time patterns were flagged, losses had already occurred and the intervention window had closed.",
    built: "Kafka streaming pipeline processing transaction events in real time, feeding a Databricks anomaly detection model and a live Power BI monitoring dashboard for the risk team.",
    outcome: "Detection latency cut from 24 hours to under 5 minutes. Over $1.2M in suspicious transactions flagged and investigated in the first 90 days of operation.",
    stack: ["Apache Kafka", "Databricks", "PySpark", "Azure Event Hubs", "Power BI", "Python"],
    Diagram: DiagramFraud,
    detailPoints: [
      "Reduced fraud detection latency from 24 hours to under 5 minutes",
      "Processed 100K+ transaction events per hour through the Kafka pipeline",
      "Anomaly detection model achieved 94% precision, minimising false-positive workload for analysts",
      "$1.2M+ in suspicious transactions surfaced and investigated in first 90 days",
      "Live Power BI dashboard with auto-refresh gave risk team real-time operational visibility",
    ],
  },
  {
    id: "06",
    num: "06",
    domain: "Revenue analytics",
    title: "Unified MRR Reporting Pipeline",
    challenge: "Finance calculated Monthly Recurring Revenue manually from 8 disconnected billing systems. A 4-day close process with frequent reconciliation errors.",
    built: "dbt pipeline that consolidates 8 billing source feeds via Fivetran into a single verified MRR model with automated cohort analysis, churn attribution, and expansion tracking.",
    outcome: "Close process cut from 4 days to 2 hours. Zero reconciliation errors since launch. Finance now closes books same-week instead of the following Monday.",
    stack: ["dbt", "Snowflake", "Fivetran", "Python", "Power BI", "SQL"],
    Diagram: DiagramMRR,
    detailPoints: [
      "Unified 8 billing systems into one authoritative MRR definition agreed with Finance",
      "Automated cohort analysis, churn attribution, and expansion MRR tracking",
      "Monthly close time reduced from 4 days to 2 hours",
      "Zero reconciliation errors since pipeline launch",
      "Power BI dashboard adopted by CFO team as single source of truth for board reporting",
    ],
  },
];

type Filter = "All" | "Power BI" | "Microsoft Fabric" | "Databricks" | "Snowflake" | "Analytics Engineering" | "Business Intelligence";

const FILTERS: Filter[] = [
  "All", "Power BI", "Microsoft Fabric", "Databricks", "Snowflake",
  "Analytics Engineering", "Business Intelligence",
];

const STUDY_TAGS: Record<string, Filter[]> = {
  "01": ["Power BI", "Databricks", "Analytics Engineering"],
  "02": ["Power BI", "Databricks", "Snowflake"],
  "03": ["Microsoft Fabric", "Analytics Engineering"],
  "04": ["Analytics Engineering", "Business Intelligence"],
  "05": ["Databricks", "Analytics Engineering"],
  "06": ["Snowflake", "Business Intelligence", "Analytics Engineering"],
};

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
                <p className="eyebrow mb-2">Case study {study.num} · {study.domain}</p>
                <h3 className="text-xl font-semibold leading-tight">{study.title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 w-9 h-9 rounded-full panel flex items-center justify-center hover:border-primary/30 transition-colors"
              >
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
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium panel text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Card ───────────────────────────────────────────────────────────────── */

function StudyCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal()}
      className="panel panel-lift rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="border-b border-border p-[clamp(1.25rem,2vw,2rem)] text-foreground bg-background">
        <study.Diagram />
      </div>

      <div className="p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] accent-text">CASE STUDY {study.num}</span>
          <span className="eyebrow">{study.domain}</span>
        </div>

        <h3 className="text-[clamp(1.1rem,1rem+0.6vw,1.35rem)] font-semibold leading-snug mb-4 max-w-[28ch]">
          {study.title}
        </h3>

        <div className="space-y-3 mb-5 flex-1">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">The challenge</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">What I built</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.built}</p>
          </div>
          <div className="panel rounded-xl px-4 py-3" style={{ borderLeft: "3px solid var(--primary)" }}>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">Business outcome</p>
            <p className="text-sm leading-relaxed font-medium">{study.outcome}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {study.stack.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground"
              style={{ background: "color-mix(in srgb, var(--primary) 7%, var(--card))", border: "1px solid var(--border)" }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {study.githubUrl ? (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full panel text-sm font-medium hover:border-primary/30 transition-colors"
            >
              See on GitHub <ExternalLink size={13} />
            </a>
          ) : (
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              View case study <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function CaseStudiesSection() {
  const [active, setActive] = useState<Filter>("All");
  const [openStudy, setOpenStudy] = useState<Study | null>(null);

  const visible = (id: string) =>
    active === "All" || (STUDY_TAGS[id]?.includes(active) ?? false);

  const visibleStudies = studies.filter((s) => visible(s.id));

  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Flagship work</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[18ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Selected projects
        </motion.h2>

        <motion.div
          {...reveal(0.08)}
          className="flex flex-wrap gap-2 mb-[clamp(2.5rem,4vw,5rem)]"
          role="group"
          aria-label="Filter projects by technology"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "panel text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-6"
          >
            {visibleStudies.length > 0 ? (
              visibleStudies.map((study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  onOpen={() => setOpenStudy(study)}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-sm py-12 col-span-2 text-center">
                No projects match this filter yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {openStudy && (
        <StudyModal study={openStudy} onClose={() => setOpenStudy(null)} />
      )}
    </section>
  );
}
