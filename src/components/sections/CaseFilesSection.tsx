"use client";

import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────
   Custom line-art diagrams — drawn, not generated. Ink strokes on
   paper with a single rust accent, captioned like report figures.
   ──────────────────────────────────────────────────────────────────── */

function DiagramLatency() {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Reporting latency reduced from 6 hours to under 10 minutes">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="14" opacity="0.55">REPORTING LATENCY</text>
        {/* Before bar */}
        <text x="0" y="52" opacity="0.7">before</text>
        <rect x="52" y="42" width="280" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="52" y="42" width="280" height="14" fill="currentColor" opacity="0.12" />
        <text x="338" y="53" textAnchor="end" opacity="0.7">6 hrs</text>
        {/* After bar */}
        <text x="0" y="92" opacity="0.7">after</text>
        <rect x="52" y="82" width="13" height="14" fill="#A8402A" />
        <text x="72" y="93" fill="#A8402A">&lt;10 min</text>
        {/* Flow */}
        <text x="0" y="140" opacity="0.55">12 SOURCE SYSTEMS</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={10 + i * 16} cy={156} r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        ))}
        <text x="106" y="159" opacity="0.4">···</text>
        <path d="M 128 156 H 180" stroke="currentColor" strokeWidth="1.2" fill="none" markerEnd="url(#arr1)" />
        <rect x="184" y="144" width="78" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x="223" y="159" textAnchor="middle">STREAM</text>
        <path d="M 262 156 H 306" stroke="#A8402A" strokeWidth="1.2" fill="none" markerEnd="url(#arr2)" />
        <text x="312" y="151" fill="#A8402A">8</text>
        <text x="312" y="162" fill="#A8402A">MKTS</text>
        <defs>
          <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" strokeWidth="1" />
          </marker>
          <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#A8402A" strokeWidth="1" />
          </marker>
        </defs>
      </g>
    </svg>
  );
}

function DiagramChurn() {
  // Risk-ranked customer strip: outreach concentrates on the rust segment.
  const cells = Array.from({ length: 40 });
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Churn model ranks customers by risk; outreach targets the highest-risk segment">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="14" opacity="0.55">2M CUSTOMERS, RANKED BY CHURN RISK</text>
        {cells.map((_, i) => {
          const x = (i % 20) * 17.5;
          const y = 32 + Math.floor(i / 20) * 26;
          const hot = i < 5 || (i >= 20 && i < 23);
          return (
            <rect
              key={i}
              x={x} y={y} width="13" height="18"
              fill={hot ? "#A8402A" : "none"}
              opacity={hot ? 0.9 : 1}
              stroke="currentColor"
              strokeOpacity={hot ? 0 : 0.45}
              strokeWidth="1"
            />
          );
        })}
        <path d="M 4 96 V 104 H 60 V 96" stroke="#A8402A" strokeWidth="1.2" fill="none" />
        <text x="4" y="118" fill="#A8402A">daily outreach list · 89% recall</text>
        <text x="0" y="152" opacity="0.7">churn rate, 6 months later</text>
        <text x="0" y="176" fontFamily="var(--font-serif)" fontSize="26" fontWeight="600">−18%</text>
        <text x="74" y="176" opacity="0.55">≈ $300K retained annually</text>
      </g>
    </svg>
  );
}

function DiagramReliability() {
  // Failure-rate line falling across the migration phases.
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Pipeline failure rate fell from 12 percent to under 1 percent across the migration">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="14" opacity="0.55">MONTHLY PIPELINE FAILURE RATE</text>
        {/* Axes */}
        <path d="M 30 30 V 150 H 340" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
        <text x="0" y="40" opacity="0.7">12%</text>
        <text x="8" y="148" opacity="0.7">1%</text>
        {/* Failure line: high & jittery, then drops through phases */}
        <path
          d="M 35 38 L 60 44 L 85 36 L 110 46 L 135 40 L 165 62 L 200 96 L 240 128 L 290 142 L 338 144"
          stroke="#A8402A" strokeWidth="1.6" fill="none"
        />
        {/* Phase markers */}
        {[
          { x: 150, label: "BRONZE" },
          { x: 215, label: "SILVER" },
          { x: 280, label: "GOLD" },
        ].map((p) => (
          <g key={p.label}>
            <line x1={p.x} y1="30" x2={p.x} y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
            <text x={p.x} y="166" textAnchor="middle" opacity="0.7">{p.label}</text>
          </g>
        ))}
        <text x="0" y="192" opacity="0.55">200+ LEGACY MODELS REBUILT IN SQLMESH, TESTED, VERSIONED</text>
      </g>
    </svg>
  );
}

