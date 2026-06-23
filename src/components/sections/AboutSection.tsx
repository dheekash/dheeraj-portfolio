"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const ABOUT_TEXT =
  "Microsoft-certified BI & Analytics Engineer with seven years at the intersection of enterprise data and business intelligence. At Amazon, I transformed fraud investigation data into analytics systems serving ten global marketplaces. Now at Amplify Analytix, I design Lakehouse architectures on Microsoft Fabric, build Power BI semantic models CFOs stake decisions on, and engineer Snowflake pipelines processing five million records daily — across fifteen countries with a hundred percent client retention.";

/* Each character animates from dim to full opacity as the section scrolls into view */
function AnimatedChar({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = Math.max(0, (index / total) - 0.1);
  const end   = Math.min(1, (index / total) + 0.05);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  if (char === " ") return <span style={{ display: "inline-block" }}>&nbsp;</span>;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span style={{ opacity, position: "absolute", left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const chars = ABOUT_TEXT.split("");

  return (
    /* Force dark mode so the navy background and white text render correctly
       regardless of the user's light/dark preference */
    <section
      id="about"
      ref={sectionRef}
      className="dark relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-24"
      style={{ background: "var(--background)" }}
    >
      {/* Subtle radial nebula glow — matches the hero palette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, var(--nebula-1) 0%, var(--nebula-2) 55%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-14 sm:gap-18 md:gap-20 text-center">

        {/* Large display heading — Instrument Serif, gradient fill */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="eyebrow mb-5">About</p>
          <h2
            className="leading-none tracking-tight font-normal"
            style={{
              fontFamily: "var(--font-display, 'Instrument Serif', serif)",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              background: "linear-gradient(175deg, var(--foreground) 30%, var(--muted-foreground) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About me
          </h2>
        </motion.div>

        {/* Scroll-driven character-by-character reveal */}
        <p
          className="font-medium leading-relaxed max-w-[56ch]"
          style={{
            color: "var(--foreground)",
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
          }}
        >
          {chars.map((char, i) => (
            <AnimatedChar
              key={i}
              char={char}
              index={i}
              total={chars.length}
              progress={scrollYProgress}
            />
          ))}
        </p>

        {/* CTA — portfolio-style primary button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            Get in touch <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
