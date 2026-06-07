"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Layers, Zap, TrendingUp, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

/* ── Architecture flow diagrams ── */
const archFlows: Record<string, string[]> = {
  "real-time-sales-intelligence": [
    "Amazon/Retail APIs",
    "Azure Data Factory (Ingest)",
    "ADLS Gen2 (Raw Zone)",
    "Databricks PySpark (Transform)",
    "Delta Lake — Silver / Gold",
    "Power BI Semantic Model",
    "Executive Dashboard",
  ],
  "customer-churn-analytics": [
    "CRM + Transactional DB",
    "Python ETL Pipeline",
    "Snowflake Data Warehouse",
    "dbt (Feature Engineering)",
    "Python ML — Churn Model (89% recall)",
    "Power BI — Churn Risk Dashboard",
    "Retention Actions & Alerts",
  ],
  "fabric-lakehouse-migration": [
    "Legacy SQL Server / Data Warehouse",
    "Azure Data Factory (Lift & Shift)",
    "OneLake — Bronze Layer",
    "SQLMesh Transformations",
    "Delta Lake — Silver / Gold",
    "Power BI Direct Lake Mode",
    "Automated Monitoring & Alerts",
  ],
  "global-manufacturing-analytics": [
    "ERP Systems (15 markets)",
    "Azure Data Factory (15 connectors)",
    "Snowflake Data Warehouse",
    "dbt — Medallion Models",
    "Power BI Semantic Model",
    "Role-Level Security (200+ users)",
    "Executive KPI Dashboards",
  ],
  "amazon-sales-forecasting": [
    "Amazon Seller Central Data",
    "Snowflake (10M+ records)",
    "Python — Time-Series Forecasting",
    "dbt — Forecast Tables",
    "Zebra BI + Power BI",
    "DAX — YoY / Rolling Variance",
    "Opportunity Report ($500K+)",
  ],
};

function ArchFlow({ projectId, color }: { projectId: string; color: string }) {
  const nodes = archFlows[projectId];
  if (!nodes) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <Layers size={12} className="text-blue-400" /> Architecture Flow
      </p>
      <div className="rounded-xl border border-border bg-muted/20 p-5">
        <div className="flex flex-col items-center gap-0">
          {nodes.map((node, i) => (
            <div key={node} className="flex flex-col items-center w-full max-w-xs">
              <div
                className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all"
                style={{
                  backgroundColor: i === 0 || i === nodes.length - 1 ? `${color}18` : "transparent",
                  borderColor: i === 0 || i === nodes.length - 1 ? `${color}40` : "var(--border)",
                  color: i === 0 || i === nodes.length - 1 ? color : "var(--muted-foreground)",
                }}
              >
                {node}
              </div>
              {i < nodes.length - 1 && (
                <div className="flex flex-col items-center py-0.5">
                  <div className="w-px h-3" style={{ backgroundColor: `${color}40` }} />
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M0 0L5 6L10 0" fill={`${color}60`} />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/* ── Project card ── */
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const isLarge = index === 0;

  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${isLarge ? "md:col-span-2" : ""}`}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at top left, ${project.color}12, transparent 60%)` }}
      />

      {/* Card body */}
      <div className="relative h-full border border-white/8 bg-card/50 backdrop-blur-sm rounded-2xl p-6 hover:border-white/14 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5">

        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {project.featured && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}35` }}>
                Featured
              </span>
            )}
            {project.confidential && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border border-white/10 bg-white/5 text-muted-foreground">
                Enterprise Engagement
              </span>
            )}
          </div>
          <ArrowRight
            size={16}
            className="text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-blue-200 transition-colors mb-1.5 leading-tight pr-4">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">{project.subtitle}</p>

        {/* Metrics grid */}
        <div className={`grid gap-2 mb-5 ${isLarge ? "grid-cols-4" : "grid-cols-2"}`}>
          {project.metrics.slice(0, isLarge ? 4 : 4).map((m) => (
            <div key={m.label} className="rounded-xl p-3 border border-white/6 bg-white/3 text-center">
              <div className="text-base font-extrabold tabular-nums" style={{ color: project.color }}>{m.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <span key={t} className="text-xs px-2.5 py-0.5 rounded-md border border-white/8 bg-white/4 text-muted-foreground font-medium">
              {t}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-xs px-2.5 py-0.5 rounded-md border border-white/8 bg-white/4 text-muted-foreground">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: project.color }}>
          <ExternalLink size={11} /> View Full Case Study
        </div>
      </div>
    </motion.div>
  );
}

/* ── Modal ── */
function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8 pt-16"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: "easeOut" as const }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#0A0D16] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="relative p-7 border-b border-white/8"
          style={{ background: `linear-gradient(135deg, ${project.color}14 0%, transparent 60%)` }}>
          <button onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all cursor-pointer">
            <X size={18} />
          </button>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.confidential && (
              <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground font-medium">Enterprise Engagement</span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-1">{project.title}</h2>
          <p className="text-muted-foreground text-sm">{project.subtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
                <div className="text-lg font-extrabold" style={{ color: project.color }}>{m.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-7 space-y-7 max-h-[60vh] overflow-y-auto">
          {/* Stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium border border-blue-500/20 bg-blue-500/8 text-blue-300">{t}</span>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Zap size={12} className="text-amber-400" /> Business Problem
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Layers size={12} className="text-blue-400" /> Solution Design
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>

          {/* Architecture flow diagram */}
          <ArchFlow projectId={project.id} color={project.color} />

          {/* Challenges */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Challenges</p>
            <ul className="space-y-2">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="text-blue-400/70 mt-0.5 shrink-0">→</span>{c}
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <TrendingUp size={12} className="text-emerald-400" /> Results & Impact
            </p>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>{r}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact box */}
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Business Impact</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.businessImpact}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Featured Projects</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Enterprise Analytics <span className="gradient-text">Case Studies</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Real-world solutions delivering measurable business impact across global organisations.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => setActive(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Modal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
