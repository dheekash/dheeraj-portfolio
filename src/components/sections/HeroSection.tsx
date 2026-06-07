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
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — Text content ── */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 glass-card"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
              <MapPin size={13} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Bengaluru, India</span>
              <span className="w-px h-3.5 bg-border" />
              <Sparkles size={12} className="text-amber-400" />
              <span className="text-xs text-amber-600 dark:text-amber-300/90 font-medium">Open to Senior Roles</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-400/80 mb-3 font-mono">
                Dheeraj Kashyap
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.04] mb-4">
                <span className="gradient-text-white">Turning Business Data</span>{" "}
                <br className="hidden sm:block" />
                <span className="gradient-text">Into Executive Decisions</span>
              </h1>
              <div className="text-xl sm:text-2xl font-semibold text-foreground/70 mb-6 h-9 flex items-center">
                <Typewriter />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mb-8 max-w-xl"
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground font-semibold">Analytics Engineer</strong> with 6+ years building enterprise analytics solutions across{" "}
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Amazon</span>, consulting, and data-driven organisations.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Specialized in{" "}
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Power BI</span>,{" "}
                <span className="text-slate-600 dark:text-slate-300 font-medium">SQL</span>,{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">Snowflake</span>,{" "}
                <span className="text-blue-600 dark:text-blue-400 font-medium">Azure</span>, and{" "}
                <span className="text-blue-700 dark:text-blue-300 font-medium">Microsoft Fabric</span> — delivering{" "}
                dashboards, pipelines, and Lakehouse platforms trusted by 20+ stakeholders across 8 countries.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                View Projects
                <ArrowRight size={15} />
              </button>
              <LinkButton
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 bg-white/5 hover:bg-white/10 text-foreground/90 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white/20"
              >
                <Download size={15} />
                Resume
              </LinkButton>
              <a
                href="https://linkedin.com/in/kashyap-dheeraj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border border-blue-500/20 bg-blue-500/8 hover:bg-blue-500/15 text-blue-400 transition-all hover:scale-[1.02]"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href="https://github.com/dheekash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border border-white/10 bg-white/5 hover:bg-white/10 text-foreground/60 transition-all hover:scale-[1.02]"
              >
                <GithubIcon size={15} />
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-3"
            >
              {profile.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="gradient-border rounded-xl p-3 text-center bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors group"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 group-hover:text-blue-300 transition-colors tabular-nums">
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
