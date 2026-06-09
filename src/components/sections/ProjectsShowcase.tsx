"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

/* Card color map */
const CARD_COLORS: Record<string, { border: string; glow: string; tag: string }> = {
  "#3B82F6": { border: "border-blue-500/30",   glow: "rgba(59,130,246,0.18)",   tag: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "#F59E0B": { border: "border-amber-500/30",  glow: "rgba(245,158,11,0.18)",   tag: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  "#8B5CF6": { border: "border-violet-500/30", glow: "rgba(139,92,246,0.18)",   tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  "#10B981": { border: "border-emerald-500/30",glow: "rgba(16,185,129,0.18)",   tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "#F97316": { border: "border-orange-500/30", glow: "rgba(249,115,22,0.18)",   tag: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const colors = CARD_COLORS[project.color] ?? CARD_COLORS["#3B82F6"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" as const }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${colors.glow}` }}
      className={`glass-card glass-highlight flex-shrink-0 w-[340px] sm:w-[400px] rounded-2xl border ${colors.border} p-7 flex flex-col card-depth transition-all duration-300 cursor-pointer group`}
    >
      {/* Number */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono mb-4 block"
        style={{ color: project.color }}>
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3 className="text-xl font-extrabold text-foreground leading-tight mb-2 group-hover:text-blue-200 dark:group-hover:text-blue-200 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{project.subtitle}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {project.metrics.slice(0, 4).map((m) => (
          <div key={m.label} className="rounded-xl border p-3"
            style={{ backgroundColor: `${project.color}0a`, borderColor: `${project.color}22` }}>
            <div className="text-lg font-extrabold leading-none mb-0.5" style={{ color: project.color }}>{m.value}</div>
            <div className="text-[10px] text-muted-foreground font-medium">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.slice(0, 4).map((t) => (
          <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${colors.tag}`}>{t}</span>
        ))}
        {project.techStack.length > 4 && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${colors.tag}`}>+{project.techStack.length - 4}</span>
        )}
      </div>

      {/* Summary */}
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">{project.summary}</p>

      {/* Arrow */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.06]">
        <span className="text-xs font-semibold" style={{ color: project.color }}>View Case Study</span>
        <ArrowRight size={12} style={{ color: project.color }} className="group-hover:translate-x-1 transition-transform" />
        {project.confidential && (
          <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono">Confidential</span>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven horizontal movement */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Map vertical scroll → horizontal translate */
  const cardWidth = 420;
  const gap = 24;
  const totalCards = projects.length;
  const trackWidth = totalCards * cardWidth + (totalCards - 1) * gap;
  const xRange = -(trackWidth - (typeof window !== "undefined" ? window.innerWidth * 0.85 : 1200));

  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);

  return (
    <section id="projects" className="relative">
      {/* ── Sticky scroll container (tall enough for all cards) ── */}
      <div
        ref={containerRef}
        style={{ height: `${totalCards * 100 + 40}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          {/* Header — scrolls with page inside sticky */}
          <div className="container-max px-6 sm:px-10 pt-16 pb-8 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">02</span>
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Case Studies</span>
            </motion.div>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-4xl sm:text-5xl font-bold"
              >
                Featured <span className="gradient-text">Analytics Projects</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm text-muted-foreground font-mono"
              >
                Scroll to explore →
              </motion.p>
            </div>
          </div>

          {/* Horizontal track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-20"
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-blue-500/30 overflow-hidden"
                style={{ width: 32 }}
              >
                <motion.div
                  className="h-full bg-blue-400 rounded-full"
                  style={{
                    scaleX: useTransform(
                      scrollYProgress,
                      [i / totalCards, (i + 1) / totalCards],
                      [0, 1]
                    ),
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
