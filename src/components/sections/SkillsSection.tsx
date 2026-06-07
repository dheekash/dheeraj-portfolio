"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

const colorMap: Record<string, {
  border: string; bg: string; headerBg: string; text: string;
  pill: string; pillText: string; glow: string; bar: string;
}> = {
  blue: {
    border: "border-blue-500/20", bg: "bg-blue-500/5", headerBg: "bg-blue-500/10",
    text: "text-blue-500 dark:text-blue-400", pill: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
    pillText: "text-blue-600 dark:text-blue-300", glow: "hover:shadow-blue-500/10", bar: "bg-blue-500",
  },
  amber: {
    border: "border-amber-500/20", bg: "bg-amber-500/5", headerBg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400", pill: "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
    pillText: "text-amber-700 dark:text-amber-300", glow: "hover:shadow-amber-500/10", bar: "bg-amber-500",
  },
  violet: {
    border: "border-violet-500/20", bg: "bg-violet-500/5", headerBg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400", pill: "bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20",
    pillText: "text-violet-700 dark:text-violet-300", glow: "hover:shadow-violet-500/10", bar: "bg-violet-500",
  },
  emerald: {
    border: "border-emerald-500/20", bg: "bg-emerald-500/5", headerBg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400", pill: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
    pillText: "text-emerald-700 dark:text-emerald-300", glow: "hover:shadow-emerald-500/10", bar: "bg-emerald-500",
  },
  rose: {
    border: "border-rose-500/20", bg: "bg-rose-500/5", headerBg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400", pill: "bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20",
    pillText: "text-rose-700 dark:text-rose-300", glow: "hover:shadow-rose-500/10", bar: "bg-rose-500",
  },
};

const iconMap: Record<string, string> = {
  database: "⬡", "bar-chart-3": "▦", "code-2": "</>", brain: "◈", cloud: "☁",
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      {/* bg accent */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Technical Expertise</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          The Stack Behind <span className="gradient-text">Enterprise Impact</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          A precision toolkit built across 7+ years of enterprise delivery — from raw ingestion to executive dashboards.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {skillCategories.map((cat, ci) => {
            const c = colorMap[cat.color] || colorMap.blue;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: ci * 0.1, ease: "easeOut" as const }}
                className={`group relative rounded-2xl border ${c.border} ${c.bg} overflow-hidden hover:scale-[1.01] transition-all duration-300 hover:shadow-2xl ${c.glow}`}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shimmer rounded-2xl" />

                {/* Header */}
                <div className={`px-5 pt-5 pb-4 border-b ${c.border}`}>
                  <div className={`inline-flex w-10 h-10 items-center justify-center rounded-xl ${c.headerBg} border ${c.border} mb-3 text-lg`}>
                    <span className={c.text}>{iconMap[cat.icon] || "◆"}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{cat.category}</h3>
                  <p className={`text-xs mt-0.5 ${c.text} font-medium`}>{cat.skills.length} technologies</p>
                </div>

                {/* Skills */}
                <div className="p-5 flex flex-wrap gap-2">
                  {cat.skills.map((sk, si) => (
                    <motion.span
                      key={sk.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: ci * 0.08 + si * 0.04 }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${c.pill} ${c.pillText} transition-colors cursor-default`}
                    >
                      {sk.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Experience bar summary */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {[
            { label: "Analytics & BI",       pct: 95, color: "bg-amber-500" },
            { label: "Data Engineering",      pct: 92, color: "bg-blue-500" },
            { label: "Programming / SQL",     pct: 88, color: "bg-violet-500" },
            { label: "Cloud & Infra",         pct: 85, color: "bg-emerald-500" },
            { label: "AI & ML",               pct: 72, color: "bg-rose-500" },
          ].map((bar, i) => (
            <motion.div
              key={bar.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="p-4 rounded-xl border border-border bg-card/30"
            >
              <div className="flex justify-between mb-2">
                <span className="text-xs font-medium text-foreground/80">{bar.label}</span>
                <span className="text-xs text-muted-foreground">{bar.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${bar.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: "easeOut" as const }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
