"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const quickFacts = [
  { label: "Location",     value: "Bengaluru, India"                          },
  { label: "Experience",   value: "7+ years"                                  },
  { label: "Industries",   value: "E-commerce · Finance · Manufacturing"      },
  { label: "Availability", value: "Open — full-time & freelance"              },
];

export function AboutSection() {
  return (
    <section id="about">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">About</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[14ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          Background
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,5vw,6rem)] gap-y-10 items-start">
          {/* Story — single focused paragraph */}
          <motion.div
            {...reveal(0.08)}
            className="lg:col-span-7 space-y-5"
          >
            <p className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground">
              Seven years across Amazon&apos;s global seller operations and enterprise analytics
              consulting at Amplify Analytix. My work sits at the intersection of{" "}
              <span className="text-foreground font-medium">
                Power BI semantic modeling, Microsoft Fabric Lakehouse architecture,
              </span>{" "}
              and the dbt and Databricks pipelines that feed them.
            </p>
            <p className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground">
              I&apos;ve shipped analytics platforms used by 200+ enterprise users across 15 countries,
              and I&apos;ve been the person who translates what the CFO needs into what the data
              engineer actually builds — on Snowflake, Fabric, and Databricks.
            </p>
          </motion.div>

          {/* Quick facts */}
          <motion.div {...reveal(0.1)} className="lg:col-span-4 lg:col-start-9">
            <div className="panel rounded-2xl overflow-hidden">
              {quickFacts.map((f, i) => (
                <div key={f.label} className={`px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}>
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    {f.label}
                  </p>
                  <p className="text-[13px] font-medium leading-snug">{f.value}</p>
                </div>
              ))}
              <div className="px-5 py-4 border-t border-border flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <p className="text-[13px] font-medium">Open to new opportunities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
