"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

/* ══════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════ */
const roles = [
  "BI & Analytics Engineer",
  "Lakehouse Architect",
  "Power BI Developer",
  "Databricks Engineer",
  "Analytics Consultant",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[idx];
    const speed = deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => (i + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  return (
    <span className="gradient-text font-bold">
      {text}
      <span className="animate-[typewriter-blink_1s_step-end_infinite] ml-0.5 text-blue-400">|</span>
    </span>
  );
}

/* ══════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════ */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    let frame = 0;
    const total = 80;
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 3);
      setCount(value.includes(".") ? (num * ease).toFixed(1) : Math.floor(num * ease).toString());
      if (frame >= total) { setCount(value); clearInterval(id); }
    }, 20);
    return () => clearInterval(id);
  }, [started, value]);

  return <div ref={ref}>{count}{suffix}</div>;
}

/* ══════════════════════════════════════════════
   DATA FLOW — animated traveling dots on connectors
══════════════════════════════════════════════ */
const flowNodes = [
  { label: "Raw Data Sources",   color: "#64748B" },
  { label: "ETL / ADF Pipeline", color: "#3B82F6" },
  { label: "Snowflake / Fabric", color: "#29B5E8" },
  { label: "dbt / SQLMesh",      color: "#FF694B" },
  { label: "Power BI Model",     color: "#F2C811" },
  { label: "Executive Insights", color: "#10B981" },
];

