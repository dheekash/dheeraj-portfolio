"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const companies = [
  {
    name: "Amazon",
    role: "Business Analyst",
    period: "2023 – Present",
    color: "#FF9900",
    description: "Enterprise analytics at scale — EU retail & 3P seller insights across Fabric & Power BI.",
    initials: "A",
  },
  {
    name: "Amplify Analytix",
    role: "Data & Analytics Consultant",
    period: "2022 – 2023",
    color: "#3B82F6",
    description: "Built end-to-end BI solutions for retail and e-commerce clients from scratch.",
    initials: "AA",
  },
  {
    name: "Frontizo",
    role: "Business Analyst",
    period: "2021 – 2022",
    color: "#10B981",
    description: "Delivered customer intelligence and operational dashboards in a fast-paced startup.",
    initials: "F",
  },
];

export function CompanyRecognitionStrip() {
  return (
    <section className="relative py-10 overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-8"
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
              <Briefcase size={12} />
              <span>Professional Experience Across</span>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-border to-transparent" />
          </div>

          {/* Company cards strip */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
            {companies.map((co, i) => (
              <motion.div
                key={co.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" as const }}
                className="glass-card glass-highlight flex-1 rounded-2xl border p-4 card-depth group cursor-default
                  transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: `${co.color}25` }}
                whileHover={{ boxShadow: `0 12px 36px ${co.color}18` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Logo avatar */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg"
                    style={{ backgroundColor: co.color }}
                  >
                    {co.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-sm text-foreground leading-tight truncate group-hover:text-blue-200 transition-colors">
                      {co.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">{co.period}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md border mb-2 inline-block"
                  style={{
                    color: co.color,
                    backgroundColor: `${co.color}12`,
                    borderColor: `${co.color}28`,
                  }}
                >
                  {co.role}
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{co.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
