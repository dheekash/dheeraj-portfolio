"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Globe, Award, Clock, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { TypeWriter } from "@/components/common/TypeWriter";
import { enter, stagger, DURATION, EASE } from "@/lib/motion";

/* One accent across every stat — hue is not the differentiator here, the number is. */
const stats: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "7+",  label: "years in analytics",      Icon: Clock    },
  { value: "15+", label: "countries served",        Icon: Globe    },
  { value: "13",  label: "industry certifications", Icon: Award    },
  { value: "5M+", label: "records processed daily", Icon: Database },
];

const fadeUp = enter;

/* Animated counter — parses "40+" into 40 + suffix, counts up on view.
   Under reduced motion the final value is rendered immediately: a ticking
   number is motion, and the number is the content, so it must not be
   withheld from anyone who opted out. */
function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? target : 0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(target);
      return;
    }
    const controls = animate(count, target, {
      duration: DURATION.counter,
      delay,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, target, count, delay, reduce]);

  return (
    <motion.span ref={ref} className="inline-block">
      {rounded}
    </motion.span>
  );
}

/* Stat block — quiet surface, count-up metric. No decorative trend lines:
   a drawn sparkline under a real number implies data that does not exist. */
function StatArtifact({ value, label, delay, Icon, className = "" }: { value: string; label: string; delay: number; Icon: LucideIcon; className?: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`px-6 py-6 flex flex-col gap-4 ${className}`}
    >
      <span className="inline-flex" style={{ color: "var(--primary)" }}>
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div>
        <span
          className="block leading-none tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.1rem, 1.5rem + 1.6vw, 2.9rem)", color: "var(--foreground)", letterSpacing: "-0.03em" }}
        >
          <CountUp value={value} delay={delay + 0.1} />
        </span>
        <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
  const reduce = useReducedMotion();

  /* Ambient data-viz motif. Reveals once on load, then holds still —
     the identity cue is the shapes, not the looping. */
  const panel = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  });

  /* Pointer parallax. Motion values only — a useState-driven pointer handler
     re-renders the whole hero on every mousemove. Each plate moves a
     different few pixels, which is what reads as depth; anything larger
     reads as the page sliding around. Spring-damped so it settles rather
     than tracking the cursor rigidly. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, restDelta: 0.001 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, restDelta: 0.001 });
  /* Declared one by one rather than via a helper: a helper that calls
     useTransform is a rules-of-hooks violation even when the call count is
     stable. Depth order is far 3px / mid 6px / near 10px. */
  const farX = useTransform(sx, [-1, 1], [-3, 3]);
  const farY = useTransform(sy, [-1, 1], [-1.8, 1.8]);
  const midX = useTransform(sx, [-1, 1], [-6, 6]);
  const midY = useTransform(sy, [-1, 1], [-3.6, 3.6]);
  const nearX = useTransform(sx, [-1, 1], [-10, 10]);
  const nearY = useTransform(sy, [-1, 1], [-6, 6]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      onPointerMove={onPointer}
      onPointerLeave={onLeave}
    >
      {/* Data-viz identity plates (xl+). Overlapped and rotated into a single
          composed cluster rather than three stacked boxes, and sized to carry
          the right half of the hero instead of floating in its top corner. */}
      <div aria-hidden className="hidden xl:block absolute right-[3%] top-[14%] z-[1] w-[34rem] pointer-events-none">
        {/* Back plate — widest, furthest, least parallax */}
        <motion.div
          className="hero-plate absolute right-0 top-0 w-[30rem] p-6"
          style={{ x: farX,  y: farY,  rotate: -2.2 }}
          {...panel(0.45)}
        >
          <p className="hero-plate-label">Monthly pipeline volume</p>
          <svg viewBox="0 0 320 96" className="w-full h-auto">
            {[22, 44, 33, 64, 52, 78, 67, 88, 74, 96].map((h, i) => (
              <rect key={i} x={i * 32 + 5} y={96 - h} width="20" height={h} rx="3"
                fill="var(--primary)" opacity={0.2 + (i / 10) * 0.55} />
            ))}
          </svg>
        </motion.div>

        {/* Mid plate — overlaps the back plate's lower edge */}
        <motion.div
          className="hero-plate absolute right-[7.5rem] top-[11.5rem] w-[26rem] p-6"
          style={{ x: midX,  y: midY,  rotate: 1.6 }}
          {...panel(0.58)}
        >
          <p className="hero-plate-label">Failure rate · 12 months</p>
          <svg viewBox="0 0 280 76" className="w-full h-auto">
            {/* Descends: this plate is labelled failure rate, and a rising
                line here would illustrate the opposite of the result the
                case studies report. */}
            <polyline
              points="0,8 31,18 62,13 93,30 124,25 155,44 186,38 217,56 248,52 280,68"
              fill="none" stroke="var(--primary)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
            <circle cx="280" cy="68" r="4.5" fill="var(--primary)" />
          </svg>
        </motion.div>

        {/* Front plate — smallest, nearest, most parallax */}
        <motion.div
          className="hero-plate absolute right-[1rem] top-[21.5rem] w-[17rem] p-6"
          style={{ x: nearX, y: nearY, rotate: -1.2 }}
          {...panel(0.7)}
        >
          <p className="hero-plate-label">Source lineage</p>
          <svg viewBox="0 0 180 84" className="w-full h-auto">
            <g stroke="var(--primary)" strokeOpacity="0.32" strokeWidth="1.2">
              <line x1="90" y1="42" x2="22" y2="14" /><line x1="90" y1="42" x2="158" y2="16" />
              <line x1="90" y1="42" x2="26" y2="70" /><line x1="90" y1="42" x2="156" y2="68" />
            </g>
            {[[22, 14], [158, 16], [26, 70], [156, 68]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4.5" fill="var(--primary)" opacity={0.55} />
            ))}
            <circle cx="90" cy="42" r="7" fill="var(--primary)" />
          </svg>
        </motion.div>
      </div>

      <div className="container-page relative z-10 py-[clamp(3rem,1.5rem+4vw,5.5rem)]">
        <div className="max-w-[64rem]">
            {/* Availability — real semantic status, so the dot earns its place */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full"
              style={{ border: "1px solid var(--border)", background: "var(--muted)" }}
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--success)" }} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--muted-foreground)" }}>
                <span className="sm:hidden">BI &amp; Analytics Engineer · Open to hire</span>
                <span className="hidden sm:inline">BI &amp; Analytics Engineer · Available for hire</span>
              </span>
            </motion.div>

            {/* Display headline — emphasis carried by the accent, not a gradient */}
            <motion.h1
              {...fadeUp(0.08)}
              className="mb-7"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 1rem + 4vw, 4.2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "var(--foreground)",
                maxWidth: "18ch",
              }}
            >
              Building analytics platforms that power{" "}
              <span style={{ color: "var(--primary)" }}>enterprise decisions.</span>
            </motion.h1>

            {/* Trust signals — one scannable mono line under the headline */}
            <motion.p
              {...fadeUp(0.1)}
              className="mb-7 font-mono text-[12px] uppercase tracking-[0.08em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Microsoft Fabric Engineer&ensp;·&ensp;Power BI Expert&ensp;·&ensp;Snowflake Certified&ensp;·&ensp;Azure Data Platform
            </motion.p>

            {/* Currently building — typewriter with blinking caret */}
            <motion.div {...fadeUp(0.12)} className="mb-8 pl-3 flex items-baseline gap-2" style={{ borderLeft: "1px solid var(--border)" }}>
              <span className="font-mono text-[13px] uppercase tracking-[0.1em]" style={{ color: "var(--muted-foreground)" }}>Currently building</span>
              <TypeWriter
                words={["Lakehouses", "pipelines", "dashboards", "semantic models"]}
                className="font-mono text-[13px] uppercase tracking-[0.1em] min-w-[16ch] text-[color:var(--primary)]"
              />
            </motion.div>

            {/* CTA pair — one shape system, real link semantics on both */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-3 mt-2">
              <a
                href="#case-studies"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-[calc(var(--radius)*0.7)] border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] font-mono text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Explore case studies
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-[calc(var(--radius)*0.7)] border border-[var(--border)] text-[var(--foreground)] font-mono text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-[color,border-color,transform] duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[0.98]"
              >
                <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                Resume
              </a>
            </motion.div>
        </div>

        {/* ── Stat artifacts — row below the headline ── */}
        <div className="mt-[clamp(2.5rem,4vw,4rem)] grid grid-cols-2 lg:grid-cols-4 max-w-[62rem] rounded-[var(--radius)] border border-[var(--border)]">
          {stats.map((s, i) => (
            <StatArtifact
              key={s.label}
              value={s.value}
              label={s.label}
              Icon={s.Icon}
              delay={stagger(i, 0.3)}
              /* Hairlines between cells only, so the group reads as one object */
              className={`border-[var(--border)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} lg:border-b-0 lg:border-r ${i === stats.length - 1 ? "lg:border-r-0" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
