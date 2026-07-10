"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, Globe, Award, Clock, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

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

/* Flat bento stat block — colored left-border accent, mono label (spec) */
function StatArtifact({ value, label, delay, Icon, color, className = "" }: { value: string; label: string; delay: number; Icon: LucideIcon; color: string; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`artifact px-6 py-5 flex flex-col gap-3 ${className}`}
      style={{ borderLeft: `2px solid ${color}` }}
    >
      <span className="inline-flex" style={{ color: "var(--forest)" }}>
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div>
        <span
          className="block leading-none tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(2.4rem, 1.6rem + 2vw, 3.4rem)", color: "var(--forest)", letterSpacing: "-0.02em" }}
        >
          <CountUp value={value} delay={delay + 0.1} />
        </span>
        <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-page relative z-10 py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div className="max-w-[64rem]">
            {/* Status badge — square dot, mono, hairline (spec component) */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 mb-6 px-3 py-1"
              style={{ border: "1px solid color-mix(in srgb, var(--forest) 20%, transparent)", borderRadius: "2px" }}
            >
              <span className="h-2 w-2 flex-shrink-0" style={{ background: "var(--forest)" }} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--forest)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Structural display headline — Space Grotesk, tight, forest */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-7"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 1rem + 4.4vw, 4.8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: "var(--forest)",
              }}
            >
              Building analytics platforms that power{" "}
              <span style={{ background: "var(--mint)", color: "#10241A", padding: "0 0.12em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
                enterprise decisions.
              </span>
            </motion.h1>

            {/* Trust signals — one scannable mono line under the headline */}
            <motion.p
              {...fadeUp(0.1)}
              className="mb-7 font-mono text-[12px] uppercase tracking-[0.08em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Microsoft Fabric Engineer&ensp;·&ensp;Power BI Expert&ensp;·&ensp;Snowflake Certified&ensp;·&ensp;Azure Data Platform
            </motion.p>

            {/* Rotating deliverable — mono, with a structural left rule */}
            <motion.div {...fadeUp(0.12)} className="mb-7 pl-3" style={{ borderLeft: "1px solid var(--forest)" }}>
              <span className="word-rotator">
                <span className="font-mono text-[13px] uppercase tracking-[0.1em]">Currently building</span>
                <span className="wr-words" aria-label="Lakehouses, pipelines, dashboards, semantic models">
                  <span className="wr-word">Lakehouses</span>
                  <span className="wr-word">pipelines</span>
                  <span className="wr-word">dashboards</span>
                  <span className="wr-word">semantic models</span>
                  <span className="wr-word">Lakehouses</span>
                </span>
              </span>
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
          <StatArtifact value={stats[0].value} label={stats[0].label} Icon={stats[0].Icon} color={stats[0].color} delay={0.30} />
          <StatArtifact value={stats[1].value} label={stats[1].label} Icon={stats[1].Icon} color={stats[1].color} delay={0.38} />
          <StatArtifact value={stats[2].value} label={stats[2].label} Icon={stats[2].Icon} color={stats[2].color} delay={0.46} />
          <StatArtifact value={stats[3].value} label={stats[3].label} Icon={stats[3].Icon} color={stats[3].color} delay={0.54} />
        </div>
      </div>
    </section>
  );
}
