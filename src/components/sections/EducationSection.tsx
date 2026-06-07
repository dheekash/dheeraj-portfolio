"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { educationList } from "@/data/education";

export function EducationSection() {
  return (
    <section id="education" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Education"
          title="Academic"
          titleHighlight="Foundation"
          description="Formal education in data science and information engineering underpinning 7+ years of professional practice."
        />

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {educationList.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group p-6 rounded-2xl border border-white/10 bg-card/50 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                  <GraduationCap size={22} className="text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {edu.degree}
                  </span>
                  <h3 className="font-bold text-foreground text-lg mt-1 group-hover:text-blue-300 transition-colors">
                    {edu.field}
                  </h3>
                  <p className="font-medium text-muted-foreground text-sm">{edu.institution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-4 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {edu.location}
                </span>
              </div>

              {edu.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {edu.description}
                </p>
              )}

              {edu.achievements && (
                <ul className="space-y-1.5">
                  {edu.achievements.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
