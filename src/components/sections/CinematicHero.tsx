"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
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
        <div className="max-w-[58ch]">

          {/* Name + live status */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-[clamp(1rem,1.5vw,1.5rem)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[13px] font-medium text-white/65 tracking-[0.01em]">
              Dheeraj Kashyap · BI & Analytics Engineer · Available for hire
            </span>
          </motion.div>

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

          <motion.div {...fadeUp(0.16)} className="flex flex-wrap items-center gap-3">
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
      </div>
    </section>
  );
}
