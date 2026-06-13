"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "2019–2020",
    role: "Customer Support Representative",
    company: "Frontizo Business Services",
    achievement: "Built Excel dashboards to track team KPIs; first exposure to turning operational data into decisions.",
    current: false,
  },
  {
    period: "2020–2022",
    role: "Investigation Specialist",
    company: "Amazon",
    achievement: "Investigated fraud at scale — developed the habit of questioning every number before trusting it.",
    current: false,
  },
  {
    period: "2022–2024",
    role: "Analytics Lead",
    company: "Amazon",
    achievement: "Built forecasting dashboards processing 100M+ records; identified $500K+ in revenue opportunities for seller leadership.",
    current: false,
  },
  {
    period: "2025",
    role: "Business Data Analyst",
    company: "Amplify Analytix",
    achievement: "Delivered enterprise Power BI reporting suites; eliminated hours of manual consolidation for global clients.",
    current: false,
  },
  {
    period: "2025–present",
    role: "BI & Analytics Engineer",
    company: "Amplify Analytix",
    achievement: "Architecting Lakehouse platforms on Microsoft Fabric and Databricks; 200+ enterprise users across 15 countries.",
    current: true,
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CareerEvolutionSection() {
  return (
    <section id="journey">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Career</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[14ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          Experience
        </motion.h2>

        <div className="relative max-w-4xl">
          {/* Vertical connector line */}
          <div
            aria-hidden
            className="absolute left-[calc(clamp(4rem,10vw,7rem)+0.5px)] top-2 bottom-2 w-px bg-border hidden sm:block"
          />

          <ol className="space-y-0">
            {timeline.map((item, i) => (
              <motion.li
                key={`${item.period}-${item.role}`}
                {...reveal(0.05 + i * 0.07)}
                className={`relative sm:grid sm:grid-cols-[clamp(4rem,10vw,7rem)_1.5rem_1fr] sm:gap-x-6 items-start py-[clamp(1.25rem,2vw,1.75rem)] ${
                  i > 0 ? "border-t border-border sm:border-none" : ""
                }`}
              >
                {/* Period */}
                <div className="mb-1 sm:mb-0 sm:text-right sm:pt-0.5">
                  <span className="font-mono text-[11px] text-muted-foreground tracking-[0.06em] leading-snug">
                    {item.period}
                  </span>
                </div>

                {/* Dot */}
                <div className="hidden sm:flex items-start justify-center pt-[3px]">
                  <span
                    className={`w-3 h-3 rounded-full border-2 border-background flex-shrink-0 ${
                      item.current ? "bg-primary" : "bg-muted-foreground/40"
                    } ${item.current ? "glow-accent" : ""}`}
                  />
                </div>

                {/* Content */}
                <div className="pl-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                    <h3
                      className={`text-[clamp(0.9rem,0.85rem+0.4vw,1.1rem)] font-semibold leading-snug ${
                        item.current ? "text-foreground" : ""
                      }`}
                    >
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono"
                        style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        now
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-1.5 font-medium">{item.company}</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[52ch]">
                    {item.achievement}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
