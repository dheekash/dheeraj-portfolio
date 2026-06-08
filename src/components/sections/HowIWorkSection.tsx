"use client";

import { motion } from "framer-motion";
import {
  Search, Wrench, Database, LayoutDashboard,
  Lightbulb, TrendingUp, Target,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Target,
    title: "Define the Problem",
    description: "Align with stakeholders on business questions, success metrics, and the decision the data needs to support.",
    color: "#3B82F6",
    tags: ["Stakeholder Workshops", "Requirements Gathering", "Success Metrics"],
  },
  {
    n: "02",
    icon: Search,
    title: "Discover the Data",
    description: "Explore available data sources, assess quality, identify gaps, and map lineage from source to insight.",
    color: "#6366F1",
    tags: ["Data Profiling", "Source Mapping", "Quality Assessment"],
  },
  {
    n: "03",
    icon: Wrench,
    title: "Engineer Pipelines",
    description: "Build reliable, automated ETL/ELT pipelines using ADF, dbt, SQLMesh, or PySpark — from raw to clean.",
    color: "#29B5E8",
    tags: ["Azure Data Factory", "dbt / SQLMesh", "PySpark"],
  },
  {
    n: "04",
    icon: Database,
    title: "Model the Data",
    description: "Design semantic layers, star schemas, and reusable DAX measures that ensure one version of truth.",
    color: "#FF694B",
    tags: ["Star Schema", "DAX Measures", "Semantic Models"],
  },
  {
    n: "05",
    icon: LayoutDashboard,
    title: "Build Dashboards",
    description: "Craft executive Power BI reports with clear visual hierarchy, drill-through, and mobile-ready layouts.",
    color: "#F2C811",
    tags: ["Power BI", "Zebra BI", "Grafana"],
  },
  {
    n: "06",
    icon: Lightbulb,
    title: "Deliver Insights",
    description: "Validate accuracy with SMEs, document data definitions, and drive adoption through user training.",
    color: "#10B981",
    tags: ["UAT & Validation", "Documentation", "Training"],
  },
  {
    n: "07",
    icon: TrendingUp,
    title: "Measure Impact",
    description: "Track adoption, time saved, and decision quality. Iterate based on feedback to maximise ROI.",
    color: "#8B5CF6",
    tags: ["Adoption Metrics", "ROI Tracking", "Continuous Improvement"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function HowIWorkSection() {
  return (
    <section id="process" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500 font-mono">Methodology</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          How I <span className="gradient-text">Deliver Analytics</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          A proven, repeatable framework — from messy business question to executive-grade insight.
        </motion.p>

        {/* Step grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isWide = i === steps.length - 1 && steps.length % 4 !== 0;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" as const }}
                className={`glass-card glass-highlight relative rounded-2xl p-6 border card-depth group cursor-default
                  transition-all duration-300 hover:-translate-y-1.5 ${isWide ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ borderColor: `${step.color}25` }}
                whileHover={{ boxShadow: `0 16px 48px ${step.color}20` }}
              >
                {/* Step number — large background */}
                <span
                  className="absolute top-4 right-5 text-5xl font-black opacity-[0.07] select-none pointer-events-none"
                  style={{ color: step.color }}
                >
                  {step.n}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}30` }}
                >
                  <Icon size={20} style={{ color: step.color }} />
                </div>

                {/* Number badge */}
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block"
                  style={{ color: step.color }}
                >
                  Step {step.n}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-foreground text-base mb-2 leading-tight group-hover:text-blue-200 dark:group-hover:text-blue-200 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                      style={{
                        color: step.color,
                        backgroundColor: `${step.color}12`,
                        borderColor: `${step.color}28`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom quote */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 glass-card rounded-2xl border border-violet-500/20 px-8 py-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-base sm:text-lg text-foreground/80 italic leading-relaxed">
            &ldquo;Great analytics isn&apos;t just about beautiful dashboards — it&apos;s about{" "}
            <span className="text-violet-400 font-semibold not-italic">faster, better decisions</span> for the business.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
