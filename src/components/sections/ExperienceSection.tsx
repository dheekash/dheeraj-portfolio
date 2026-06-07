"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Career Timeline"
          title="Professional"
          titleHighlight="Journey"
          description="A progression from operations through analytics into enterprise data engineering and BI architecture."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex gap-6 lg:gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 hidden sm:flex">
                    <div className={`w-4 h-4 rounded-full border-2 shadow-lg ${
                      exp.endYear === null
                        ? "bg-blue-500 border-blue-400 shadow-blue-500/50"
                        : "bg-muted border-muted-foreground/30"
                    }`} />
                  </div>

                  {/* Card — desktop offset */}
                  <div className={`sm:ml-14 lg:ml-0 w-full lg:w-[calc(50%-2rem)] ${
                    isLeft ? "lg:pr-8" : "lg:pl-8"
                  }`}>
                    <div className="p-6 rounded-2xl border border-white/10 bg-card/60 hover:border-blue-500/30 transition-all group">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-blue-300 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Briefcase size={13} className="text-blue-400" />
                            <span className="text-blue-400 font-medium text-sm">{exp.company}</span>
                          </div>
                        </div>
                        {exp.endYear === null && (
                          <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 border border-blue-500/30 text-blue-300">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-blue-400 mt-0.5 shrink-0 text-xs">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-white/5 border border-white/10 text-muted-foreground">
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
