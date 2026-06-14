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
  { label: "Location",          value: "Bengaluru, India" },
  { label: "Experience",        value: "7+ years"         },
  { label: "Industries served", value: "Retail, Manufacturing, E-commerce, Finance" },
  { label: "Availability",      value: "Open: full-time and freelance" },
];


export function AboutSection() {
  return (
    <section id="about">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">About</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[14ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          My background
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 items-start">
          {/* Story */}
          <div className="lg:col-span-7 space-y-[clamp(1rem,1.5vw,1.5rem)]">
            <motion.p
              {...reveal(0.08)}
              className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground"
            >
              I started in operations and spent years close to the business problems that bad data
              creates. That&apos;s why I build pipelines that don&apos;t just move data. They make
              it usable by the people who need it most.
            </motion.p>
            <motion.p
              {...reveal(0.12)}
              className="text-[clamp(1rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-muted-foreground"
            >
              Four years at Amazon taught me what it means to trust a number with a business
              decision on the line. Today at Amplify Analytix, I design Lakehouse platforms on
              Microsoft Fabric and Databricks that 200+ enterprise users across 15 countries
              depend on every day.
            </motion.p>

          </div>

          {/* Quick facts */}
          <motion.div {...reveal(0.1)} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow mb-5">Quick facts</p>
            <div className="panel rounded-2xl overflow-hidden">
              {quickFacts.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    {f.label}
                  </p>
                  <p className="text-[14px] font-medium leading-snug">{f.value}</p>
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
