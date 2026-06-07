"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ZoomIn, BarChart2, Monitor } from "lucide-react";
import { dashboards, type Dashboard } from "@/data/dashboards";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

/* ── Placeholder frame ── */
function DashboardPlaceholder({ dashboard, onClick }: { dashboard: Dashboard; onClick: () => void }) {
  return (
    <motion.div
      {...fadeUp(0)}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "16/9" }}
    >
      {/* Gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${dashboard.color}10 0%, ${dashboard.color}06 50%, transparent 100%)`,
        }}
      />
      <div className="absolute inset-0 border border-border rounded-2xl group-hover:border-blue-500/40 transition-colors duration-300" />

      {/* Mock dashboard chrome */}
      <div className="absolute inset-0 p-4 flex flex-col gap-3">
        {/* Titlebar */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
          </div>
          <div className="flex-1 h-4 rounded bg-muted/60 ml-2 max-w-[140px]" />
          <div className="w-16 h-4 rounded bg-muted/40" />
        </div>

        {/* Mock KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[dashboard.color, `${dashboard.color}99`, `${dashboard.color}66`].map((c, i) => (
            <div key={i} className="rounded-lg p-2 border border-border bg-card/50">
              <div className="w-8 h-2 rounded-full mb-1.5" style={{ backgroundColor: `${c}60` }} />
              <div className="w-14 h-3 rounded-full font-bold" style={{ backgroundColor: c }} />
            </div>
          ))}
        </div>

        {/* Mock chart area */}
        <div className="flex-1 rounded-xl border border-border bg-card/30 relative overflow-hidden p-3 flex items-end gap-1">
          {[45, 72, 55, 88, 63, 94, 78, 82, 60, 91, 74, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm opacity-70"
              style={{
                height: `${h}%`,
                backgroundColor: dashboard.color,
                opacity: 0.3 + (i / 20),
              }}
            />
          ))}
          {/* Trend line overlay */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <polyline
              points="0,70 8,55 17,60 25,40 33,45 42,25 50,35 58,28 67,32 75,18 83,22 92,15 100,10"
              fill="none"
              stroke={dashboard.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: 0.7 }}
            />
          </svg>
        </div>

        {/* Second row: table + donut mock */}
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3 rounded-lg border border-border bg-card/30 p-2 space-y-1.5">
            {[80, 60, 70, 50].map((w, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-12 h-2 rounded bg-muted/60 flex-shrink-0" />
                <div className="h-2 rounded" style={{ width: `${w}%`, backgroundColor: `${dashboard.color}50` }} />
              </div>
            ))}
          </div>
          <div className="col-span-2 rounded-lg border border-border bg-card/30 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-12 h-12">
              <circle cx="20" cy="20" r="15" fill="none" stroke={`${dashboard.color}20`} strokeWidth="8" />
              <circle cx="20" cy="20" r="15" fill="none" stroke={dashboard.color} strokeWidth="8"
                strokeDasharray="60 35" strokeDashoffset="15" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <div className="flex items-center gap-2 text-white text-sm font-semibold">
          <ZoomIn size={16} />
          View Details
        </div>
      </div>

      {/* Placeholder badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold bg-black/40 backdrop-blur-sm text-white/70 border border-white/10">
        <Upload size={9} />
        Add Screenshot
      </div>
    </motion.div>
  );
}

/* ── Detail modal ── */
function DashboardModal({ dashboard, onClose }: { dashboard: Dashboard; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" as const }}
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-7 border-b border-border"
          style={{ background: `linear-gradient(135deg, ${dashboard.color}12 0%, transparent 60%)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
              style={{ backgroundColor: `${dashboard.color}15`, borderColor: `${dashboard.color}30` }}
            >
              {dashboard.placeholderIcon}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">{dashboard.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{dashboard.description}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {dashboard.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-background/50 border border-border text-center">
                <div className="text-lg font-extrabold" style={{ color: dashboard.color }}>{m.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot placeholder */}
        <div className="p-7">
          <div
            className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-16 gap-4 bg-muted/30"
            style={{ borderColor: `${dashboard.color}30` }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${dashboard.color}15` }}
            >
              <Monitor size={28} style={{ color: dashboard.color }} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground mb-1">Dashboard Screenshot</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Replace this placeholder with a real screenshot by adding an image to{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                  /public/dashboards/{dashboard.id}.png
                </code>
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {dashboard.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  color: dashboard.color,
                  backgroundColor: `${dashboard.color}10`,
                  borderColor: `${dashboard.color}25`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DashboardGallerySection() {
  const [active, setActive] = useState<Dashboard | null>(null);

  return (
    <section id="dashboards" className="section-padding relative overflow-hidden">
      {/* bg accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)" }} />

      <div className="container-max">
        {/* Header */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500 font-mono">Dashboard Portfolio</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Enterprise <span className="gradient-text">Dashboard Gallery</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
          Production dashboards built for executive stakeholders, sales leadership, and operational teams across global organisations.
        </motion.p>

        {/* Upload note */}
        <motion.div {...fadeUp(0.12)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium mb-12">
          <Upload size={12} />
          Add real screenshots to <code className="font-mono bg-amber-500/10 px-1 rounded">/public/dashboards/</code> to replace these placeholders
        </motion.div>

        {/* Featured dashboard — full width */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-6"
        >
          <div className="rounded-2xl border border-border bg-card/40 overflow-hidden card-depth">
            {/* Featured badge */}
            <div className="px-5 pt-4 pb-0 flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-500">
                ★ Featured Dashboard
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">{dashboards[0].description}</span>
            </div>
            {/* Larger 16/7 placeholder */}
            <div style={{ aspectRatio: "21/9" }}>
              <DashboardPlaceholder dashboard={dashboards[0]} onClick={() => setActive(dashboards[0])} />
            </div>
            <div className="px-5 py-4 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-foreground text-base mb-1.5 leading-tight">{dashboards[0].title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {dashboards[0].tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-border bg-muted/50 text-muted-foreground font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => setActive(dashboards[0])}
                className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer">
                <BarChart2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Remaining dashboards — 2-col grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {dashboards.slice(1).map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08, ease: "easeOut" as const }}
            >
              <div className="h-full rounded-2xl border border-border bg-card/40 overflow-hidden card-depth">
                <DashboardPlaceholder dashboard={d} onClick={() => setActive(d)} />
                <div className="px-5 py-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1 leading-tight">{d.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {d.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-border bg-muted/50 text-muted-foreground font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setActive(d)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer">
                    <BarChart2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon row */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-6 flex items-center gap-3 p-5 rounded-2xl border border-dashed border-border bg-muted/20"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Monitor size={18} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">More dashboards coming soon</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Additional enterprise dashboards — Tableau, Grafana, and Fabric — will be added here. Add screenshots to{" "}
              <code className="font-mono text-[11px] bg-muted px-1 rounded">/public/dashboards/</code> to activate them.
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <DashboardModal dashboard={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
