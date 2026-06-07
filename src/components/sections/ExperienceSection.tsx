"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

const companyColors: Record<string, { accent: string; glow: string; dot: string }> = {
  "amplify-analytix": { accent: "text-blue-400",    glow: "shadow-blue-500/20",    dot: "bg-blue-500 shadow-blue-500/60" },
  "amazon":           { accent: "text-amber-400",   glow: "shadow-amber-500/15",   dot: "bg-amber-400 shadow-amber-400/50" },
  "frontizo":         { accent: "text-emerald-400", glow: "shadow-emerald-500/15", dot: "bg-emerald-500/70 shadow-emerald-500/30" },
};

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.2), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Career Timeline</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Professional <span className="gradient-text">Journey</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          From operations to enterprise analytics engineering — a progression built on curiosity and measurable impact.
        </motion.p>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-7 top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent" />

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
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" as const }}
                  className="relative flex gap-6 sm:gap-8"
                >
                  {/* Timeline dot */}
                  <div className="relative mt-5 shrink-0">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-background shadow-lg z-10 relative ${col.dot} ${isCurrent ? "ring-2 ring-offset-1 ring-offset-background ring-blue-500/50" : ""}`} />
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 pb-6 group`}>
                    <div className={`p-6 rounded-2xl border border-white/8 bg-card/50 backdrop-blur-sm hover:border-white/14 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl ${col.glow}`}>

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className={`font-extrabold text-foreground text-lg leading-tight group-hover:${col.accent} transition-colors`}>
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Briefcase size={12} className={col.accent} />
                            <span className={`${col.accent} font-semibold text-sm`}>{exp.company}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              Current
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                          )}
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
