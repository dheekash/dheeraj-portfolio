"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, MapPin, ChevronDown, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/common/LinkButton";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

/* ── Typewriter ── */
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

/* ── Animated counter ── */
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

/* ── Animated data flow ── */
const flowNodes = [
  { label: "Raw Data Sources",    icon: "⬡", color: "#64748B" },
  { label: "ETL / ADF Pipeline",  icon: "⚡", color: "#3B82F6" },
  { label: "Snowflake / Fabric",  icon: "❄", color: "#29B5E8" },
  { label: "dbt / SQLMesh",       icon: "⚙", color: "#FF694B" },
  { label: "Power BI Model",      icon: "▦", color: "#F2C811" },
  { label: "Executive Insights",  icon: "★", color: "#10B981" },
];

function DataFlow() {
  return (
    <div className="flex flex-col items-center gap-0 w-52">
      {flowNodes.map((node, i) => (
        <div key={node.label} className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4, ease: "easeOut" as const }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-background/70 dark:bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <span className="text-base leading-none" style={{ color: node.color }}>{node.icon}</span>
            <span className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors">{node.label}</span>
          </motion.div>
          {i < flowNodes.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.55 + i * 0.15, duration: 0.3 }}
              className="flex flex-col items-center"
              style={{ transformOrigin: "top" }}
            >
              <div className="w-px h-3 bg-border" />
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M0 0L4 5L8 0" fill="var(--border)" />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Orbit ring ── */
const techOrbit = [
  { label: "Fabric", color: "#0067C0", angle: 0 },
  { label: "Databricks", color: "#FF3621", angle: 51 },
  { label: "Snowflake", color: "#29B5E8", angle: 102 },
  { label: "Power BI", color: "#F2C811", angle: 153 },
  { label: "dbt", color: "#FF694B", angle: 205 },
  { label: "Python", color: "#4B8BBE", angle: 256 },
  { label: "Delta", color: "#00ADD8", angle: 307 },
];

function OrbitRing() {
  return (
    <div className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto">
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-dashed border-blue-400/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Center avatar */}
      <div className="absolute inset-8 lg:inset-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600/20 via-blue-900/30 to-indigo-900/20 border border-blue-500/30 flex items-center justify-center glow-blue">
        <div className="text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/20 border-2 border-blue-400/30 mx-auto flex items-center justify-center mb-2">
            <span className="text-2xl lg:text-3xl font-bold text-blue-300">DK</span>
          </div>
          <p className="text-xs text-blue-400/70 font-mono hidden lg:block">7+ yrs exp</p>
        </div>
      </div>

      {/* Orbiting tech pills */}
      {techOrbit.map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        const r = 48;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <motion.div
            key={t.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-semibold border backdrop-blur-sm"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              color: t.color,
              backgroundColor: `${t.color}18`,
              borderColor: `${t.color}35`,
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3 + t.angle * 0.01, repeat: Infinity, delay: t.angle * 0.005 }}
          >
            {t.label}
          </motion.div>
        );
      })}
    </div>
  );
}

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

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
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <motion.div style={{ y, opacity }} className="relative z-10 container-max section-padding !pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-center">

          {/* ── LEFT — Dominant text hierarchy ── */}
          <div className="max-w-2xl">

            {/* 1. WHO — Name first, large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="text-white font-black text-sm">DK</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Dheeraj Kashyap
                </h2>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>
            </motion.div>

            {/* 2. WHAT — Title + roles */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.07 }}
              className="mb-5"
            >
              <h1 className="font-extrabold tracking-tight leading-[1.06] mb-3" style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
                <span className="gradient-text-white dark:gradient-text-white" style={{ backgroundImage: "linear-gradient(135deg,#0F172A 0%,#334155 100%)" }}>
                  Turning Enterprise Data
                </span>
                <br />
                <span className="gradient-text">Into Executive Decisions</span>
              </h1>
              {/* Role badges */}
              <div className="flex flex-wrap gap-2">
                {["Business Analyst", "BI Developer", "Analytics Consultant", "Data Engineer"].map((r) => (
                  <span key={r} className="px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/25 bg-blue-500/8 text-blue-600 dark:text-blue-300">
                    {r}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 3. WHY — Company logo trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mb-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Experience at
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* Amazon */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-500/20 bg-amber-500/6 hover:bg-amber-500/10 transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="12" fill="#FF9900" fillOpacity="0.15"/>
                    <text x="50" y="68" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="52" fill="#FF9900">A</text>
                  </svg>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-400 tracking-tight">Amazon</span>
                </div>
                {/* Amplify Analytix */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-blue-500/20 bg-blue-500/6 hover:bg-blue-500/10 transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="12" fill="#2563EB" fillOpacity="0.15"/>
                    <text x="50" y="65" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="38" fill="#2563EB">AA</text>
                  </svg>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-400 tracking-tight">Amplify Analytix</span>
                </div>
                {/* Frontizo */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/6 hover:bg-emerald-500/10 transition-colors group">
                  <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="12" fill="#10B981" fillOpacity="0.15"/>
                    <text x="50" y="68" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="52" fill="#10B981">F</text>
                  </svg>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">Frontizo</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={11} />
                  Bengaluru, India
                </span>
              </div>
            </motion.div>

            {/* 4. VALUE PROP — one sentence */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              I build{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Power BI</span> dashboards,{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Snowflake</span> pipelines, and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Microsoft Fabric</span> Lakehouses
              {" "}that help 20+ stakeholders in 8 countries make faster, better decisions.
            </motion.p>

            {/* 5. CTAs — primary dominant */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <LinkButton
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-2xl shadow-blue-600/35 hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <Download size={16} />
                View Resume
              </LinkButton>
              <button
                onClick={() => scrollTo("#dashboards")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border border-border bg-card hover:bg-muted text-foreground shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                View Dashboards
                <ArrowRight size={15} />
              </button>
              <a
                href="https://linkedin.com/in/kashyap-dheeraj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border border-blue-500/20 bg-blue-500/8 hover:bg-blue-500/15 text-blue-500 dark:text-blue-400 transition-all hover:scale-[1.02]"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href="https://github.com/dheekash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border border-border bg-card hover:bg-muted text-foreground/60 transition-all hover:scale-[1.02]"
              >
                <GithubIcon size={15} />
              </a>
            </motion.div>

            {/* 6. Stats strip — small, below CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-2.5"
            >
              {profile.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 + i * 0.06 }}
                  className="rounded-xl p-3 text-center bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="text-lg sm:text-xl font-extrabold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors tabular-nums">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Orbit visual + data flow ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" as const }}
            className="hidden lg:flex flex-row items-center justify-center gap-8"
          >
            <DataFlow />
            <OrbitRing />

            {/* Credential strip */}
            <div className="flex flex-wrap justify-center gap-2 max-w-sm">
              {["DP-700", "DP-600", "Databricks DE", "SnowPro", "PL-300"].map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-300/80 font-medium"
                >
                  {c}
                </span>
              ))}
              <span className="text-xs px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/8 text-amber-300/80 font-medium">
                +8 more
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ChevronDown size={14} />
      </motion.button>
    </section>
  );
}
