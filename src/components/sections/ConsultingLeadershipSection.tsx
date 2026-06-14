"use client";

import { motion } from "framer-motion";
import { Search, Pencil, Hammer, TrendingUp } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const steps = [
  {
    icon: Search,
    label: "Discover",
    desc: "Workshops to align stakeholders and surface the real problem before any engineering begins.",
  },
  {
    icon: Pencil,
    label: "Design",
    desc: "Architecture, KPI frameworks, and governance standards tailored to your org and budget.",
  },
  {
    icon: Hammer,
    label: "Build",
    desc: "Full-stack delivery — pipelines, semantic models, and executive-facing analytics products.",
  },
  {
    icon: TrendingUp,
    label: "Optimize",
    desc: "Performance tuning, adoption support, and self-serve documentation to sustain value.",
  },
];

export function ConsultingLeadershipSection() {
  return (
    <section id="process">
      <div className="container-page py-[clamp(2.5rem,4vw,5rem)]">
        <motion.h2 {...reveal()} className="max-w-[20ch] mb-[clamp(1.5rem,2.5vw,2.5rem)]">
          How I work with clients
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                {...reveal(0.06 + i * 0.07)}
                className="panel rounded-2xl px-5 py-5 flex flex-col gap-3 relative"
              >
                {/* Step connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden lg:block absolute top-[2.1rem] right-0 w-4 h-px translate-x-full"
                    style={{ background: "color-mix(in srgb, var(--primary) 30%, transparent)" }}
                  />
                )}
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "color-mix(in srgb, var(--primary) 10%, var(--card))" }}
                  >
                    <Icon size={15} className="accent-text" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold mb-1">{step.label}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
