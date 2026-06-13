"use client";

import { motion } from "framer-motion";

const orgs = [
  { name: "Amazon",           detail: "Risk & Investigation · 2020–2024",          current: false },
  { name: "Amplify Analytix", detail: "BI & Analytics Engineering · 2025–present", current: true  },
  { name: "Frontizo",         detail: "Customer Operations · 2019–2020",            current: false },
  { name: "Hubhopper",        detail: "Analytics Advisory",                         current: false },
];

export function TrustBar() {
  return (
    <section aria-label="Professional experience">
      <div className="container-page border-t border-b border-border py-[clamp(2rem,3vw,3.5rem)]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center eyebrow mb-[clamp(1.5rem,2.5vw,2.5rem)]"
        >
          Experience across global organizations
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-6">
          {orgs.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <p className="text-[clamp(1rem,0.9rem+0.35vw,1.15rem)] font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                {o.name}
                {o.current && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-mono text-primary align-middle">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    now
                  </span>
                )}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1 tracking-[0.08em]">
                {o.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center text-sm text-muted-foreground mt-[clamp(1.25rem,2vw,2rem)] max-w-[65ch] mx-auto leading-relaxed"
        >
          Contributed to analytics, operations, reporting, automation, and business intelligence
          initiatives across enterprise and high-growth environments.
        </motion.p>
      </div>
    </section>
  );
}
