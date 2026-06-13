"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { DataStreamCanvas } from "@/components/common/DataStreamCanvas";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";
import {
  PowerBILogo, FabricLogo, DatabricksLogo, SnowflakeLogo,
  PythonLogo, SQLLogo, AzureLogo, AWSLogo,
} from "@/components/common/TechLogos";

const techStack = [
  { label: "Power BI",   Logo: PowerBILogo    },
  { label: "Fabric",     Logo: FabricLogo     },
  { label: "Databricks", Logo: DatabricksLogo },
  { label: "Snowflake",  Logo: SnowflakeLogo  },
  { label: "SQL",        Logo: SQLLogo        },
  { label: "Python",     Logo: PythonLogo     },
  { label: "Azure",      Logo: AzureLogo      },
  { label: "AWS",        Logo: AWSLogo        },
];

const impactStats = [
  { num: "5M+",  label: "Records processed daily"          },
  { num: "20+",  label: "Analytics solutions delivered"     },
  { num: "100+", label: "Stakeholders supported"            },
  { num: "13×",  label: "Professional certifications"       },
];

function HeroStatsPanel() {
  return (
    <div className="space-y-2.5">
      {impactStats.map((s) => (
        <div
          key={s.num}
          className="panel rounded-xl px-4 py-3 flex items-center justify-between gap-4 panel-lift"
        >
          <span className="font-mono tabular-nums font-semibold accent-text text-[clamp(1.1rem,1rem+0.4vw,1.35rem)]">
            {s.num}
          </span>
          <span className="text-[13px] text-muted-foreground text-right leading-snug">{s.label}</span>
        </div>
      ))}
      <div className="panel rounded-xl px-4 py-3 flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="text-[13px] font-medium">Open to new opportunities</span>
      </div>
    </div>
  );
}

function HeroPortrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <HeroStatsPanel />;

  return (
    <div className="relative mx-auto w-full max-w-[min(20rem,80vw)] lg:max-w-none">
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
          alt="Dheeraj Kashyap"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover grayscale contrast-[1.05]"
          onError={() => setFailed(true)}
        />
        <figcaption className="absolute inset-x-3 bottom-3 panel rounded-xl px-4 py-2.5 backdrop-blur">
          <p className="text-sm font-semibold leading-tight">{profile.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{profile.role}</p>
        </figcaption>
      </figure>
    </div>
  );
}

const headlines = [
  <>Where data engineering meets <span className="accent-text">business impact.</span></>,
  <>Turning complex data into <span className="accent-text">business growth.</span></>,
  <>Building decision systems, <span className="accent-text">not dashboards.</span></>,
  <>Architecting data platforms <span className="accent-text">that scale.</span></>,
];

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
    const t = setInterval(() => setIdx((i) => (i + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden min-h-[min(42rem,92svh)] flex items-center">
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
        {/* ── Left: all text content ── */}
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow mb-[clamp(0.75rem,1vw,1.25rem)]">
            Dheeraj Kashyap · BI &amp; Analytics Engineer · 13× Certified
          </motion.p>

          {/* Rotating headline */}
          <div className="relative mb-[clamp(1.25rem,1.5vw,2rem)] min-h-[2.05em] [font-size:clamp(2rem,1rem+3vw,4.5rem)]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={idx}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="hero-title ink-fade max-w-[15ch]"
              >
                {headlines[idx]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            {...fadeUp(0.15)}
            className="max-w-[52ch] leading-relaxed text-muted-foreground mb-[clamp(1rem,1.2vw,1.5rem)]"
          >
            BI &amp; Analytics Engineer with 6+ years designing analytics platforms,
            building enterprise data pipelines, and delivering reporting solutions
            that help stakeholders make faster, more informed decisions.
          </motion.p>

          {/* Tech stack badges */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-wrap items-center gap-2 mb-[clamp(1rem,1.2vw,1.5rem)]"
          >
            {techStack.map(({ label, Logo }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg panel text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-150"
              >
                <Logo size={13} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Inline impact metrics */}
          <motion.div
            {...fadeUp(0.26)}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-[clamp(1.25rem,1.8vw,2rem)] border-t border-border pt-[clamp(0.75rem,1vw,1.25rem)]"
          >
            {[
              { num: "5M+",  l: "Records daily"       },
              { num: "20+",  l: "Solutions delivered"  },
              { num: "100+", l: "Stakeholders"         },
              { num: "180%", l: "Efficiency gain"      },
            ].map((m) => (
              <div key={m.l} className="flex items-baseline gap-1.5">
                <span className="font-mono tabular-nums font-semibold accent-text text-[clamp(1rem,0.9rem+0.4vw,1.2rem)]">
                  {m.num}
                </span>
                <span className="text-[12px] text-muted-foreground">{m.l}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.32)}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#case-studies"
              className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              View Projects <ArrowRight size={15} />
            </MagneticButton>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.1vw,1rem)] rounded-full panel text-sm font-medium text-foreground hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
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
        </div>

        {/* ── Right: portrait or stats panel ── */}
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
