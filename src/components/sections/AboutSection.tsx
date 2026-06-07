"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Target, TrendingUp, Users } from "lucide-react";

const cards = [
  {
    icon: Zap, color: "blue",
    title: "Where it started",
    body: "At Frontizo (an Amazon facility), I discovered a talent for spotting data patterns in customer behaviour — and used them to reduce escalation rates. That curiosity became a career.",
  },
  {
    icon: TrendingUp, color: "amber",
    title: "Scaling at Amazon",
    body: "Four years building forecasting models and executive dashboards. Processed 10M+ records. Identified $500K+ in revenue opportunities. Learned what enterprise-scale BI really demands.",
  },
  {
    icon: Target, color: "violet",
    title: "Engineering the lakehouse",
    body: "At Amplify Analytix I architect Fabric, Databricks, and Snowflake platforms. Migrations that cut failure rates from 12% → 1%. Pipelines from 6-hour latency to 10 minutes.",
  },
  {
    icon: Users, color: "emerald",
    title: "The consulting mindset",
    body: "Every system I build is anchored to a business outcome. I translate complex architectures into executive insights — from the analyst to the boardroom.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400",    glow: "group-hover:shadow-blue-500/10" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400",   glow: "group-hover:shadow-amber-500/10" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-400",  glow: "group-hover:shadow-violet-500/10" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
};

const pillars = [
  "Microsoft Fabric", "Databricks", "Snowflake", "Power BI", "dbt",
  "SQLMesh", "PySpark", "Delta Lake", "Analytics Engineering", "Executive Dashboards",
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle bg blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }} />

      <div className="container-max">
        {/* Section label */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">About Me</span>
        </motion.div>

        {/* Headline */}
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          From Operations to{" "}
          <span className="gradient-text">Enterprise Analytics</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          A 7-year progression from process-driven roles into architecting data platforms that serve global organisations across 15+ markets.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Story cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c, i) => {
              const col = colorMap[c.color];
              return (
                <motion.div
                  key={c.title}
                  {...fadeUp(0.1 + i * 0.08)}
                  className={`group relative p-6 rounded-2xl border ${col.border} bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all hover:scale-[1.01] shadow-xl ${col.glow} hover:shadow-2xl`}
                >
                  <div className={`inline-flex p-2.5 rounded-xl ${col.bg} border ${col.border} mb-4`}>
                    <c.icon size={18} className={col.text} />
                  </div>
                  <h3 className={`font-bold text-foreground mb-2 group-hover:${col.text} transition-colors`}>{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            {/* Pull quote */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative p-7 rounded-2xl overflow-hidden gradient-border bg-card/40 backdrop-blur-sm"
            >
              <div className="absolute top-4 left-6 text-7xl leading-none text-blue-500/10 font-serif select-none">&ldquo;</div>
              <p className="relative text-lg font-medium text-foreground/90 leading-relaxed">
                Data should drive decisions, not just describe them. Every platform I build is
                designed for the business user first — fast, trustworthy, and actionable at
                every level from the analyst to the boardroom.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400">
                <ArrowRight size={14} />
                7+ years · 15+ markets · $800K+ business impact
              </div>
            </motion.div>

            {/* Expertise pills */}
            <motion.div {...fadeUp(0.2)}>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">Core Expertise</p>
              <div className="flex flex-wrap gap-2">
                {pillars.map((p, i) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/8 bg-white/4 text-foreground/75 hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/8 transition-all cursor-default"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Education mini-cards */}
            <motion.div {...fadeUp(0.25)} className="grid grid-cols-2 gap-3">
              {[
                { abbr: "M.Sc.", field: "Data Science", school: "Deakin University" },
                { abbr: "B.E.", field: "Information Science", school: "REVA University" },
              ].map((e) => (
                <div key={e.field} className="p-4 rounded-xl border border-white/8 bg-card/30 text-center hover:border-blue-500/25 transition-colors">
                  <div className="text-2xl font-extrabold gradient-text">{e.abbr}</div>
                  <div className="text-xs font-semibold text-foreground/80 mt-1">{e.field}</div>
                  <div className="text-xs text-muted-foreground">{e.school}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
