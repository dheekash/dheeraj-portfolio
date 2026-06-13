"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────
   Hand-drawn, theme-aware diagrams. Ink = currentColor, accent = var(--dgrm).
   ──────────────────────────────────────────────────────────────────── */

function DiagramLatency() {
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" role="img" aria-label="Latency reduced from 6 hours to under 10 minutes">
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
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Customers ranked by churn risk; outreach targets the highest-risk segment">
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
    <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Pipeline failure rate falling from 12 percent to under 1 percent across migration phases">
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
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Fifteen country systems converging on one governed semantic model serving 200 users">
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

/* ──────────────────────────────────────────────────────────────────── */

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function ImpactList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((r) => (
        <li key={r} className="text-sm leading-relaxed pl-3.5 border-l-2 border-primary/50">
          {r}
        </li>
      ))}
    </ul>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-[11px] text-muted-foreground/80 leading-relaxed">
      {items.join("  ·  ")}
    </p>
  );
}

function Kicker({ num, domain }: { num: string; domain: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-5">
      <span className="font-mono text-xs accent-text">CASE STUDY {num}</span>
      <span className="eyebrow">{domain}</span>
    </div>
  );
}

/* ── 01: split spread — narrative left, giant figure + diagram right ── */
function StudyOne() {
  return (
    <motion.article {...reveal()} className="border-t-2 border-foreground pt-[clamp(1.5rem,2.5vw,2.5rem)] pb-[clamp(3rem,4vw,5rem)]">
      <Kicker num="01" domain="Revenue intelligence" />
      <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,4vw,5rem)] gap-y-10">
        <div className="lg:col-span-6">
          <h3 className="text-[clamp(1.6rem,1.2rem+2vw,2.75rem)] font-semibold tracking-tight leading-tight mb-7 max-w-[20ch]">
            Real-Time Sales Intelligence Platform
          </h3>
          <div className="space-y-6 mb-8">
            <Field label="Challenge">
              Sales reporting lagged by six hours across eight regional markets —
              every market kept private spreadsheets to compensate.
            </Field>
            <Field label="Constraints">
              Twelve heterogeneous source systems, schema drift, and a hard
              sub-10-minute SLA with full lineage preserved.
            </Field>
            <Field label="Solution">
              A Databricks Lakehouse processing 5M+ daily transactions through
              Bronze, Silver, and Gold layers with automated quality monitoring
              and DirectQuery semantic models.
            </Field>
          </div>
          <p className="eyebrow mb-2">Architecture</p>
          <p className="font-mono text-[11px] text-muted-foreground mb-8">
            12 sources → ADF → Auto Loader → Delta Live Tables → Gold → Power BI
          </p>
          <Stack items={["Databricks", "Azure Data Factory", "PySpark", "MLflow", "Power BI"]} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="font-mono tabular-nums font-semibold tracking-tight leading-none text-[clamp(3rem,2rem+4vw,6rem)] mb-2">
            6h<span className="accent-text">→</span>10m
          </div>
          <p className="text-sm text-muted-foreground mb-8">decision latency, before and after</p>
          <div className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)] mb-8 text-foreground">
            <DiagramLatency />
          </div>
          <ImpactList
            items={[
              "Reduced latency from 6 hours to under 10 minutes",
              "Increased forecast accuracy by 22%",
              "Reduced pipeline failures by 95%",
            ]}
          />
        </div>
      </div>
    </motion.article>
  );
}

/* ── 02: tinted full-bleed panel, diagram-led, mirrored ── */
function StudyTwo() {
  return (
    <motion.article {...reveal()} className="pb-[clamp(3rem,4vw,5rem)]">
      <div className="rounded-3xl panel overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-y-10 p-[clamp(1.5rem,1rem+3vw,4rem)]"
          style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 6%, transparent), transparent 55%)" }}>
          <div className="lg:col-span-5 lg:pr-[clamp(1rem,3vw,3rem)]">
            <div className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)] text-foreground bg-background">
              <DiagramChurn />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Kicker num="02" domain="Customer retention" />
            <h3 className="text-[clamp(1.6rem,1.2rem+2vw,2.75rem)] font-semibold tracking-tight leading-tight mb-7 max-w-[20ch]">
              Customer Churn Analytics Pipeline
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Field label="Challenge">
                Identify high-risk customers before churn occurs — the client
                only learned of unhappiness at cancellation.
              </Field>
              <Field label="Constraints">
                Fragmented CRM, billing, and usage data; CS team capacity capped
                the daily outreach list.
              </Field>
              <Field label="Solution">
                An AutoML churn platform over 2M+ customer records and 60+
                behavioral indicators, served as a ranked daily call list.
              </Field>
              <div>
                <p className="eyebrow mb-2">Architecture</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  CRM + usage → Snowflake → dbt features → AutoML → Power BI
                </p>
              </div>
            </div>
            <div className="mb-8">
              <ImpactList
                items={[
                  "89% recall on at-risk customers",
                  "Reduced churn by 18%",
                  "Saved $300K annually",
                ]}
              />
            </div>
            <Stack items={["Databricks", "Snowflake", "dbt", "Power BI"]} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── 03: phased horizontal narrative under a full-width chart ── */