function DataFlow() {
  return (
    <div className="flex flex-col items-center gap-0 w-48">
      {flowNodes.map((node, i) => (
        <div key={node.label} className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.35, ease: "easeOut" as const }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border bg-background/80 dark:bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            {/* Colored dot indicator */}
            <span className="w-2 h-2 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: node.color, boxShadow: `0 0 6px ${node.color}60` }} />
            <span className="text-[11px] font-semibold text-foreground/75 group-hover:text-foreground transition-colors leading-tight">
              {node.label}
            </span>
          </motion.div>

          {/* Connector with animated traveling dot */}
          {i < flowNodes.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 + i * 0.12 }}
              className="relative flex flex-col items-center"
            >
              {/* Static line */}
              <div className="w-px h-5 bg-gradient-to-b from-border to-border/40" />

              {/* Traveling dot */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: flowNodes[i + 1].color }}
                animate={{ y: [0, 20], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.23,
                  ease: "easeIn",
                  times: [0, 0.15, 0.85, 1],
                }}
              />

              {/* Arrow tip */}
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M0 0L4 5L8 0" fill="currentColor" className="text-border/60" />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   ORBIT RING — 30% larger, with glow + floating KPI cards
══════════════════════════════════════════════ */
const techOrbit = [
  { label: "Fabric",     color: "#0067C0", angle: 0   },
  { label: "Databricks", color: "#FF3621", angle: 51  },
  { label: "Snowflake",  color: "#29B5E8", angle: 102 },
  { label: "Power BI",   color: "#F2C811", angle: 153 },
  { label: "dbt",        color: "#FF694B", angle: 205 },
  { label: "Python",     color: "#4B8BBE", angle: 256 },
  { label: "Delta",      color: "#00ADD8", angle: 307 },
];

const floatingKpis = [
  { value: "100M+", label: "Records",    color: "#3B82F6", pos: "top-4 -left-16"    },
  { value: "50+",   label: "Dashboards", color: "#F59E0B", pos: "bottom-16 -left-16" },
  { value: "13+",   label: "Certs",      color: "#10B981", pos: "top-4 -right-16"   },
  { value: "20+",   label: "Stakeholders",color: "#8B5CF6", pos: "bottom-16 -right-16"},
];

function OrbitRing() {
  return (
    /* Outer container — 30% larger than original w-96 h-96 */
    <div className="relative w-[26rem] h-[26rem] xl:w-[30rem] xl:h-[30rem] mx-auto">

      {/* ── Glow layer ── */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 45%, transparent 70%)" }} />

      {/* ── Outer glow pulse ── */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Rotating rings ── */}
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-500/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-dashed border-blue-400/12"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      {/* Second inner ring for depth */}
      <motion.div
        className="absolute inset-14 rounded-full border border-indigo-500/10"
        animate={{ rotate: 180 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Center glassmorphism card ── */}
      <div className="absolute inset-14 xl:inset-16 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(15,23,42,0.06) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(59,130,246,0.25)",
          boxShadow: "0 8px 32px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-center px-3 py-1">
          {/* DK monogram */}
          <motion.div
            className="w-16 h-16 xl:w-18 xl:h-18 rounded-full mx-auto flex items-center justify-center mb-2.5"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(79,70,229,0.2) 100%)",
              border: "2px solid rgba(96,165,250,0.35)",
              boxShadow: "0 0 24px rgba(59,130,246,0.25)",
            }}
            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.20)", "0 0 40px rgba(59,130,246,0.35)", "0 0 20px rgba(59,130,246,0.20)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-2xl xl:text-3xl font-black bg-gradient-to-br from-blue-300 to-indigo-300 bg-clip-text text-transparent">DK</span>
          </motion.div>
          {/* Role */}
          <p className="text-[10px] font-bold text-blue-300/80 uppercase tracking-[0.14em] mb-1.5">Analytics Architect</p>
          {/* 7+ yrs */}
          <p className="text-[11px] text-muted-foreground/60 font-mono mb-2.5">7+ Years · Enterprise</p>
          {/* Core tool dots */}
          <div className="flex flex-col gap-1 items-center">
            {[
              { label: "Power BI", color: "#F2C811" },
              { label: "Snowflake", color: "#29B5E8" },
              { label: "Fabric", color: "#0067C0" },
              { label: "Azure", color: "#3B82F6" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: t.color, boxShadow: `0 0 4px ${t.color}` }} />
                <span className="text-[9px] font-semibold" style={{ color: t.color }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Orbiting tech pills ── */}
      {techOrbit.map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        const r = 48;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <motion.div
            key={t.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-sm cursor-default select-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: t.color,
              backgroundColor: `${t.color}14`,
              borderColor: `${t.color}35`,
              boxShadow: `0 2px 8px ${t.color}20`,
            }}
            animate={{ scale: [1, 1.07, 1], y: [`${y}%`, `${y - 0.5}%`, `${y}%`] }}
            transition={{ duration: 3.5 + t.angle * 0.008, repeat: Infinity, delay: t.angle * 0.006 }}
          >
            {t.label}
          </motion.div>
        );
      })}

      {/* ── Floating KPI cards (outside ring) ── */}
      {floatingKpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          className={`absolute ${kpi.pos} flex flex-col items-center justify-center w-14 h-14 rounded-2xl border backdrop-blur-md`}
          style={{
            backgroundColor: `${kpi.color}10`,
            borderColor: `${kpi.color}30`,
            boxShadow: `0 4px 16px ${kpi.color}15`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: 0.8 + i * 0.1, duration: 0.4 },
            scale: { delay: 0.8 + i * 0.1, duration: 0.4 },
            y: { duration: 3.5 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" },
          }}
        >
          <span className="text-sm font-extrabold leading-none" style={{ color: kpi.color }}>{kpi.value}</span>
          <span className="text-[9px] font-semibold text-muted-foreground mt-0.5 leading-tight text-center">{kpi.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════ */
export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y       = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* Mouse parallax for the right visual */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    mouseX.set(x * 10);
    mouseY.set(y * 10);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)" }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <motion.div style={{ y, opacity }} className="relative z-10 container-max section-padding !pt-24 !pb-16">
        {/* Equal-weight grid: text 50% / visual 50% */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ══ LEFT — Text hierarchy ══ */}
          <div className="max-w-2xl">

            {/* 1. AVAILABILITY BADGE only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold group relative cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Available</span>
                {/* Hover tooltip */}
                <div className="absolute left-0 top-full mt-2 z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 w-max">
                  <div className="bg-card border border-border rounded-xl shadow-xl px-3.5 py-2.5 text-xs text-foreground">
                    <p className="font-bold text-emerald-500 mb-1.5">Available for:</p>
                    {["Full-time roles", "Contract engagements", "Analytics consulting"].map((t) => (
                      <div key={t} className="flex items-center gap-1.5 text-muted-foreground py-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. WHAT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="mb-4"
            >
              <h1 className="font-extrabold tracking-tight leading-[1.06] mb-3" style={{ fontSize: "clamp(2.5rem,5.5vw,4.2rem)" }}>
                <span style={{ backgroundImage: "linear-gradient(135deg,#0F172A 0%,#334155 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Turning Enterprise Data
                </span>
                <br />
                <span className="gradient-text">Into Executive Decisions</span>
              </h1>
              {/* One-liner positioning tagline */}
              <p className="text-sm text-muted-foreground/80 font-medium mb-3 leading-relaxed">
                Business Analyst&nbsp;|&nbsp;BI Developer&nbsp;|&nbsp;Analytics Consultant specializing in{" "}
                <span className="text-foreground/90">Power BI, Fabric, Snowflake, SQL</span> and{" "}
                <span className="text-foreground/90">Python</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {["Business Analyst", "BI Developer", "Analytics Consultant", "Data Engineer"].map((r) => (
                  <span key={r} className="px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/25 bg-blue-500/8 text-blue-600 dark:text-blue-300">
                    {r}
                  </span>
                ))}
              </div>
            </motion.div>


            {/* 4. VALUE PROP */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.20 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-lg"
            >
              I build{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Power BI</span> dashboards,{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Snowflake</span> pipelines, and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Fabric</span> Lakehouses
              {" "}that turn 100M+ records into decisions for 20+ stakeholders across 8 countries.
            </motion.p>

          </div>

          {/* ══ RIGHT — Visual with mouse parallax ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" as const }}
            style={{ x: springX, y: springY }}
            className="hidden lg:flex flex-row items-center justify-center gap-6"
          >
            <DataFlow />

            <div className="relative flex flex-col items-center gap-3">
              {/* Visualization label */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400/60 font-mono"
              >
                Enterprise Analytics Ecosystem
              </motion.p>

              <OrbitRing />

              {/* Cert strip below orbit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap"
              >
                {["DP-700", "DP-600", "PL-300", "SnowPro"].map((c) => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400/80 font-mono">
                    {c}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/8 text-amber-400/80 font-mono">
                  +9
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Explore</span>
        <ChevronDown size={14} />
      </motion.button>
    </section>
  );
}
