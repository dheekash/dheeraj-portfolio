"use client";

import { motion } from "framer-motion";

const orgs = [
  { name: "Amazon",           detail: "Risk & Investigation · 2020–2024",                    current: false },
  { name: "Amplify Analytix", detail: "Business Intelligence & Analytics Eng. · 2025–present", current: true  },
  { name: "Frontizo",         detail: "Customer Operations · 2019–2020",                      current: false },
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
          Trusted across enterprise analytics environments
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-[clamp(3rem,8vw,8rem)] gap-y-6">
          {orgs.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <p className="text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                {o.name}
                {o.current && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-mono text-primary align-middle">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
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
          Over 6 years of experience delivering analytics, reporting, automation, and business
          intelligence solutions across enterprise-scale operations.
        </motion.p>

        {/* Amazon credibility callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-[clamp(1.5rem,2.5vw,2.5rem)] max-w-3xl mx-auto"
        >
          <div
            className="panel rounded-2xl px-[clamp(1.25rem,2.5vw,2rem)] py-[clamp(1rem,1.8vw,1.5rem)]"
            style={{
              borderLeft: "3px solid var(--primary)",
              background: "linear-gradient(90deg, color-mix(in srgb, var(--primary) 5%, var(--card)) 0%, var(--card) 60%)",
            }}
          >
            <p className="text-[clamp(0.85rem,0.8rem+0.25vw,1rem)] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Amazon · 4.5 years.</span>{" "}
              Built the analytical instinct that underpins everything I design today —
              improving investigation workflows, operational reporting, and cross-functional
              decision-making at one of the world&apos;s most data-intensive organizations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
