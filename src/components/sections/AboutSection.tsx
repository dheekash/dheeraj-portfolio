"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, BarChart3, Brain, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

const story = [
  {
    icon: Users,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Where it started",
    body: "My journey began at Frontizo Business Services, an Amazon-operated facility, where I developed a deep appreciation for process excellence and data-driven decision making. Spotting patterns in customer behaviour and using data to reduce escalations planted the seed for what came next.",
  },
  {
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    title: "Scaling at Amazon",
    body: "At Amazon, I evolved from operations into an analytics lead, building self-service reporting tools, forecasting models, and executive dashboards that processed 10M+ records and identified $500K+ in revenue opportunities. I learned what enterprise-scale BI really means — precision, reliability, and stakeholder trust.",
  },
  {
    icon: Database,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "Engineering the modern stack",
    body: "Now at Amplify Analytix, I architect Lakehouse platforms on Microsoft Fabric, Databricks, and Snowflake. I have delivered solutions spanning 15 global markets, migrated legacy warehouses to Delta Lake, and built ML-powered pipelines that generate measurable business impact — $300K in savings, 90% maintenance reductions, sub-10-minute latency.",
  },
  {
    icon: Brain,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "The consulting mindset",
    body: "What sets my work apart is that I do not just build pipelines — I solve business problems. Every architecture decision, every DAX measure, every data model is anchored to a business outcome. I translate complex technical systems into executive-level insights that drive real decisions.",
  },
];

const pillars = [
  "Lakehouse Architecture",
  "Microsoft Fabric",
  "Databricks",
  "Snowflake",
  "Power BI & DAX",
  "dbt & SQLMesh",
  "PySpark",
  "Analytics Engineering",
  "Executive Dashboards",
  "Stakeholder Management",
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="About Me"
          title="From Operations to"
          titleHighlight="Enterprise Analytics"
          description="A 7-year progression from process-driven roles to architecting enterprise-grade data platforms that serve global organizations."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Story cards */}
          <div className="space-y-4">
            {story.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-4 p-5 rounded-2xl border border-white/8 bg-card/50 hover:border-blue-500/30 hover:bg-card transition-all"
              >
                <div className={`mt-0.5 p-2.5 rounded-xl ${item.bg} shrink-0`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-foreground mb-2">Core Philosophy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Data should drive decisions, not just describe them. Every platform I build is
                designed for the business user first — fast, trustworthy, and actionable at every
                level from the analyst to the boardroom.
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-medium">
                <ArrowRight size={14} />
                7+ years of enterprise delivery
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-foreground mb-4">Expertise Pillars</h3>
              <div className="flex flex-wrap gap-2">
                {pillars.map((p, i) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-foreground/80 hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/10 transition-all cursor-default"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "M.Sc.", label: "Data Science", sub: "Deakin University" },
                { value: "B.E.", label: "Information Science", sub: "REVA University" },
              ].map((edu) => (
                <div key={edu.label} className="p-4 rounded-xl border border-white/8 bg-card/30 text-center">
                  <div className="text-xl font-bold text-blue-400">{edu.value}</div>
                  <div className="text-xs font-medium text-foreground mt-1">{edu.label}</div>
                  <div className="text-xs text-muted-foreground">{edu.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
