"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, LayoutDashboard, Award, Clock, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

const stats: { value: string; label: string; Icon: LucideIcon; color: string }[] = [
  { value: "40+", label: "dashboards",     Icon: LayoutDashboard, color: "var(--accent)"  },
  { value: "13",  label: "certifications", Icon: Award,           color: "var(--success)" },
  { value: "6+",  label: "years",          Icon: Clock,           color: "var(--sienna)"  },
  { value: "5M+", label: "records / day",  Icon: Database,        color: "var(--primary)" },
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

/* Floating product artifact holding one stat — icon chip + big metric */
function StatArtifact({ value, label, delay, Icon, color, className = "" }: { value: string; label: string; delay: number; Icon: LucideIcon; color: string; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`artifact px-6 py-5 flex flex-col gap-3 ${className}`}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div>
        <span
          className="block leading-none tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(2.4rem, 1.6rem + 2vw, 3.4rem)", color: "var(--foreground)" }}
        >
          <CountUp value={value} delay={delay + 0.1} />
        </span>
        <span className="mt-2 block text-[13px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Electric-blue wash in the top-right corner */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 92% 8%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%)",
        }}
      />
      {/* Soft radial glow behind the headline (Linear/Raycast depth cue) */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "8%",
          left: "-6%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at 40% 40%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      <div className="container-page relative z-10 py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div className="max-w-[64rem]">
            {/* Availability pill — pulsing dot, stronger weight */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 mb-6 rounded-full px-3.5 py-1.5"
              style={{ background: "color-mix(in srgb, var(--foreground) 5%, transparent)", border: "1px solid var(--border)" }}
            >
              <span className="relative flex w-2 h-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "var(--success)" }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: "var(--success)" }} />
              </span>
              <span className="text-[14px] font-medium tracking-[0.01em]" style={{ color: "var(--foreground)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Serif display headline — bigger, with an oversized italic drop */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-6 text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 1rem + 4.4vw, 4.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Building analytics platforms that power{" "}
              <em className="italic" style={{ color: "var(--accent)", fontSize: "1.08em", lineHeight: 1 }}>enterprise decisions.</em>
            </motion.h1>

            {/* Rotating deliverable — Uiverse word list, editorial palette */}
            <motion.div {...fadeUp(0.12)} className="mb-7">
              <span className="word-rotator">
                <span>Currently building</span>
                <span className="wr-words" aria-label="Lakehouses, pipelines, dashboards, semantic models">
                  <span className="wr-word">Lakehouses</span>
                  <span className="wr-word">pipelines</span>
                  <span className="wr-word">dashboards</span>
                  <span className="wr-word">semantic models</span>
                  <span className="wr-word">Lakehouses</span>
                </span>
              </span>
            </motion.div>

            {/* Pill button pair — filled + ghost */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-3 mt-2">
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
                <p className="dl-title">Download</p>
                <p className="dl-title">Open</p>
              </label>
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[16px] transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                style={{ border: "1px solid var(--foreground)", color: "var(--foreground)" }}
              >
                View Projects <ArrowRight size={15} />
              </a>
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