function DiagramHub() {
  // 15 markets converging on one governed semantic layer.
  const spokes = Array.from({ length: 15 }, (_, i) => {
    const angle = (i / 15) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 180 + Math.cos(angle) * 78,
      y: 92 + Math.sin(angle) * 62,
    };
  });
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Fifteen market systems converge on one governed semantic model serving 200 users">
      <g fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        <text x="0" y="14" opacity="0.55">15 ERP SYSTEMS → ONE SEMANTIC MODEL</text>
        {spokes.map((s, i) => (
          <g key={i}>
            <line x1={s.x} y1={s.y} x2="180" y2="92" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            <circle cx={s.x} cy={s.y} r="3" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
        ))}
        <circle cx="180" cy="92" r="17" fill="#A8402A" />
        <text x="180" y="95" textAnchor="middle" fill="#F6F2EA" fontSize="8">RLS</text>
        <text x="0" y="186" opacity="0.7">refresh: 4 hrs → 15 min</text>
        <text x="360" y="186" textAnchor="end" fill="#A8402A">200+ users, one truth</text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

type CaseFile = {
  num: string;
  domain: string;
  title: React.ReactNode;
  setting: string;
  narrative: string[];
  pull: string;
  keyfig: { value: string; caption: string };
  diagram: React.ReactNode;
  figcaption: string;
  footnote: string;
};

const caseFiles: CaseFile[] = [
  {
    num: "02·1",
    domain: "Revenue intelligence",
    title: <>Creating a single source of truth for multi&#8209;market sales decisions</>,
    setting: "Global retail · 8 markets · with Amplify Analytix",
    narrative: [
      "Eight regional sales teams were steering with six-hour-old numbers. By the time the overnight batch landed, the demand signal it described had already moved — and every market kept its own private spreadsheet to compensate.",
      "I rebuilt the path from twelve source systems into a streaming lakehouse on Databricks, with one governed semantic layer feeding every market. Reporting latency fell from six hours to under ten minutes, and the parallel spreadsheets quietly disappeared — managers stopped maintaining them because the platform was finally faster than they were.",
    ],
    pull: "The spreadsheets didn't have to be banned. They became unnecessary.",
    keyfig: { value: "6h→10m", caption: "decision latency, before and after" },
    diagram: <DiagramLatency />,
    figcaption: "Fig. 2 — Twelve systems, one stream, eight markets.",
    footnote: "Databricks · Delta Live Tables · Azure Data Factory · PySpark · Power BI DirectQuery",
  },
  {
    num: "02·2",
    domain: "Customer retention",
    title: <>How predictive analytics reduced customer attrition by 18%</>,
    setting: "Subscription enterprise · consulting engagement",
    narrative: [
      "The client only learned a customer was unhappy when the cancellation arrived. Customer Success was staffed to react, not to anticipate — and the reporting stack offered nothing but a rear-view mirror.",
      "The fix wasn't a dashboard; it was a ranked list. A churn model with 89% recall, fed by a Snowflake feature store and refreshed daily, told each CS rep exactly which accounts to call this morning and why. Six months in, attrition was down 18% and roughly $300K of annual revenue stayed retained.",
    ],
    pull: "Executives don't act on probabilities. They act on a list of ten names.",
    keyfig: { value: "−18%", caption: "customer attrition in six months" },
    diagram: <DiagramChurn />,
    figcaption: "Fig. 3 — Risk-ranking two million customers into one morning call list.",
    footnote: "Snowflake · dbt · Databricks MLflow · Python · Power BI",
  },
  {
    num: "02·3",
    domain: "Platform modernisation",
    title: <>Rebuilding a failing data platform without stopping the business</>,
    setting: "Enterprise data team · Microsoft Fabric migration",
    narrative: [
      "Twelve percent of pipeline runs failed every month. The data team had become a night shift — firefighting failures instead of shipping analytics, while compute costs climbed and trust in the numbers eroded with every missed morning refresh.",
      "I led a phased migration to a Microsoft Fabric lakehouse: two hundred legacy SQL transformations rebuilt as tested, version-controlled SQLMesh models, with the old and new platforms running in parallel until the numbers reconciled. Failure rate landed under 1%, maintenance effort fell 90%, and the business never noticed the surgery.",
    ],
    pull: "The riskiest migration is the one the business can feel happening.",
    keyfig: { value: "12%→<1%", caption: "monthly pipeline failure rate" },
    diagram: <DiagramReliability />,
    figcaption: "Fig. 4 — Failure rate across the bronze, silver and gold cutovers.",
    footnote: "Microsoft Fabric · OneLake · SQLMesh · Delta Lake · Power BI",
  },
  {
    num: "02·4",
    domain: "Operational visibility",
    title: <>Giving 200 managers in 15 markets the same version of the truth</>,
    setting: "Global manufacturer · confidential client",
    narrative: [
      "Fifteen markets, fifteen ERP systems, and forty manual Excel consolidations standing between plant managers and an honest cross-market comparison. Every leadership meeting opened with a debate about whose numbers were right.",
      "One Snowflake warehouse, one dbt transformation layer, one Power BI model with row-level security — so a line manager in one market and the global COO read from the same page, each seeing exactly what they're entitled to. Refresh time fell from four hours to fifteen minutes, and the forty spreadsheets were retired.",
    ],
    pull: "When everyone reads the same number, the meeting is about the decision.",
    keyfig: { value: "40→0", caption: "manual Excel consolidations" },
    diagram: <DiagramHub />,
    figcaption: "Fig. 5 — Fifteen systems converging on one governed model.",
    footnote: "Snowflake · dbt · Azure Data Factory · Power BI · row-level security",
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  };
}

