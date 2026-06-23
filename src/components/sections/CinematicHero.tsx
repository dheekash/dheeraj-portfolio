"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, motionValue, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Mail } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const headlines = [
  "I build enterprise data platforms that power real-time decisions at scale.",
  "I architect Lakehouse solutions on Fabric, Databricks, and Snowflake.",
  "I turn complex data estates into governed analytics products teams trust.",
  "I design data infrastructure that executives stake business decisions on.",
];

const primaryMetrics = [
  { end: 7,  suffix: "+",  label: "Years experience"        },
  { end: 15, suffix: "+",  label: "Countries supported"     },
  { end: 20, suffix: "+",  label: "Data products delivered" },
];

const secondaryMetrics = [
  { num: "5M+",  label: "Daily records processed" },
  { num: "13",   label: "Certifications earned"   },
  { num: "100%", label: "Client retention"        },
];

function AnimatedCounter({ end, suffix, delay = 0 }: { end: number; suffix: string; delay?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (prefersReduced) { node.textContent = end + suffix; return; }
    const mv = motionValue(0);
    const unsub = mv.on("change", (v) => { if (node) node.textContent = Math.round(v) + suffix; });
    const controls = animate(mv, end, { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] });
    return () => { controls.stop(); unsub(); };
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
    /* Force dark rendering over video so text is always white */
    <section id="top" className="dark relative overflow-hidden min-h-[min(48rem,96svh)] flex items-center">

      {/* ── Video background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_SRC}
      />

      {/* Cinematic overlay — deepens video so text sits cleanly */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(7,15,28,0.82) 0%, rgba(7,15,28,0.55) 52%, rgba(7,15,28,0.35) 100%)",
        }}
      />

      {/* Atmospheric nebula accent */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 78% 12%, rgba(21,145,220,0.18) 0%, rgba(75,184,250,0.07) 50%, transparent 75%)",
        }}
      />

      <div className="container-page relative z-10 py-[clamp(4.5rem,2.5rem+5vw,8rem)] w-full">
        <div className="grid lg:grid-cols-[1fr_clamp(14rem,28vw,22rem)] gap-x-[clamp(3rem,6vw,7rem)] gap-y-12 items-start">

          {/* ── Left: headline + subtext + CTAs ── */}
          <div className="max-w-[58ch]">

            {/* Availability badge */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-[clamp(1rem,1.5vw,1.5rem)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[12px] font-medium text-emerald-300 tracking-[0.02em]">
                BI &amp; Analytics Engineer · Available
              </span>
            </motion.div>

            {/* Rotating headline — Instrument Serif display font */}
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
                  className="max-w-[24ch] text-white"
                  style={{
                    fontFamily: "var(--font-display, 'Instrument Serif', serif)",
                    fontWeight: 400,
                    fontSize: "clamp(2.1rem, 1rem + 3.4vw, 4.8rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {headlines[idx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.12)}
              className="text-[clamp(0.9rem,0.85rem+0.3vw,1.1rem)] leading-relaxed text-white/60 mb-[clamp(1.75rem,2.2vw,2.5rem)] max-w-[46ch]"
            >
              Helping organizations build scalable data platforms and executive analytics products
              on Microsoft Fabric, Databricks, and Snowflake.{" "}
              <span className="text-white/90 font-medium">Open to BI and Analytics Engineering roles.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <Calendar size={14} /> Book a Call
                <ArrowRight size={13} />
              </MagneticButton>

              {/* Liquid-glass secondary CTA */}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full text-sm font-medium text-white hover:scale-[1.03] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Download Resume <ArrowUpRight size={13} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-[clamp(0.75rem,1.2vw,1rem)] py-[clamp(0.8rem,1.1vw,1rem)] text-sm text-white/50 hover:text-white transition-colors duration-150 group"
              >
                <Mail size={13} className="group-hover:scale-110 transition-transform" />
                Contact
              </a>
            </motion.div>
          </div>

          {/* ── Right: large typographic metrics ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-[clamp(1.75rem,3vw,3.25rem)] pt-1"
          >
            {primaryMetrics.map((m, i) => (
              <div key={m.label}>
                <p
                  className="font-mono tabular-nums font-bold leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(3rem, 2rem + 2.5vw, 5rem)" }}
                >
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={0.5 + i * 0.15} />
                </p>
                <p className="text-[12px] text-white/50 mt-1 tracking-[0.04em] font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom: secondary metrics strip ── */}
        <motion.div
          {...fadeUp(0.38)}
          className="mt-[clamp(2.5rem,4vw,5rem)] pt-[clamp(1.25rem,1.8vw,2rem)] border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-x-[clamp(1.5rem,4vw,5rem)] gap-y-4"
        >
          <div className="contents lg:hidden">
            {primaryMetrics.map((m, i) => (
              <div key={m.label}>
                <p className="font-mono tabular-nums font-bold text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none text-white">
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={0.3 + i * 0.1} />
                </p>
                <p className="text-[11px] text-white/50 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {secondaryMetrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono tabular-nums font-semibold text-[clamp(1.1rem,1rem+0.6vw,1.5rem)] leading-none text-white">
                {m.num}
              </p>
              <p className="text-[11px] text-white/50 mt-1">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
