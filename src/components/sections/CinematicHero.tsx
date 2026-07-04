"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

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

/* Headline split for staggered word reveal — text unchanged */
const HEADLINE_WORDS = ["Building", "analytics", "platforms", "that", "power"];
const HEADLINE_ACCENT = ["enterprise", "decisions."];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
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
      duration: 1.8,
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

export function CinematicHero() {
  return (
    <section id="top" className="dark relative overflow-hidden min-h-[min(48rem,96svh)] flex items-center">

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_SRC}
      />

      {/* Cinematic overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(7,15,28,0.92) 0%, rgba(7,15,28,0.72) 52%, rgba(7,15,28,0.50) 100%)",
        }}
      />

      {/* Aurora atmosphere */}
      <div
        aria-hidden
        className="aurora z-[2] w-[45vw] h-[45vw] top-[-12%] right-[-8%]"
        style={{ background: "radial-gradient(circle, rgba(21,145,220,0.35) 0%, rgba(75,184,250,0.12) 55%, transparent 75%)" }}
      />
      <div
        aria-hidden
        className="aurora z-[2] w-[32vw] h-[32vw] bottom-[-15%] left-[18%]"
        style={{
          background: "radial-gradient(circle, rgba(44,94,173,0.30) 0%, transparent 70%)",
          animationDelay: "-9s",
          animationDuration: "24s",
        }}
      />

      {/* Bottom fade into page background */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 z-[3] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(7,15,28,0.85))" }}
      />

      <div className="container-page relative z-10 py-[clamp(4.5rem,2.5rem+5vw,8rem)] w-full">
        <div className="max-w-[68ch]">

          {/* 1 — Status strip */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 mb-[clamp(1.25rem,1.8vw,1.75rem)] rounded-full px-4 py-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="relative flex w-2 h-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            <span className="text-[13px] font-medium text-white/75 tracking-[0.01em] truncate">
              <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
              <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
            </span>
          </motion.div>

          {/* 2 — Headline: staggered word reveal, shimmer on accent words */}
          <h1
            className="max-w-[22ch] text-white mb-[clamp(1.25rem,1.6vw,1.75rem)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 1rem + 3.4vw, 4.8rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={word + i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
            {HEADLINE_ACCENT.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
                <motion.span
                  className="inline-block text-shimmer"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + (HEADLINE_WORDS.length + i) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}{i < HEADLINE_ACCENT.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* 3 — Credential pills */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-2 mb-[clamp(2rem,2.6vw,3rem)]">
            {credentials.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-white/90 rounded-full px-3 py-1 tracking-[0.02em] font-semibold transition-all duration-300 hover:border-white/50 hover:bg-black/70 cursor-default"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* 4 — Proof stats: glass strip with animated counters */}
          <motion.div
            {...fadeUp(0.6)}
            className="inline-flex flex-wrap gap-x-10 gap-y-4 mb-[clamp(1.75rem,2.2vw,2.5rem)] rounded-2xl px-6 py-5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="font-mono font-black text-white tabular-nums leading-none"
                  style={{ fontSize: "clamp(1.7rem,1.2rem+1.4vw,2.4rem)", textShadow: "0 0 24px rgba(75,184,250,0.35)" }}
                >
                  <CountUp value={s.value} delay={0.7 + i * 0.12} />
                </span>
                <span className="text-[12px] text-white/70 tracking-[0.06em] font-semibold uppercase">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* 5 — CTAs */}
          <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shine inline-flex items-center gap-2 px-[clamp(1.5rem,2.2vw,2rem)] py-3.5 rounded-full bg-primary text-primary-foreground text-[15px] font-semibold transition-all duration-300 hover:opacity-95 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              style={{ boxShadow: "0 0 32px rgba(75,184,250,0.35), 0 4px 16px rgba(0,0,0,0.3)" }}
            >
              Download Resume <ArrowUpRight size={14} />
            </a>

            <MagneticButton
              href="#case-studies"
              className="items-center gap-2 px-[clamp(1.5rem,2.2vw,2rem)] py-3.5 rounded-full border border-white/30 text-[15px] font-medium text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              View Projects
              <ArrowRight size={14} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