function CaseFileSpread({ cf, flip }: { cf: CaseFile; flip: boolean }) {
  return (
    <article className="rule-thin pt-[clamp(2.5rem,1.5rem+3vw,3.5rem)] pb-[clamp(4rem,2.5rem+5vw,6rem)]">
      <motion.div {...reveal()} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-6">
        <span className="font-mono text-xs text-rust">{cf.num}</span>
        <span className="kicker">{cf.domain}</span>
        <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">{cf.setting}</span>
      </motion.div>

      <motion.h3
        {...reveal(0.05)}
        className={`text-[clamp(1.7rem,1.2rem+2.4vw,3rem)] leading-[1.06] max-w-[24ch] mb-[clamp(2rem,1rem+4vw,3.5rem)] ${
          flip ? "lg:ml-auto lg:text-right" : ""
        }`}
      >
        {cf.title}
      </motion.h3>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Narrative column */}
        <motion.div
          {...reveal(0.1)}
          className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : "lg:col-start-1"}`}
        >
          {cf.narrative.map((p, i) => (
            <p key={i} className={`text-[15px] leading-[1.85] mb-5 ${i === 0 ? "dropcap" : ""}`}>
              {p}
            </p>
          ))}
          <p className="font-mono text-[11px] text-muted-foreground mt-6">{cf.footnote}</p>
        </motion.div>

        {/* Figure column: diagram + key figure */}
        <motion.div
          {...reveal(0.15)}
          className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
        >
          <figure className="border border-border bg-card p-[clamp(1rem,0.5rem+2vw,2rem)] text-foreground">
            {cf.diagram}
            <figcaption className="mt-4 pt-3 rule-thin font-mono text-[11px] text-muted-foreground">
              {cf.figcaption}
            </figcaption>
          </figure>

          <div className="mt-8 flex items-baseline gap-5">
            <span className="keyfig text-rust">{cf.keyfig.value}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{cf.keyfig.caption}</p>

          <blockquote className="serif-italic text-xl leading-snug text-foreground/80 mt-8 max-w-[26ch]">
            “{cf.pull}”
          </blockquote>
        </motion.div>
      </div>
    </article>
  );
}

export function CaseFilesSection() {
  return (
    <section id="case-files">
      <div className="container-page section-pad-t">
        <motion.div {...reveal()} className="flex items-baseline gap-5 rule-thick pt-4 mb-4">
          <span className="font-mono text-xs text-rust">02</span>
          <h2 className="text-2xl lg:text-3xl">Case files</h2>
        </motion.div>
        <motion.p {...reveal(0.05)} className="lede max-w-[44ch] mb-[clamp(3rem,2rem+4vw,5rem)] text-muted-foreground">
          Four engagements, told the way they actually happened: a business
          problem, a decision that needed evidence, and what changed.
        </motion.p>

        {caseFiles.map((cf, i) => (
          <CaseFileSpread key={cf.num} cf={cf} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
