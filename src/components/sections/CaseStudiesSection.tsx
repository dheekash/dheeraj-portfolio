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

/* ── SVG diagrams (theme-aware, unchanged) ─────────────────────────────── */

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

function DiagramHub() {
  const spokes = Array.from({ length: 15 }, (_, i) => {
    const angle = (i / 15) * Math.PI * 2 - Math.PI / 2;
    return { x: 180 + Math.cos(angle) * 80, y: 78 + Math.sin(angle) * 56 };
  });
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="15 country ERP systems converging on one governed semantic model serving 200 users">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="12" opacity="0.5">15 COUNTRIES → ONE SEMANTIC MODEL</text>
        {spokes.map((s, i) => (
          <g key={i}>
            <line x1={s.x} y1={s.y} x2="180" y2="78" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
            <circle cx={s.x} cy={s.y} r="3" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.1" />
          </g>
        ))}
        <circle cx="180" cy="78" r="16" fill="var(--dgrm)" />
        <text x="180" y="81" textAnchor="middle" fill="var(--background)" fontSize="8">RLS</text>
        <text x="0" y="158" opacity="0.65">refresh: 4 hrs → 15 min</text>
        <text x="360" y="158" textAnchor="end" fill="var(--dgrm)">200+ users, one truth</text>
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
    outcome: "Reduced reporting time from 6 hours to under 10 minutes — saving ~$90K/yr in analyst hours and enabling same-day decisions across 8 regional markets.",
    stack: ["Databricks", "Azure Data Factory", "PySpark", "Delta Live Tables", "Power BI"],
    Diagram: DiagramLatency,
    detailPoints: [
      "Architected Bronze → Silver → Gold Medallion pipeline with automated quality monitoring",
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
    challenge: "The customer success team only learned about churn after cancellations happened — there was no early-warning system and no way to intervene.",
    built: "An end-to-end ML pipeline using Databricks and Snowflake that ranked 2M+ customers by churn risk daily, delivering a prioritised intervention list to the CS team.",
    outcome: "Churn dropped 18% within 6 months — retaining approximately $300K in annual revenue and shifting the CS team from reactive to proactive.",
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
    built: "A phased migration to Microsoft Fabric with a Medallion architecture and 200+ SQLMesh-managed transformation models — run in parallel with the legacy system until every number reconciled.",
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
    domain: "Operational visibility",
    title: "Global Manufacturing Analytics Suite",
    challenge: "15 country teams ran their own spreadsheet reports. Executive roll-ups took 4+ hours and still didn't agree — everyone had a different version of the truth.",
    built: "A unified Snowflake warehouse with dbt transformation layers and Power BI semantic models with row-level security — one governed truth for 200+ users across 15 markets.",
    outcome: "Refresh time dropped from 4 hours to 15 minutes. Eliminated 40+ manual Excel reports and gave executives real-time cross-market benchmarking for the first time.",
    stack: ["Power BI", "Snowflake", "dbt", "Azure Data Factory", "SQL", "DAX"],
    Diagram: DiagramHub,
    detailPoints: [
      "Harmonised data from 15 regional ERP systems with different schemas",
      "Designed row-level security for 200+ users across regional, country, and global access tiers",
      "Achieved 15-minute refresh SLA on a complex multi-join semantic model",
      "Built executive dashboard surfacing operational KPIs accessible to non-technical leadership",
      "Enabled real-time cross-market performance benchmarking for the first time",
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
  "04": ["Power BI", "Snowflake", "Business Intelligence"],
};

/* ── Case study modal ───────────────────────────────────────────────────── */

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

/* ── Project card ───────────────────────────────────────────────────────── */

function StudyCard({ study, onOpen }: { study: Study; onOpen: () => void }) {
  return (
    <motion.article
      {...reveal()}
      className="panel panel-lift rounded-2xl overflow-hidden"
    >
      {/* Diagram preview */}
      <div className="border-b border-border p-[clamp(1.25rem,2vw,2rem)] text-foreground bg-background">
        <study.Diagram />
      </div>

      <div className="p-[clamp(1.25rem,2vw,1.75rem)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] accent-text">CASE STUDY {study.num}</span>
          <span className="eyebrow">{study.domain}</span>
        </div>

        <h3 className="text-[clamp(1.1rem,1rem+0.6vw,1.4rem)] font-semibold leading-snug mb-4 max-w-[28ch]">
          {study.title}
        </h3>

        <div className="space-y-3 mb-5">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
              The challenge
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
              What I built
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.built}</p>
          </div>
          <div className="panel rounded-xl px-4 py-3" style={{ borderLeft: "3px solid var(--primary)" }}>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
              Business outcome
            </p>
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

/* ── Main section ───────────────────────────────────────────────────────── */

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
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[18ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Selected projects
        </motion.h2>

        {/* Filter bar */}
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
