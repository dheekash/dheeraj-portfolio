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

function HeroPortrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[min(22rem,80vw)] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 60% 30%, var(--nebula-1), transparent 70%)" }}
      />
      <figure className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden panel">
        {failed ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <span className="text-[clamp(3rem,8vw,5rem)] font-semibold tracking-tight text-muted-foreground/30">
              DK
            </span>
            <p className="text-[10px] text-muted-foreground/30 font-mono tracking-[0.2em] uppercase">
              Add headshot.jpg
            </p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src="/images/headshot.jpg"
            alt="Dheeraj Kashyap"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover grayscale contrast-[1.05]"
            onError={() => setFailed(true)}
          />
        )}
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
    <section id="top" className="relative overflow-hidden min-h-[min(56rem,100svh)] flex items-center">
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

      <div className="container-page relative py-[clamp(6.5rem,4rem+8vw,11rem)] grid lg:grid-cols-12 gap-x-[clamp(2rem,4vw,4rem)] gap-y-12 items-center">
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow mb-[clamp(1.25rem,2vw,2rem)]">
            Dheeraj Kashyap · BI &amp; Analytics Engineer · 13× Certified
          </motion.p>

          <div className="relative mb-[clamp(1.75rem,3vw,2.5rem)] min-h-[2.05em] [font-size:clamp(3rem,1.5rem+6.5vw,8rem)]">
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
            className="max-w-[55ch] leading-relaxed text-muted-foreground mb-[clamp(1.5rem,2vw,2rem)]"
          >
            BI &amp; Analytics Engineer with 6+ years designing analytics platforms,
            building enterprise data pipelines, and delivering reporting solutions
            that help stakeholders make faster, more informed decisions.
          </motion.p>

          {/* Tech stack badges */}
          <motion.div
            {...fadeUp(0.22)}
            className="flex flex-wrap items-center gap-2 mb-[clamp(2rem,3vw,3rem)]"
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

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] mb-[clamp(1.25rem,2vw,1.75rem)]"
          >
            <MagneticButton
              href="#case-studies"
              className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              View Projects <ArrowRight size={15} />
            </MagneticButton>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium text-foreground hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Download Resume <ArrowUpRight size={14} />
            </a>
          </motion.div>

          <motion.a
            {...fadeUp(0.38)}
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-150 group"
          >
            <Mail size={13} className="group-hover:scale-110 transition-transform duration-150" />
            or contact me directly
          </motion.a>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 order-first lg:order-none"
        >
          <HeroPortrait />
        </motion.div>
      </div>
    </section>
  );
}
