"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, motionValue, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Mail } from "lucide-react";
import { DataStreamCanvas } from "@/components/common/DataStreamCanvas";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const headlines = [
  "I build data systems that help companies make faster, smarter decisions.",
  "I turn raw data into pipelines, dashboards, and decisions that scale.",
  "I architect analytics platforms that enterprise teams actually use.",
  "I design data infrastructure built on trust, not just speed.",
];

/* Primary metrics shown large in the right column */
const primaryMetrics = [
  { end: 5,   suffix: "M+",  label: "Records processed daily" },
  { end: 188, suffix: "+",   label: "Pipelines built"          },
  { end: 180, suffix: "%",   label: "Efficiency gain"          },
];

/* Secondary metrics in the bottom stat row */
const secondaryMetrics = [
  { num: "6+",  label: "Years experience"       },
  { num: "13",  label: "Certifications earned"  },
  { num: "100+",label: "Stakeholders supported" },
];

/* Counter using Motion's value system — no React state churn during animation */
function AnimatedCounter({
  end,
  suffix,
  delay = 0,
}: {
  end: number;
  suffix: string;
  delay?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (prefersReduced) {
      node.textContent = end + suffix;
      return;
    }
    const mv = motionValue(0);
    const unsub = mv.on("change", (v) => {
      if (node) node.textContent = Math.round(v) + suffix;
    });
    const controls = animate(mv, end, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [end, suffix, delay, prefersReduced]);

  return <span ref={nodeRef}>{0}{suffix}</span>;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CinematicHero() {
  const [idx, setIdx] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 5500);
    return () => clearInterval(t);
  }, [prefersReduced]);

  return (
    <section id="top" className="relative overflow-hidden min-h-[min(48rem,96svh)] flex items-center">
      {/* Background canvas */}
      <div aria-hidden className="absolute inset-0">
        <DataStreamCanvas />
      </div>

      {/* Atmospheric overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 15%, var(--nebula-1) 0%, var(--nebula-2) 50%, transparent 75%), linear-gradient(108deg, var(--background) 5%, color-mix(in srgb, var(--background) 50%, transparent) 52%, transparent 100%)",
        }}
      />

      <div className="container-page relative py-[clamp(4.5rem,2.5rem+5vw,8rem)] w-full">
        <div className="grid lg:grid-cols-[1fr_clamp(14rem,28vw,22rem)] gap-x-[clamp(3rem,6vw,7rem)] gap-y-12 items-start">

          {/* ── Left: headline + subtext + CTAs ── */}
          <div className="max-w-[58ch]">

            {/* Availability dot — not an eyebrow, a status indicator */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-[clamp(1rem,1.5vw,1.5rem)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-[12px] font-medium text-emerald-700 dark:text-emerald-400 tracking-[0.02em]">
                Currently available for projects
              </span>
            </motion.div>

            {/* Rotating headline */}
            <div
              className="relative mb-[clamp(1.25rem,1.8vw,2rem)]"
              style={{ minHeight: "clamp(4.8rem, 1rem + 9vw, 11rem)" }}
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={idx}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-title ink-fade max-w-[24ch]"
                >
                  {headlines[idx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.12)}
              className="text-[clamp(0.9rem,0.85rem+0.3vw,1.1rem)] leading-relaxed text-muted-foreground mb-[clamp(1.75rem,2.2vw,2.5rem)] max-w-[46ch]"
            >
              Six years of pipeline engineering at Amazon scale. Now building Lakehouse
              platforms for enterprise clients at Amplify Analytix.{" "}
              <span className="text-foreground font-medium">Open to full-time and freelance.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.22)}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Calendar size={14} /> Book a Call
                <ArrowRight size={13} />
              </MagneticButton>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full panel text-sm font-medium text-foreground hover:border-primary/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Download Resume <ArrowUpRight size={13} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-[clamp(0.75rem,1.2vw,1rem)] py-[clamp(0.8rem,1.1vw,1rem)] text-sm text-muted-foreground hover:text-primary transition-colors duration-150 group"
              >
                <Mail size={13} className="group-hover:scale-110 transition-transform" />
                Contact
              </a>
            </motion.div>
          </div>

          {/* ── Right: large typographic metrics (no card boxes) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-[clamp(1.75rem,3vw,3.25rem)] pt-1"
          >
            {primaryMetrics.map((m, i) => (
              <div key={m.label} className="group">
                <p
                  className="font-mono tabular-nums font-bold leading-none tracking-tight text-foreground"
                  style={{ fontSize: "clamp(3rem, 2rem + 2.5vw, 5rem)" }}
                >
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={0.5 + i * 0.15} />
                </p>
                <p className="text-[12px] text-muted-foreground mt-1 tracking-[0.04em] font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom: secondary metrics strip ── */}
        <motion.div
          {...fadeUp(0.38)}
          className="mt-[clamp(2.5rem,4vw,5rem)] pt-[clamp(1.25rem,1.8vw,2rem)] border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-x-[clamp(1.5rem,4vw,5rem)] gap-y-4"
        >
          {/* Mobile-only: show primary metrics here too */}
          <div className="contents lg:hidden">
            {primaryMetrics.map((m, i) => (
              <div key={m.label}>
                <p className="font-mono tabular-nums font-bold text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none text-foreground">
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={0.3 + i * 0.1} />
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {secondaryMetrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono tabular-nums font-semibold text-[clamp(1.1rem,1rem+0.6vw,1.5rem)] leading-none text-foreground">
                {m.num}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
