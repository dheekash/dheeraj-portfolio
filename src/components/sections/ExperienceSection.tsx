"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { experiences } from "@/data/experience";

function getDuration(startYear: number, endYear: number | null): string {
  const end = endYear ?? new Date().getFullYear();
  const diff = end - startYear;
  if (diff < 1) return "< 1 yr";
  if (diff === 1) return "1 yr";
  return `${diff}+ yrs`;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

const companyColors: Record<string, { accent: string; glow: string; dot: string; border: string; bg: string }> = {
  "amplify-analytix": { accent: "text-blue-500 dark:text-blue-400",      glow: "shadow-blue-500/20",    dot: "bg-blue-500 shadow-blue-500/60",    border: "border-blue-500/25",   bg: "bg-blue-500/4" },
  "amazon":           { accent: "text-amber-500 dark:text-amber-400",     glow: "shadow-amber-500/20",   dot: "bg-amber-400 shadow-amber-400/60",  border: "border-amber-500/25",  bg: "bg-amber-500/4" },
  "frontizo":         { accent: "text-emerald-500 dark:text-emerald-400", glow: "shadow-emerald-500/20", dot: "bg-emerald-500 shadow-emerald-500/60", border: "border-emerald-500/25", bg: "bg-emerald-500/4" },
};

const companyLogos: Record<string, { monogram: string; bg: string; text: string; border: string }> = {
  "amplify-analytix": {
    monogram: "AA",
    bg: "bg-blue-600",
    text: "text-white",
    border: "ring-2 ring-blue-400/30",
  },
  "amazon": {
    monogram: "AMZ",
    bg: "bg-amber-500",
    text: "text-white",
    border: "ring-2 ring-amber-400/30",
  },
  "frontizo": {
    monogram: "FR",
    bg: "bg-emerald-600",
    text: "text-white",
    border: "ring-2 ring-emerald-400/30",
  },
};

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
      <div data-parallax="-35" className="absolute top-1/2 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">01</span>
          <div className="w-8 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Career Timeline</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-bold mb-4">
          Professional <span className="gradient-text">Journey</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          From operations to enterprise analytics engineering — a progression built on curiosity and measurable impact.
        </motion.p>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line — scroll-driven grow from top */}
          <div className="absolute left-5 sm:left-7 top-3 bottom-3 w-px overflow-hidden">
            {/* Static faint track so the line has something to grow over */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-blue-500/8 to-transparent" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-blue-500/60 via-blue-500/30 to-transparent"
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const col = companyColors[exp.id] || companyColors["frontizo"];
              const isCurrent = exp.endYear === null;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" as const }}
                  className="relative flex gap-6 sm:gap-8"
                >
                  {/* Timeline dot */}
                  <div className="relative mt-5 shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: i * 0.15 + 0.2,
                      }}
                      className="relative z-10"
                    >
                      {isCurrent ? (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className={`w-3.5 h-3.5 rounded-full border-2 border-background shadow-lg ${col.dot} ring-2 ring-offset-1 ring-offset-background ring-blue-500/50`}
                        />
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border-2 border-background shadow-lg ${col.dot}`} />
                      )}
                    </motion.div>
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 pb-6 group`}>
                    <div className={`glass-card glass-highlight p-6 rounded-2xl border ${col.border} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl card-depth ${col.glow}`}>

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex gap-3 items-start">
                          {/* Company logo monogram */}
                          {(() => {
                            const logo = companyLogos[exp.id];
                            return logo ? (
                              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${logo.bg} ${logo.text} ${logo.border} mt-0.5`}>
                                {logo.monogram}
                              </div>
                            ) : null;
                          })()}
                          <div>
                            <h3 className="font-extrabold text-foreground text-base leading-tight">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Briefcase size={11} className={col.accent} />
                              <span className={`${col.accent} font-semibold text-sm`}>{exp.company}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              Current
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                          )}
                          {/* Duration badge */}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${col.border} ${col.accent}`}>
                            <Clock size={9} />
                            {getDuration(exp.startYear, exp.endYear)}
                          </span>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />{exp.location}
                        </span>
                        {isCurrent && <span className="font-mono text-muted-foreground/70">{exp.period}</span>}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-5">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm text-muted-foreground">
                            <span className={`${col.accent} mt-0.5 shrink-0 opacity-70 text-xs`}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tech pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-xs border border-white/8 bg-white/4 text-muted-foreground font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
