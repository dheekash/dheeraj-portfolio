"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, Globe, Award, Clock, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { TypeWriter } from "@/components/common/TypeWriter";
import { onTiltMove, onTiltLeave } from "@/components/common/tilt";

const stats: { value: string; label: string; Icon: LucideIcon; color: string }[] = [
  { value: "7+",  label: "years in analytics",       Icon: Clock,    color: "var(--forest)" },
  { value: "15+", label: "countries served",         Icon: Globe,    color: "var(--coral)"  },
  { value: "13",  label: "industry certifications",  Icon: Award,    color: "var(--mint)"   },
  { value: "5M+", label: "records processed daily",  Icon: Database, color: "var(--gold)"   },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* Animated counter — parses "40+" into 40 + suffix, counts up on view */
function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, target, count, delay]);

  return (
    <motion.span ref={ref} className="inline-block">
      {rounded}
    </motion.span>
  );
}

/* Decorative sparkline shapes — one silhouette per stat card */
const SPARKS = [
  "0,22 12,16 24,19 36,10 48,13 60,6 72,9 84,2",
  "0,18 12,20 24,12 36,15 48,8 60,11 72,5 84,7",
  "0,20 12,14 24,17 36,9 48,12 60,10 72,4 84,6",
  "0,16 12,19 24,11 36,14 48,6 60,9 72,7 84,3",
];

/* Glass stat block — breathing icon, count-up metric, mini sparkline */
function StatArtifact({ value, label, delay, Icon, color, spark, className = "" }: { value: string; label: string; delay: number; Icon: LucideIcon; color: string; spark: string; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`artifact px-6 py-5 flex flex-col gap-3 ${className}`}
    >
      <span className="breathe inline-flex" style={{ color }}>
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <div>
        <span
          className="block leading-none tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 1.6rem + 2vw, 3.4rem)", color: "var(--foreground)", letterSpacing: "-0.02em" }}
        >
          <CountUp value={value} delay={delay + 0.1} />
        </span>
        <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
      </div>
      {/* Mini sparkline — decorative trend gesture */}
      <svg viewBox="0 0 84 24" className="w-full h-6" aria-hidden preserveAspectRatio="none">
        <polyline
          points={spark}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
      </svg>
    </motion.div>
  );
}

export function CinematicHero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Floating dashboard cluster — abstract data-viz identity (xl+) */}
      <div aria-hidden className="hidden xl:block absolute right-[4%] top-[10%] z-[1] w-[24rem] pointer-events-none">
        <motion.div
          className="panel p-4 mb-4 ml-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.5 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
        >
          <svg viewBox="0 0 200 64" className="w-full h-auto">
            {[14, 30, 22, 44, 36, 54, 46, 60].map((h, i) => (
              <rect key={i} x={i * 25 + 4} y={64 - h} width="14" height={h} rx="2"
                fill={i % 2 ? "rgba(168,85,247,0.55)" : "rgba(0,229,255,0.55)"} />
            ))}
          </svg>
        </motion.div>
        <motion.div
          className="panel p-4 mb-4 mr-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, 9, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.7 }, y: { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 } }}
        >
          <svg viewBox="0 0 200 48" className="w-full h-auto">
            <defs>
              <linearGradient id="heroSpark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <polyline points="0,40 28,32 56,36 84,20 112,26 140,12 168,16 200,4"
              fill="none" stroke="url(#heroSpark)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="4" r="3.5" fill="#00E5FF">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
        <motion.div
          className="panel p-4 ml-16 w-56"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -7, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.9 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
        >
          <svg viewBox="0 0 160 72" className="w-full h-auto">
            <g stroke="rgba(0,229,255,0.35)" strokeWidth="1">
              <line x1="80" y1="36" x2="20" y2="12" /><line x1="80" y1="36" x2="140" y2="14" />
              <line x1="80" y1="36" x2="24" y2="60" /><line x1="80" y1="36" x2="138" y2="58" />
            </g>
            {[[20, 12], [140, 14], [24, 60], [138, 58]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill={i % 2 ? "#A855F7" : "#00E5FF"}>
                <animate attributeName="opacity" values="1;0.4;1" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle cx="80" cy="36" r="6" fill="url(#heroSpark)" />
          </svg>
        </motion.div>
      </div>

      <div className="container-page relative z-10 py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div
          className="max-w-[64rem]"
          onPointerMove={onTiltMove}
          onPointerLeave={onTiltLeave}
          style={{ transformStyle: "preserve-3d" }}
        >
            {/* Availability — pulse-ring badge */}
            <motion.div
              {...fadeUp(0)}
              className="pulse-ring inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(0, 229, 255, 0.4)", background: "rgba(0, 229, 255, 0.05)" }}
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 8px rgba(0,229,255,0.8)" }} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--cyan)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Display headline — white with glow, gradient emphasis */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-7 text-glow"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 1rem + 4.4vw, 4.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
              }}
            >
              Building analytics platforms that power{" "}
              <span className="text-gradient">enterprise decisions.</span>
            </motion.h1>

            {/* Trust signals — one scannable mono line under the headline */}
            <motion.p
              {...fadeUp(0.1)}
              className="mb-7 font-mono text-[12px] uppercase tracking-[0.08em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Microsoft Fabric Engineer&ensp;·&ensp;Power BI Expert&ensp;·&ensp;Snowflake Certified&ensp;·&ensp;Azure Data Platform
            </motion.p>

            {/* Currently building — typewriter with blinking caret */}
            <motion.div {...fadeUp(0.12)} className="mb-7 pl-3 flex items-baseline gap-2" style={{ borderLeft: "1px solid var(--cyan)" }}>
              <span className="font-mono text-[13px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>Currently building</span>
              <TypeWriter
                words={["Lakehouses", "pipelines", "dashboards", "semantic models"]}
                className="font-mono text-[13px] uppercase tracking-[0.1em] min-w-[16ch] text-[color:var(--cyan)]"
              />
            </motion.div>

            {/* CTA pair — primary: case studies; secondary: animated download */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-3 mt-2">
              <a
                href="#case-studies"
                className="gradient-btn group inline-flex items-center gap-2 px-6 py-[15px] font-mono text-[13px] font-semibold uppercase tracking-[0.08em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Explore case studies
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <label className="dl-btn" aria-label="Download Resume">
                <input
                  type="checkbox"
                  className="dl-input"
                  onChange={(e) => {
                    if (e.target.checked) {
                      window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                />
                <span className="dl-circle">
                  <svg className="dl-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                  </svg>
                  <div className="dl-square" />
                </span>
                <p className="dl-title">Resume</p>
                <p className="dl-title">Open</p>
              </label>
            </motion.div>
        </div>

        {/* ── Stat artifacts — row below the headline ── */}
        <div className="mt-[clamp(2rem,3vw,2.75rem)] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[62rem]">
          {stats.map((s, i) => (
            <StatArtifact key={s.label} value={s.value} label={s.label} Icon={s.Icon} color={s.color} spark={SPARKS[i % SPARKS.length]} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
