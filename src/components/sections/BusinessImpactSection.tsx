"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2 } from "lucide-react";

const impacts = [
  {
    company: "Amazon",
    period: "2020 – 2024",
    role: "Investigation Specialist & Analytics Lead",
    monogram: "AMZ",
    color: "#F59E0B",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    results: [
      "Built Sales Forecasting Dashboard processing 10M+ records, identifying $500K+ revenue opportunities",
      "Designed Power BI dashboards adopted by senior leadership across 8 regional markets",
      "Developed predictive analytics models reducing investigation backlog significantly",
      "Led analytics workstream for cross-functional investigation teams of 20+ members",
    ],
  },
  {
    company: "Amplify Analytix",
    period: "2025 – Present",
    role: "BI & Analytics Engineer",
    monogram: "AA",
    color: "#3B82F6",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    results: [
      "Architected Microsoft Fabric Lakehouse reducing pipeline failure rate from 12% to under 1%",
      "Delivered 20+ executive dashboards across global clients in 15 markets",
      "Implemented SQLMesh transformations cutting maintenance overhead by 90%",
      "Engineered Power BI semantic models with 100+ DAX measures for 200+ end users",
    ],
  },
  {
    company: "Enterprise Clients",
    period: "Consulting",
    role: "Analytics Consultant",
    monogram: "EC",
    color: "#10B981",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    results: [
      "Delivered Customer Churn model with 89% recall — saved clients $300K+ annually",
      "Built Global Manufacturing Analytics Suite serving 15 countries, 200+ users",
      "Reduced stakeholder reporting refresh time from 4 hours to 15 minutes",
      "Supported data-driven decision making for 20+ senior stakeholders internationally",
    ],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

export function BusinessImpactSection() {
  return (
    <section id="impact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-mono">Proven Results</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="font-extrabold tracking-tight mb-4">
          Business <span className="gradient-text">Impact</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Measurable outcomes delivered across Amazon, consulting engagements, and enterprise analytics engineering.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {impacts.map((imp, i) => (
            <motion.div
              key={imp.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              className={`relative rounded-2xl border ${imp.border} ${imp.bg} p-6 card-depth`}
            >
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md"
                  style={{ backgroundColor: imp.color }}
                >
                  {imp.monogram}
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground leading-tight">{imp.company}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{imp.role}</p>
                  <span
                    className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{ color: imp.color, borderColor: `${imp.color}40`, backgroundColor: `${imp.color}12` }}
                  >
                    {imp.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {imp.results.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-muted-foreground leading-snug">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: imp.color }} />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-5 right-5 opacity-8" aria-hidden>
                <TrendingUp size={40} style={{ color: imp.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Why Companies Hire Me — compact strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
          className="rounded-2xl border border-border bg-card/40 p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">Why Companies Hire Me</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { text: "End-to-End Analytics Delivery",    color: "#3B82F6" },
              { text: "Executive Reporting at Scale",       color: "#F59E0B" },
              { text: "Power BI & Fabric Certified",        color: "#8B5CF6" },
              { text: "Data Engineering Expertise",         color: "#10B981" },
              { text: "Stakeholder Management",             color: "#06B6D4" },
              { text: "Cloud-Native Architecture",          color: "#EF4444" },
            ].map((r) => (
              <div key={r.text} className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                <CheckCircle2 size={14} className="shrink-0" style={{ color: r.color }} />
                <span className="text-sm font-medium text-foreground/80">{r.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
