"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Animated counter ── */
function AnimCount({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{val}{suffix}</>;
}

/* ── KPI tile ── */
function KpiTile({ value, suffix, label, color, delay, icon }: {
  value: number; suffix: string; label: string; color: string; delay: number; icon: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" as const }}
      className="relative rounded-2xl border p-4 overflow-hidden group cursor-default"
      style={{ backgroundColor: `${color}0e`, borderColor: `${color}28` }}
      whileHover={{ y: -3, boxShadow: `0 12px 32px ${color}22` }}
    >
      {/* glow */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ background: color }} />
      <div className="flex items-start justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse mt-1" style={{ backgroundColor: color }} />
      </div>
      <div className="text-2xl font-black leading-none mb-1" style={{ color }}>
        <AnimCount target={value} suffix={suffix} duration={1800 + delay * 400} />
      </div>
      <p className="text-[11px] text-muted-foreground font-medium leading-tight">{label}</p>
    </motion.div>
  );
}

/* ── Insight widget ── */
function InsightWidget({ title, items, color, delay }: {
  title: string; items: string[]; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" as const }}
      className="rounded-xl border p-4"
      style={{ backgroundColor: `${color}08`, borderColor: `${color}22` }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color }}>{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[11px] text-muted-foreground font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Mini bar chart ── */
function MiniBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-muted-foreground">{label}</span>
        <span className="text-[10px] font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" as const }}
        />
      </div>
    </div>
  );
}

/* ── Main component ── */
export function AnalyticsCommandCenter() {
  const kpis = [
    { value: 7,   suffix: "+",   label: "Years Experience",      color: "#3B82F6", icon: "⚡", delay: 0.3  },
    { value: 50,  suffix: "+",   label: "Dashboards Delivered",  color: "#F59E0B", icon: "▦",  delay: 0.4  },
    { value: 100, suffix: "M+",  label: "Records Processed",     color: "#29B5E8", icon: "◈",  delay: 0.5  },
    { value: 13,  suffix: "",    label: "Certifications",         color: "#10B981", icon: "★",  delay: 0.6  },
    { value: 8,   suffix: "+",   label: "Global Markets",         color: "#8B5CF6", icon: "🌐", delay: 0.7  },
    { value: 20,  suffix: "+",   label: "Stakeholders Served",    color: "#EC4899", icon: "◎",  delay: 0.8  },
  ];

  return (
    <div className="relative w-full max-w-[520px] xl:max-w-[580px]">

      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-xl border border-white/[0.09] backdrop-blur-sm"
        style={{ background: "rgba(59,130,246,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Analytics Command Center</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
          LIVE
        </div>
      </motion.div>

      {/* KPI grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {kpis.map((k) => <KpiTile key={k.label} {...k} />)}
      </div>

      {/* Skill bars */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="rounded-xl border border-white/[0.08] p-4 mb-4 backdrop-blur-sm"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400/80 mb-3">Core Expertise</p>
        <div className="space-y-3">
          <MiniBar label="Power BI & DAX" pct={95} color="#F2C811" />
          <MiniBar label="Azure / Microsoft Fabric" pct={90} color="#0067C0" />
          <MiniBar label="SQL & Data Modelling" pct={92} color="#29B5E8" />
          <MiniBar label="Python & PySpark" pct={80} color="#4B8BBE" />
        </div>
      </motion.div>

      {/* Insight widgets row */}
      <div className="grid grid-cols-3 gap-3">
        <InsightWidget
          title="Automation"
          items={["75% Less Manual Work", "20+ Pipelines", "Real-Time Alerts"]}
          color="#10B981"
          delay={1.0}
        />
        <InsightWidget
          title="Stakeholders"
          items={["C-Suite Reporting", "Multi-Region", "Cross-Functional"]}
          color="#8B5CF6"
          delay={1.1}
        />
        <InsightWidget
          title="Data Scale"
          items={["Enterprise Datasets", "Multi-Source", "100M+ Records"]}
          color="#F59E0B"
          delay={1.2}
        />
      </div>
    </div>
  );
}