function StudyThree() {
  return (
    <motion.article {...reveal()} className="border-t border-border pt-[clamp(1.5rem,2.5vw,2.5rem)] pb-[clamp(3rem,4vw,5rem)]">
      <Kicker num="03" domain="Platform modernisation" />
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 mb-9">
        <h3 className="text-[clamp(1.6rem,1.2rem+2vw,2.75rem)] font-semibold tracking-tight leading-tight max-w-[22ch]">
          Enterprise Fabric Lakehouse Migration
        </h3>
        <div className="font-mono tabular-nums font-semibold tracking-tight leading-none text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
          12%<span className="accent-text">→</span>&lt;1%
        </div>
      </div>

      <div className="panel rounded-2xl p-[clamp(1.25rem,2vw,2.25rem)] text-foreground mb-10">
        <DiagramReliability />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-8">
        <Field label="Challenge">
          Legacy ETL was unreliable and expensive — 12% of monthly runs failed,
          and the data team had become a night shift.
        </Field>
        <Field label="Constraints">
          Zero downtime allowed: legacy and new platforms ran in parallel until
          every number reconciled.
        </Field>
        <Field label="Solution">
          A Fabric Medallion Architecture consolidating six source systems into
          OneLake, with 200+ transformations rebuilt as tested SQLMesh models.
        </Field>
        <div>
          <div className="mb-6">
            <ImpactList
              items={[
                "Failures reduced from 12% to <1%",
                "Maintenance effort reduced 90%",
                "Compute cost reduced 15%",
              ]}
            />
          </div>
          <Stack items={["Microsoft Fabric", "OneLake", "SQLMesh", "Delta Lake"]} />
        </div>
      </div>
    </motion.article>
  );
}

/* ── 04: hub diagram center-stage, narrative wrapped right ── */
function StudyFour() {
  return (
    <motion.article {...reveal()} className="border-t border-border pt-[clamp(1.5rem,2.5vw,2.5rem)]">
      <Kicker num="04" domain="Operational visibility" />
      <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,4vw,5rem)] gap-y-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="panel rounded-2xl p-[clamp(1.25rem,2vw,2rem)] text-foreground mb-8">
            <DiagramHub />
          </div>
          <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {[
              { v: "15min", l: "refresh, from 4 hrs" },
              { v: "94%", l: "performance gain" },
              { v: "200+", l: "active users" },
            ].map((m) => (
              <div key={m.l} className="bg-background px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.8rem,1.2vw,1.1rem)]">
                <div className="font-mono tabular-nums font-semibold text-[clamp(1rem,0.9rem+0.7vw,1.4rem)] accent-text">{m.v}</div>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <h3 className="text-[clamp(1.6rem,1.2rem+2vw,2.75rem)] font-semibold tracking-tight leading-tight mb-7 max-w-[20ch]">
            Global Manufacturing Analytics Suite
          </h3>
          <div className="space-y-6 mb-8">
            <Field label="Challenge">
              Factory reporting required four hours per refresh cycle, and
              fifteen country ERPs disagreed about every KPI.
            </Field>
            <Field label="Constraints">
              Row-level security across regional, country, and global access for
              200+ users — without forking the model.
            </Field>
            <Field label="Solution">
              A governed analytics ecosystem: one Snowflake warehouse, one dbt
              layer, one semantic model with standardized KPI definitions
              across all fifteen countries.
            </Field>
          </div>
          <p className="eyebrow mb-2">Architecture</p>
          <p className="font-mono text-[11px] text-muted-foreground mb-8">
            15 ERPs → ADF → Snowflake → dbt → semantic model (RLS) → Power BI
          </p>
          <Stack items={["Power BI", "Snowflake", "dbt", "Azure Data Factory"]} />
        </div>
      </div>
    </motion.article>
  );
}

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

export function CaseStudiesSection() {
  const [active, setActive] = useState<Filter>("All");

  const visible = (id: string) =>
    active === "All" || (STUDY_TAGS[id]?.includes(active) ?? false);

  return (
    <section id="case-studies">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Flagship work</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[20ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          From raw data to executive decisions.
        </motion.h2>

        {/* Filter bar */}
        <motion.div
          {...reveal(0.08)}
          className="flex flex-wrap gap-2 mb-[clamp(2.5rem,4vw,5rem)]"
          role="group"
          aria-label="Filter projects"
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
          >
            {visible("01") && <StudyOne />}
            {visible("02") && <StudyTwo />}
            {visible("03") && <StudyThree />}
            {visible("04") && <StudyFour />}
            {!visible("01") && !visible("02") && !visible("03") && !visible("04") && (
              <p className="text-muted-foreground text-sm py-12 text-center">
                No projects match this filter yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
