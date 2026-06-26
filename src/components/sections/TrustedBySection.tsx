"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const clients = [
  {
    name: "Amazon",
    period: "2020 â€“ 2024",
    tag: "Global E-commerce",
    summary:
      "Forecasting, fraud-investigation analytics, and operational reporting across 10+ global seller marketplaces.",
    isCurrent: false,
  },
  {
    name: "Amplify Analytix",
    period: "2025 â€“ Present",
    tag: "Analytics Consulting",
    summary:
      "Enterprise Lakehouse architecture, Power BI semantic models, and data platform engineering for clients across 15 countries.",
    isCurrent: true,
  },
  {
    name: "Hubhopper",
    period: "Client",
    tag: "Media & Podcasting",
    summary:
      "Analytics platform build and BI delivery for South Asia's leading podcast network and creator ecosystem.",
    isCurrent: false,
  },
];

export function TrustedBySection() {
  return (
    <section aria-label="Organisations I have worked with">
      <div className="container-page py-[clamp(2.5rem,3.5vw,4rem)]">
        <motion.p {...reveal()} className="eyebrow mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          Trusted by enterprise analytics teams
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              {...reveal(0.07 + i * 0.07)}
              className="panel rounded-2xl px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(1rem,1.6vw,1.5rem)]"
              style={c.isCurrent ? {
                borderColor: "color-mix(in srgb, var(--primary) 35%, var(--border))",
              } : undefined}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[clamp(1rem,0.9rem+0.4vw,1.2rem)] font-bold tracking-tight">
                    {c.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-[10px] text-muted-foreground">{c.period}</span>
                    {c.isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 8%, var(--card))",
                    color: "var(--primary)",
                    border: "1px solid color-mix(in srgb, var(--primary) 18%, transparent)",
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{c.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

