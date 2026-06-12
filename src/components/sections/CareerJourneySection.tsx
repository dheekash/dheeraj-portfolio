"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    company: "Frontizo Business Services",
    role: "Customer Service Associate",
    impact: [
      "Reduced AHT by 31%",
      "Achieved 94% contact resolution",
      "Built reporting systems adopted across teams",
    ],
  },
  {
    company: "Amazon",
    role: "Investigation Specialist & Analytics Lead",
    impact: [
      "Developed fraud detection models",
      "Reduced investigation time by 35 minutes",
      "Increased throughput by 30%",
      "Led 15-person analytics team",
      "Built executive BI reporting systems",
    ],
  },
  {
    company: "Amplify Analytix",
    role: "BI & Analytics Engineer",
    impact: [
      "Managed analytics delivery across 15 countries",
      "Built Fabric Lakehouse ecosystems",
      "Delivered 20+ enterprise data products",
      "Achieved 100% client retention",
    ],
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CareerJourneySection() {
  return (
    <section id="journey" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 18% 40%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="container-page section-pad relative">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Career journey
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[20ch] mb-[clamp(2.5rem,4vw,4rem)]">
          From operations to analytics engineering.
        </motion.h2>

        <div className="max-w-3xl">
          {steps.map((s, i) => (
            <div key={s.company}>
              <motion.article
                {...reveal(0.05 + i * 0.05)}
                className="glass card-lift rounded-2xl p-[clamp(1.5rem,1rem+2vw,2.5rem)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1.5">
                  <h3 className="font-semibold">{s.company}</h3>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm text-primary mb-5">{s.role}</p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {s.impact.map((line) => (
                    <li
                      key={line}
                      className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-primary/30"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.article>

              {i < steps.length - 1 && (
                <motion.div
                  {...reveal(0.1 + i * 0.05)}
                  className="flex justify-center py-[clamp(0.75rem,1.5vw,1.25rem)]"
                  aria-hidden
                >
                  <ArrowDown size={18} className="text-primary/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
