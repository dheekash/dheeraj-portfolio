"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Mail } from "lucide-react";
import { DataStreamCanvas } from "@/components/common/DataStreamCanvas";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const heroStats = [
  { num: "5M+",  label: "Records processed daily"    },
  { num: "188+", label: "Pipelines built"             },
  { num: "180%", label: "Reporting efficiency gain"   },
  { num: "6+",   label: "Years of experience"         },
  { num: "13",   label: "Certifications earned"       },
  { num: "100+", label: "Stakeholders supported"      },
];

const headlines = [
  "I build data systems that help companies make faster, smarter decisions.",
  "I turn raw data into pipelines, dashboards, and decisions that scale.",
  "I architect analytics platforms that enterprise teams actually use.",
  "I design data infrastructure built on trust, not just speed.",
];

function HeroPortrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className="relative mx-auto w-full max-w-[min(18rem,80vw)] lg:max-w-none">
        <div
          aria-hidden
          className="absolute -inset-4 rounded-[2rem] pointer-events-none"
          style={{ background: "radial-gradient(60% 60% at 60% 30%, var(--nebula-1), transparent 70%)" }}
        />
        {/* [NEEDS REAL CONTENT] Replace with actual headshot */}
        <div className="aspect-[4/5] rounded-[1.5rem] panel flex flex-col items-center justify-center gap-3">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground"
            style={{ background: "var(--primary)" }}
          >
            DK
          </div>
          <p className="text-sm text-muted-foreground font-mono">[NEEDS REAL CONTENT]</p>
          <p className="text-xs text-muted-foreground">Add headshot.jpg to /public/images/</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[min(18rem,80vw)] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 60% 30%, var(--nebula-1), transparent 70%)" }}
      />
      <figure className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/images/headshot.jpg"
          alt="Dheeraj Kashyap, Business Intelligence and Analytics Engineer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
        <figcaption className="absolute inset-x-3 bottom-3 panel rounded-xl px-4 py-2.5 backdrop-blur">
          <p className="text-sm font-semibold leading-tight">{profile.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">BI &amp; Analytics Engineer</p>
        </figcaption>
      </figure>
    </div>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CinematicHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden min-h-[min(44rem,94svh)] flex items-center">
      <div aria-hidden className="absolute inset-0">
        <DataStreamCanvas />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 72% 20%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%), linear-gradient(100deg, var(--background) 8%, color-mix(in srgb, var(--background) 55%, transparent) 55%, transparent 100%)",
        }}
      />

      <div className="container-page relative py-[clamp(4rem,2.25rem+4vw,7rem)] grid lg:grid-cols-12 gap-x-[clamp(2rem,4vw,4rem)] gap-y-10 items-center">

        {/* ── Left column ── */}
        <div className="lg:col-span-7">

          {/* Availability badge */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-[clamp(0.75rem,1vw,1.25rem)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-[12px] font-medium text-emerald-700 dark:text-emerald-400">
              Currently available for projects
            </span>
          </motion.div>

          {/* Rotating headline */}
          <div className="relative mb-[clamp(1rem,1.5vw,1.5rem)] min-h-[3em] [font-size:clamp(1.75rem,1rem+2.8vw,4rem)]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={idx}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="hero-title ink-fade max-w-[20ch]"
              >
                {headlines[idx]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.1)}
            className="max-w-[50ch] text-[clamp(0.9rem,0.85rem+0.25vw,1.05rem)] leading-relaxed text-muted-foreground mb-[clamp(1.5rem,1.8vw,2rem)]"
          >
            Turning raw business data into trusted pipelines, decisions, and reports that enterprise
            teams depend on every day.{" "}
            <span className="text-foreground font-medium">Open to full-time and freelance.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.22)}
            className="flex flex-wrap items-center gap-3 mb-[clamp(1.75rem,2vw,2.5rem)]"
          >
            {/* [NEEDS REAL CONTENT] Replace href with actual Calendly URL */}
            <MagneticButton
              href={profile.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Calendar size={15} /> Book a Call
              <ArrowRight size={14} />
            </MagneticButton>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full panel text-sm font-medium text-foreground hover:border-primary/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Download Resume <ArrowUpRight size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-[clamp(1rem,1.5vw,1.25rem)] py-[clamp(0.8rem,1.1vw,1rem)] text-sm text-muted-foreground hover:text-primary transition-colors duration-150 group"
            >
              <Mail size={13} className="group-hover:scale-110 transition-transform" />
              Contact
            </a>
          </motion.div>

          {/* Stats grid — 6 metrics */}
          <motion.div
            {...fadeUp(0.3)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border pt-[clamp(1rem,1.5vw,1.5rem)]"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="panel rounded-xl px-4 py-3">
                <p className="font-mono tabular-nums font-bold text-foreground text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-none mb-1">
                  {s.num}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: portrait ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 lg:col-start-9 order-first lg:order-none"
        >
          <HeroPortrait />
        </motion.div>
      </div>
    </section>
  );
}
