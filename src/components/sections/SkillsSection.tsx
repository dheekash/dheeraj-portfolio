"use client";

import { motion } from "framer-motion";
import { Database, BarChart3, Code2, Brain } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  database: Database,
  "bar-chart-3": BarChart3,
  "code-2": Code2,
  brain: Brain,
};

const colorMap: Record<string, { border: string; bg: string; text: string; pill: string; pillText: string }> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    text: "text-blue-400",
    pill: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
    pillText: "text-blue-300",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
    pill: "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
    pillText: "text-amber-300",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-400",
    pill: "bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20",
    pillText: "text-violet-300",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
    pill: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
    pillText: "text-emerald-300",
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Technical Expertise"
          title="The Stack Behind"
          titleHighlight="Enterprise Impact"
          description="A curated toolkit built across 7+ years of delivering lakehouse architectures, BI solutions, and analytics engineering at enterprise scale."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const Icon = iconMap[cat.icon] || Database;
            const colors = colorMap[cat.color] || colorMap.blue;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} group hover:scale-[1.01] transition-all`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{cat.category}</h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.04 }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${colors.pill} ${colors.pillText} transition-colors cursor-default`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
