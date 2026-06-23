"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const DECOR = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    alt: "",
    className: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    initial: { x: -80, opacity: 0 },
    delay: 0.1,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    alt: "",
    className: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]",
    initial: { x: -80, opacity: 0 },
    delay: 0.25,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    alt: "",
    className: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    initial: { x: 80, opacity: 0 },
    delay: 0.15,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    alt: "",
    className: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]",
    initial: { x: 80, opacity: 0 },
    delay: 0.3,
  },
];

const ABOUT_TEXT =
  "Seven years across Amazon's global operations and enterprise analytics consulting. I design Lakehouse platforms on Microsoft Fabric and Databricks, build Power BI semantic models that executives stake decisions on, and architect the dbt and Snowflake pipelines behind them. I'm the person who translates what the CFO needs into what the data engineer actually builds.";

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
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  if (char === " ") {
    return <span style={{ display: "inline-block" }}>&nbsp;</span>;
  }
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Space-holder — keeps the word width stable */}
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
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = ABOUT_TEXT.split("");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "#0C0C0C" }}
    >
      {/* Decorative corner images */}
      {DECOR.map((img) => (
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          aria-hidden
          className={`absolute z-0 h-auto pointer-events-none select-none ${img.className}`}
          initial={img.initial}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: img.delay, ease: [0.25, 0.1, 0.25, 1] as const }}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-16 sm:gap-20 md:gap-24">

        {/* Group 1 — heading + scroll-reveal text */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">

          {/* "About me" — Kanit black, gradient fill */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="font-black uppercase leading-none tracking-tight text-center"
            style={{
              fontFamily: "var(--font-kanit, 'Kanit', sans-serif)",
              fontSize: "clamp(3rem, 12vw, 160px)",
              background: "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About me
          </motion.h2>

          {/* Scroll-driven character-by-character reveal */}
          <p
            className="text-center font-medium leading-relaxed max-w-[560px]"
            style={{
              color: "#D7E2EA",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
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
        </div>

        {/* Group 2 — Contact Me button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <a
            href="#contact"
            className="rounded-full inline-block text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-opacity duration-200 hover:opacity-90 active:opacity-75"
            style={{
              fontFamily: "var(--font-kanit, 'Kanit', sans-serif)",
              background:
                "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
              boxShadow:
                "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
              outline: "2px solid #E3E3E3",
              outlineOffset: "-3px",
            }}
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
