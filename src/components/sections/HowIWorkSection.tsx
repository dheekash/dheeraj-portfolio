"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Define the Problem",
    description: "Align with stakeholders on business questions, success metrics, and the decision the data needs to support.",
    tags: ["Stakeholder Workshops", "Requirements Gathering", "Success Metrics"],
  },
  {
    n: "02",
    title: "Discover the Data",
    description: "Explore available data sources, assess quality, identify gaps, and map lineage from source to insight.",
    tags: ["Data Profiling", "Source Mapping", "Quality Assessment"],
  },
  {
    n: "03",
    title: "Engineer Pipelines",
    description: "Build reliable, automated ETL/ELT pipelines using ADF, dbt, SQLMesh, or PySpark — from raw to clean.",
    tags: ["Azure Data Factory", "dbt / SQLMesh", "PySpark"],
  },
  {
    n: "04",
    title: "Model the Data",
    description: "Design semantic layers, star schemas, and reusable DAX measures that ensure one version of truth.",
    tags: ["Star Schema", "DAX Measures", "Semantic Models"],
  },
  {
    n: "05",
    title: "Build Dashboards",
    description: "Craft executive Power BI reports with clear visual hierarchy, drill-through, and mobile-ready layouts.",
    tags: ["Power BI", "Zebra BI", "Grafana"],
  },
  {
    n: "06",
    title: "Deliver Insights",
    description: "Validate accuracy with SMEs, document data definitions, and drive adoption through user training.",
    tags: ["UAT & Validation", "Documentation", "Training"],
  },
  {
    n: "07",
    title: "Measure Impact",
    description: "Track adoption, time saved, and decision quality. Iterate based on feedback to maximise ROI.",
    tags: ["Adoption Metrics", "ROI Tracking", "Continuous Improvement"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  };
}

export function HowIWorkSection() {
  return (
    <section id="process" className="relative section-padding overflow-hidden">
      <div data-parallax="-40" className="absolute top-0 right-1/3 w-72 h-72 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.15), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">04</span>
          <div className="w-8 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Methodology</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-bold mb-4">
          How I <span className="gradient-text">Deliver Analytics</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          A proven, repeatable framework — from messy business question to executive-grade insight.
        </motion.p>

        {/* Step grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {steps.map((step, i) => {
            const isWide = i === steps.length - 1 && steps.length % 4 !== 0;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" as const }}
                className={`group relative bg-background p-6 transition-colors duration-200 hover:bg-muted/60 ${isWide ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Step number — editorial mono */}
                <span className="font-mono text-sm text-primary block mb-5">
                  {step.n}
                </span>

                {/* Title */}
                <h3 className="font-bold text-foreground text-base mb-2 leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>

                {/* Tags — quiet mono list */}
                <p className="text-[11px] font-mono text-muted-foreground/70 leading-relaxed">
                  {step.tags.join("  ·  ")}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note — sharp editorial rule, no card */}
        <motion.blockquote
          {...fadeUp(0.3)}
          className="mt-14 max-w-2xl border-l-2 border-primary pl-6"
        >
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            Great analytics isn&apos;t about beautiful dashboards — it&apos;s about{" "}
            <span className="font-semibold text-foreground">faster, better decisions</span> for the business.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
