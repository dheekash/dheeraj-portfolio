"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";
import { profile } from "@/data/profile";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function Headshot() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can 404 before hydration attaches onError — re-check on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#101726] to-[#05070D]">
        <span className="text-6xl font-semibold tracking-tight text-foreground/20">DK</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/images/headshot.jpg"
      alt="Dheeraj Kashyap"
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Backdrop: grid + top glow */}
      <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(77,141,255,0.14) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="container-max px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-24 lg:pb-28 relative">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-20 items-center">
          {/* ── Left: statement ── */}
          <div>
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card mb-8">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Open to senior analytics roles
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} className="mb-7">
              <span className="ink-gradient">Turning complex data into</span>{" "}
              <span className="accent-gradient">business growth.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
              6+ years helping organizations transform data into actionable
              insights through Analytics, Business Intelligence, Automation,
              and Cloud Technologies.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Download Resume <ArrowUpRight size={14} />
              </a>
            </motion.div>

            {/* Credibility row */}
            <motion.div {...fadeUp(0.32)} className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground/70">
                ex-Amazon
              </span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground/70">
                Certified by
              </span>
              <div className="flex items-center gap-5 opacity-60">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MicrosoftLogo size={16} /> Microsoft</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><DatabricksLogo size={16} /> Databricks</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><SnowflakeLogo size={16} /> Snowflake</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: headshot ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-sm mx-auto lg:max-w-none w-full"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card noise">
              <Headshot />
              {/* Bottom info chip */}
              <div className="absolute bottom-4 left-4 right-4 glass-nav rounded-xl px-5 py-4 border border-border">
                <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {profile.role} · {profile.location}
                </p>
              </div>
            </div>
            {/* Accent edge glow */}
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl pointer-events-none"
              style={{ boxShadow: "0 0 60px rgba(77,141,255,0.12)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
