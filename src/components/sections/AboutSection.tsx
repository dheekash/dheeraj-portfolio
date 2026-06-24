"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const ABOUT_TEXT =
  "Microsoft-certified BI & Analytics Engineer. Five years shipping Lakehouse platforms, Power BI semantic models, and analytics pipelines on Microsoft Fabric and Snowflake — across 15 countries with 100% client retention.";

const SKILLS = [
  "Power BI",
  "SQL",
  "Python",
  "Microsoft Fabric",
  "Azure",
  "Data Modeling",
  "Dashboard Development",
  "DAX",
  "ETL",
  "Snowflake",
];

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
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

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
    offset: ["start 0.85", "end 0.2"],
  });

  const chars = ABOUT_TEXT.split("");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="dark relative overflow-hidden px-5 sm:px-8 md:px-10 py-[clamp(3.5rem,6vw,6rem)]"
      style={{ background: "var(--background)" }}
    >
      {/* Subtle nebula glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, var(--nebula-1) 0%, var(--nebula-2) 55%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center gap-10 text-center">

        {/* Display heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="leading-none tracking-tight font-normal"
          style={{
            fontFamily: "var(--font-display, 'Instrument Serif', serif)",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            background: "linear-gradient(175deg, var(--foreground) 30%, var(--muted-foreground) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          About me
        </motion.h2>

        {/* Scroll-driven character reveal */}
        <p
          className="font-medium leading-relaxed max-w-[65ch] text-pretty"
          style={{
            color: "var(--foreground)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
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

        {/* Skill pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-wrap justify-center gap-2"
        >
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-[12px] font-medium text-white/80 border border-white/15 bg-white/8"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
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
