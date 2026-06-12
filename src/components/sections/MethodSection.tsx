"use client";

import { motion } from "framer-motion";

const principles = [
  {
    num: "I",
    title: "Start from the decision, not the data.",
    body:
      "Before any pipeline gets built, I ask what someone will do differently if the number moves. If there's no answer, the dashboard shouldn't exist.",
  },
  {
    num: "II",
    title: "Earn trust at 2 a.m.",
    body:
      "Analytics is believed exactly as long as it's reliable. Tested transformations, versioned models, and parallel-run migrations — reliability is a design input, not an aspiration.",
  },
  {
    num: "III",
    title: "One semantic layer, many audiences.",
    body:
      "The line manager and the COO should disagree about strategy, never about the number. Row-level security and a single governed model make that possible.",
  },
  {
    num: "IV",
    title: "Show the figure, then shut up.",
    body:
      "Executive reporting is editing. Every measure that doesn't change the decision is noise — and noise is where trust goes to die.",
  },
];

const toolkit = [
  { layer: "Platforms", items: "Microsoft Fabric · Databricks · Snowflake · Azure" },
  { layer: "Transformation", items: "SQL · Python · PySpark · dbt · SQLMesh · Delta Lake" },
  { layer: "Analytics", items: "Power BI · DAX · Tableau · Zebra BI · Excel" },
  { layer: "Automation", items: "Azure Data Factory · Power Automate · REST APIs" },
  { layer: "Credentials", items: "13 certifications — Microsoft, Databricks, Snowflake" },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function MethodSection() {
  return (
    <section id="method">
      <div className="container-page py-20 lg:py-28">
        <motion.div {...reveal()} className="flex items-baseline gap-5 rule-thick pt-4 mb-14 lg:mb-20">
          <span className="font-mono text-xs text-rust">04</span>
          <h2 className="text-2xl lg:text-3xl">Method</h2>
        </motion.div>

        {/* Principles — typographic, numbered in roman numerals */}
        <div className="grid sm:grid-cols-2 gap-x-14 gap-y-12 lg:gap-y-16 max-w-5xl mb-20 lg:mb-28">
          {principles.map((p, i) => (
            <motion.div key={p.num} {...reveal(0.05 + i * 0.04)}>
              <p className="font-serif text-3xl text-rust mb-3">{p.num}.</p>
              <h3 className="text-xl lg:text-2xl mb-3">{p.title}</h3>
              <p className="text-[15px] leading-[1.8] text-foreground/80 max-w-[44ch]">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Toolkit — set like a colophon, not a logo grid */}
        <motion.div {...reveal(0.1)} className="max-w-3xl">
          <p className="kicker mb-4">The instruments</p>
          <dl>
            {toolkit.map((t) => (
              <div key={t.layer} className="rule-thin py-3.5 grid sm:grid-cols-[160px_1fr] gap-x-10 gap-y-1">
                <dt className="text-sm font-medium">{t.layer}</dt>
                <dd className="font-mono text-[13px] text-muted-foreground">{t.items}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
