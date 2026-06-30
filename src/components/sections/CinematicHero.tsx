"use client";

import { useEffect, useRef } from "react";
import { motion, motionValue, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, Award, Building2, BarChart3 } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const primaryMetrics = [
  { end: 7,   suffix: "+",  label: "Years experience",       decimals: 0, Icon: Clock     },
  { end: 13,  suffix: "",   label: "Microsoft credentials",  decimals: 0, Icon: Award     },
  { end: 20,  suffix: "+",  label: "Enterprise solutions",   decimals: 0, Icon: Building2 },
  { end: 100, suffix: "+",  label: "Reports & dashboards",   decimals: 0, Icon: BarChart3 },
];


function AnimatedCounter({
  end,
  suffix,
  delay = 0,
  decimals = 0,
}: {
  end: number;
  suffix: string;
  delay?: number;
  decimals?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (prefersReduced) {
      node.textContent = end.toFixed(decimals) + suffix;
      return;
    }
    const mv = motionValue(0);
    const unsub = mv.on("change", (v) => {
      if (node) node.textContent = v.toFixed(decimals) + suffix;
    });
    const controls = animate(mv, end, { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] });
    return () => { controls.stop(); unsub(); };
  }, [end, suffix, delay, prefersReduced, decimals]);

  return <span ref={nodeRef}>{(0).toFixed(decimals)}{suffix}</span>;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CinematicHero() {
  const prefersReduced = useReducedMotion();

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
            "linear-gradient(108deg, rgba(7,15,28,0.88) 0%, rgba(7,15,28,0.65) 52%, rgba(7,15,28,0.45) 100%)",
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
        <div className="grid lg:grid-cols-[1fr_clamp(18rem,28vw,24rem)] gap-x-[clamp(2rem,4vw,5rem)] gap-y-12 items-start">

          {/* Left: headline + subtext + CTAs */}
          <div className="max-w-[58ch]">

            {/* Name + live status */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-[clamp(1rem,1.5vw,1.5rem)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[13px] font-medium text-white/65 tracking-[0.01em]">
                Dheeraj Kashyap · BI & Analytics Engineer · Available for hire
              </span>
            </motion.div>

            {/* Single clear headline — static for clarity (Hick's Law) */}
            <motion.h1
              {...fadeUp(0.08)}
              className="max-w-[22ch] text-white mb-[clamp(1.25rem,1.8vw,2rem)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 1rem + 3.4vw, 4.8rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              Building analytics platforms that power enterprise decisions.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.12)}
              className="text-[clamp(0.9rem,0.85rem+0.3vw,1.05rem)] leading-relaxed text-white/75 mb-[clamp(1.75rem,2.2vw,2.5rem)] max-w-[46ch]"
            >
              I build analytics platforms people use.{" "}
              Lakehouses, semantic models, pipelines.{" "}
              Seven years in, 13 Microsoft certifications, and still the person asking:{" "}
              <em>"What decision does this dashboard help you make?"</em>{" "}
              <span className="text-white/90 font-medium">Open to BI and Analytics Engineering roles.</span>
            </motion.p>

            {/* CTAs */}
            {/* 2 CTAs — primary + secondary (Hick's Law: clear single choice) */}
            <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#case-studies"
                className="items-center gap-2 px-[clamp(1.5rem,2.2vw,2rem)] py-3.5 rounded-full bg-primary text-primary-foreground text-[15px] font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                View Projects
                <ArrowRight size={14} />
              </MagneticButton>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[clamp(1.5rem,2.2vw,2rem)] py-3.5 rounded-full border border-white/30 text-[15px] font-medium text-white hover:bg-white/10 hover:border-white/50 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Download Resume <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right: stat cards (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:grid grid-cols-2 gap-3 pt-1 content-start"
          >
            {primaryMetrics.map((m, i) => (
              <div
                key={m.label}
                className="rounded-2xl px-4 py-4 flex flex-col gap-1.5 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <m.Icon size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
                <p
                  className="font-mono tabular-nums font-bold leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(1.8rem, 1rem + 1.8vw, 2.8rem)" }}
                >
                  <AnimatedCounter
                    end={m.end}
                    suffix={m.suffix}
                    delay={0.5 + i * 0.12}
                    decimals={m.decimals}
                  />
                </p>
                <p className="text-[11px] text-white/55 tracking-[0.03em] font-medium leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile metrics strip */}
        <motion.div
          {...fadeUp(0.38)}
          className="mt-[clamp(2rem,3.5vw,4rem)] pt-[clamp(1rem,1.5vw,1.5rem)] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden"
        >
          {primaryMetrics.map((m, i) => (
            <div
              key={m.label}
              className="rounded-xl px-3 py-3"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <m.Icon size={12} style={{ color: "rgba(255,255,255,0.45)", marginBottom: "0.25rem" }} />
              <p className="font-mono tabular-nums font-bold text-[clamp(1.4rem,1rem+2vw,2rem)] leading-none text-white">
                <AnimatedCounter end={m.end} suffix={m.suffix} delay={0.3 + i * 0.1} decimals={m.decimals} />
              </p>
              <p className="text-[10px] text-white/50 mt-1 leading-snug">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
