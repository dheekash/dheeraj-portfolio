"use client";

import { motion } from "framer-motion";

const impacts = [
  {
    company: "Amplify Analytix",
    period: "Jan 2025 – Present",
    role: "BI & Analytics Engineer",
    results: [
      "Architected Microsoft Fabric Lakehouse reducing pipeline failure rate from 12% to under 1%",
      "Delivered 50+ executive dashboards across global clients in 8 markets",
      "Implemented SQLMesh transformations cutting maintenance overhead by 90%",
      "Engineered Power BI semantic models with 100+ DAX measures for 200+ end users",
    ],
  },
  {
    company: "Amazon",
    period: "2020 – Dec 2024",
    role: "Investigation Specialist & Analytics Lead",
    results: [
      "Built Sales Forecasting Dashboard processing 100M+ records, identifying $500K+ revenue opportunities",
      "Designed Power BI dashboards adopted by senior leadership across 8 markets",
      "Developed predictive analytics models reducing investigation backlog significantly",
      "Led analytics workstream for cross-functional investigation teams of 20+ members",
    ],
  },
  {
    company: "Enterprise Clients",
    period: "Consulting",
    role: "Analytics Consultant",
    results: [
      "Delivered Customer Churn model with 89% recall — saved clients $300K+ annually",
      "Built Global Manufacturing Analytics Suite serving 8 countries, 200+ users",
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
      <div data-parallax="-40" className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">03</span>
          <div className="w-8 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Proven Results</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="font-bold mb-4">
          Business <span className="gradient-text">Impact</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Measurable outcomes delivered across Amazon, consulting engagements, and enterprise analytics engineering.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {impacts.map((imp, i) => (
            <motion.div
              key={imp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" as const }}
              className="bg-background p-7 transition-colors duration-200 hover:bg-muted/60"
            >
              <p className="font-mono text-xs text-muted-foreground mb-1">{imp.period}</p>
              <h3 className="font-bold text-foreground text-lg leading-tight">{imp.company}</h3>
              <p className="text-sm text-muted-foreground mb-6">{imp.role}</p>
              <ul className="space-y-3.5">
                {imp.results.map((r) => (
                  <li key={r} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border">
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
