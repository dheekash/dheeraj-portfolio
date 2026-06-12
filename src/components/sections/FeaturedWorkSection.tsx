"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

/** Before → after deltas distilled from each case study's results. */
const beforeAfter: Record<string, { metric: string; before: string; after: string }> = {
  "real-time-sales-intelligence": {
    metric: "Reporting latency",
    before: "6-hour batch runs",
    after: "Under 10 minutes, live",
  },
  "customer-churn-analytics": {
    metric: "Churn response",
    before: "Reactive, post-cancellation",
    after: "89% recall early warning · $300K saved",
  },
  "fabric-lakehouse-migration": {
    metric: "Pipeline reliability",
    before: "12% monthly failure rate",
    after: "Under 1% · 90% less maintenance",
  },
  "global-manufacturing-analytics": {
    metric: "Dashboard refresh",
    before: "4 hours + 40 manual Excel reports",
    after: "15 minutes, fully automated",
  },
};

function CaseStudy({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const delta = beforeAfter[project.slug];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card card-lift rounded-2xl p-8 lg:p-12 relative overflow-hidden noise"
    >
      {/* Index + title */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-3 tracking-[0.16em]">
            {String(index + 1).padStart(2, "0")}
            {project.confidential && " · CONFIDENTIAL CLIENT"}
          </p>
          <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>
      </div>

      {/* Problem / Solution */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-10">
        <div>
          <p className="eyebrow mb-3">Business problem</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Solution</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Before → After */}
      {delta && (
        <div className="mb-10 rounded-xl border border-border bg-background/50 overflow-hidden">
          <div className="px-6 py-3 border-b border-border">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
              {delta.metric}
            </p>
          </div>
          <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center">
            <div className="px-6 py-5">
              <p className="text-xs text-muted-foreground mb-1">Before</p>
              <p className="text-sm font-medium text-foreground/70 line-through decoration-border decoration-1">
                {delta.before}
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center px-2 text-primary">
              <ArrowRight size={18} />
            </div>
            <div className="px-6 py-5 sm:bg-primary/5">
              <p className="text-xs text-muted-foreground mb-1">After</p>
              <p className="text-sm font-semibold text-primary">{delta.after}</p>
            </div>
          </div>
        </div>
      )}

      {/* Outcome metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden mb-10">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-background px-5 py-4">
            <div className="text-xl font-semibold font-mono tabular-nums text-foreground">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Business impact */}
      <div className="mb-8 pl-5 border-l-2 border-primary/40">
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          {project.businessImpact}
        </p>
      </div>

      {/* Stack */}
      <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed">
        {project.techStack.join("  ·  ")}
      </p>
    </motion.article>
  );
}

export function FeaturedWorkSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="relative">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <p className="eyebrow mb-5">Featured work</p>
          <h2 className="ink-gradient mb-5">Case studies, not screenshots.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each engagement below started with a business problem and ended with
            a measurable outcome a stakeholder signed off on.
          </p>
        </motion.div>

        <div className="space-y-8">
          {featured.map((project, i) => (
            <CaseStudy key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
