"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ExternalLink, TrendingUp, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/common/SectionHeader";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="text-lg font-bold text-blue-300">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-12"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-card overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-8 bg-gradient-to-br ${project.gradient} border-b border-white/10`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              {project.confidential && (
                <Badge variant="secondary" className="mb-3 text-xs bg-white/10 text-muted-foreground">
                  Enterprise Engagement
                </Badge>
              )}
              <h2 className="text-2xl font-bold text-foreground mb-2">{project.title}</h2>
              <p className="text-muted-foreground">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all shrink-0 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {project.metrics.map((m) => (
              <MetricCard key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Tech stack */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Business problem */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap size={14} className="text-amber-400" /> Business Problem
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers size={14} className="text-blue-400" /> Solution Design
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>

          {/* Architecture placeholder */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Architecture Diagram</h3>
            <div className="rounded-xl border border-dashed border-white/20 bg-white/3 p-8 flex flex-col items-center justify-center text-center gap-2">
              <Layers size={28} className="text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground/60">Architecture diagram placeholder</p>
              <p className="text-xs text-muted-foreground/40">Replace with actual architecture diagram</p>
            </div>
          </div>

          {/* Key challenges */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Challenges</h3>
            <ul className="space-y-2">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-400 mt-1 shrink-0">→</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" /> Results & Impact
            </h3>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-emerald-400 mt-1 shrink-0">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Business impact */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="text-sm font-semibold text-emerald-400 mb-2">Business Impact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.businessImpact}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Enterprise Analytics"
          titleHighlight="Case Studies"
          description="Real-world solutions delivering measurable business impact across global organizations."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl border border-white/10 bg-card hover:border-white/20 transition-all cursor-pointer bg-gradient-to-br ${project.gradient}`}
              onClick={() => setSelected(project)}
            >
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-medium">
                    Featured
                  </span>
                </div>
              )}

              <h3 className="font-bold text-foreground text-lg mb-2 pr-16 group-hover:text-blue-300 transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {project.summary}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {project.metrics.slice(0, 4).map((m) => (
                  <div key={m.label} className="p-2 rounded-lg bg-white/5 border border-white/8">
                    <div className="text-sm font-bold" style={{ color: project.color }}>{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                    {t}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 font-medium">
                View Case Study
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
