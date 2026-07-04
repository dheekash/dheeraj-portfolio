"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const credentials = [
  "DP-600 · Fabric Analytics Engineer",
  "PL-300 · Power BI Data Analyst",
  "DP-700 · Fabric Data Engineer",
  "DP-100 · Azure Data Scientist",
  "SnowPro Core · Snowflake",
  "DE Associate · Databricks",
];

const stats = [
  { value: "40+", label: "dashboards" },
  { value: "13",  label: "certifications" },
  { value: "3",   label: "companies" },
  { value: "15",  label: "countries" },
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

/* Floating white product artifact holding one stat */
function StatArtifact({ value, label, delay, className = "" }: { value: string; label: string; delay: number; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`artifact px-6 py-5 ${className}`}
    >
      <span
        className="block leading-none tabular-nums text-ink"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(2rem,1.4rem+1.6vw,2.9rem)", color: "var(--foreground)" }}
      >
        <CountUp value={value} delay={delay + 0.1} />
      </span>
      <span className="mt-2 block text-[14px] tracking-[0.01em]" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </span>
    </motion.div>
  );
}

export function CinematicHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Warm paper wash in the top-right corner — the one chromatic note */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 92% 8%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%)",
        }}
      />

      <div className="container-page relative z-10 py-[clamp(4.5rem,3rem+6vw,9rem)]">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-x-16 gap-y-16 items-center">

          {/* ── Left: editorial headline column ── */}
          <div className="max-w-[46rem]">
            {/* Availability tag */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--sienna)" }} />
              <span className="text-[15px]" style={{ color: "var(--muted-foreground)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Serif display headline — italic on the closing phrase */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-9 text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.6rem, 1.2rem + 4.4vw, 5.6rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              Building analytics platforms that power{" "}
              <em className="italic" style={{ color: "var(--foreground)" }}>enterprise decisions.</em>
            </motion.h1>

            {/* Rotating deliverable — Uiverse word list, editorial palette */}
            <motion.div {...fadeUp(0.12)} className="mb-9">
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

            {/* Credential tags — ghost typographic labels */}
            <motion.div {...fadeUp(0.16)} className="flex flex-wrap gap-x-5 gap-y-2 mb-10">
              {credentials.map((tag) => (
                <span key={tag} className="text-[14px]" style={{ color: "var(--ash)" }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Pill button pair — filled + ghost */}
            <motion.div {...fadeUp(0.24)} className="flex flex-wrap items-center gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[16px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Download Resume <ArrowUpRight size={15} />
              </a>
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[16px] transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                style={{ border: "1px solid var(--foreground)", color: "var(--foreground)" }}
              >
                View Projects <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* ── Right: floating stat artifacts ── */}
          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            <StatArtifact value={stats[0].value} label={stats[0].label} delay={0.30} className="sm:translate-y-3" />
            <StatArtifact value={stats[1].value} label={stats[1].label} delay={0.38} className="sm:-translate-y-3" />
            <StatArtifact value={stats[2].value} label={stats[2].label} delay={0.46} className="sm:translate-y-3" />
            <StatArtifact value={stats[3].value} label={stats[3].label} delay={0.54} className="sm:-translate-y-3" />
          </div>

        </div>
      </div>
    </section>
  );
}
