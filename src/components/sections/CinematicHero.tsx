"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Globe, Award, Clock, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { TypeWriter } from "@/components/common/TypeWriter";

/* One accent across every stat — hue is not the differentiator here, the number is. */
const stats: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "7+",  label: "years in analytics",      Icon: Clock    },
  { value: "15+", label: "countries served",        Icon: Globe    },
  { value: "13",  label: "industry certifications", Icon: Award    },
  { value: "5M+", label: "records processed daily", Icon: Database },
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

/* Stat block — quiet surface, count-up metric. No decorative trend lines:
   a drawn sparkline under a real number implies data that does not exist. */
function StatArtifact({ value, label, delay, Icon, className = "" }: { value: string; label: string; delay: number; Icon: LucideIcon; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`px-6 py-6 flex flex-col gap-4 ${className}`}
    >
      <span className="inline-flex" style={{ color: "var(--primary)" }}>
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div>
        <span
          className="block leading-none tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.1rem, 1.5rem + 1.6vw, 2.9rem)", color: "var(--foreground)", letterSpacing: "-0.03em" }}
        >
          <CountUp value={value} delay={delay + 0.1} />
        </span>
        <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
  const reduce = useReducedMotion();

  /* Ambient data-viz motif. Reveals once on load, then holds still —
     the identity cue is the shapes, not the looping. */
  const panel = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Abstract data-viz identity (xl+) — one accent, no perpetual motion */}
      <div aria-hidden className="hidden xl:block absolute right-[4%] top-[12%] z-[1] w-[22rem] pointer-events-none">
        <motion.div className="panel p-4 mb-4 ml-10" {...panel(0.5)}>
          <svg viewBox="0 0 200 64" className="w-full h-auto">
            {[14, 30, 22, 44, 36, 54, 46, 60].map((h, i) => (
              <rect key={i} x={i * 25 + 4} y={64 - h} width="14" height={h} rx="2"
                fill="var(--primary)" opacity={0.25 + (i / 8) * 0.45} />
            ))}
          </svg>
        </motion.div>
        <motion.div className="panel p-4 mb-4 mr-6" {...panel(0.62)}>
          <svg viewBox="0 0 200 48" className="w-full h-auto">
            <polyline points="0,40 28,32 56,36 84,20 112,26 140,12 168,16 200,4"
              fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="200" cy="4" r="3.5" fill="var(--primary)" />
          </svg>
        </motion.div>
        <motion.div className="panel p-4 ml-16 w-56" {...panel(0.74)}>
          <svg viewBox="0 0 160 72" className="w-full h-auto">
            <g stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1">
              <line x1="80" y1="36" x2="20" y2="12" /><line x1="80" y1="36" x2="140" y2="14" />
              <line x1="80" y1="36" x2="24" y2="60" /><line x1="80" y1="36" x2="138" y2="58" />
            </g>
            {[[20, 12], [140, 14], [24, 60], [138, 58]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="var(--primary)" opacity={0.55} />
            ))}
            <circle cx="80" cy="36" r="6" fill="var(--primary)" />
          </svg>
        </motion.div>
      </div>

      <div className="container-page relative z-10 py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div className="max-w-[64rem]">
            {/* Availability — real semantic status, so the dot earns its place */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full"
              style={{ border: "1px solid var(--border)", background: "var(--muted)" }}
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--success)" }} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--muted-foreground)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Display headline — emphasis carried by the accent, not a gradient */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-7"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 1rem + 4vw, 4.2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "var(--foreground)",
                maxWidth: "18ch",
              }}
            >
              Building analytics platforms that power{" "}
              <span style={{ color: "var(--primary)" }}>enterprise decisions.</span>
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
            <motion.div {...fadeUp(0.12)} className="mb-8 pl-3 flex items-baseline gap-2" style={{ borderLeft: "1px solid var(--border)" }}>
              <span className="font-mono text-[13px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>Currently building</span>
              <TypeWriter
                words={["Lakehouses", "pipelines", "dashboards", "semantic models"]}
                className="font-mono text-[13px] uppercase tracking-[0.1em] min-w-[16ch] text-[color:var(--primary)]"
              />
            </motion.div>

            {/* CTA pair — one shape system, real link semantics on both */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-3 mt-2">
              <a
                href="#case-studies"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-[calc(var(--radius)*0.7)] border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] font-mono text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Explore case studies
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-[calc(var(--radius)*0.7)] border border-[var(--border)] text-[var(--foreground)] font-mono text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-[color,border-color,transform] duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[0.98]"
              >
                <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                Resume
              </a>
            </motion.div>
        </div>

        {/* ── Stat artifacts — row below the headline ── */}
        <div className="mt-[clamp(2.5rem,4vw,4rem)] grid grid-cols-2 lg:grid-cols-4 max-w-[62rem] rounded-[var(--radius)] border border-[var(--border)]">
          {stats.map((s, i) => (
            <StatArtifact
              key={s.label}
              value={s.value}
              label={s.label}
              Icon={s.Icon}
              delay={0.3 + i * 0.06}
              /* Hairlines between cells only, so the group reads as one object */
              className={`border-[var(--border)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} lg:border-b-0 lg:border-r ${i === stats.length - 1 ? "lg:border-r-0" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
