"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* [NEEDS REAL CONTENT] Replace all quotes, names, roles, and companies with
   verified testimonials from real clients, colleagues, or managers. */
const testimonials = [
  {
    quote:
      "Dheeraj transformed how we think about data. What used to take our analysts half a day to compile is now available in real time. The quality and reliability of the pipelines he built is exceptional.",
    name: "Sarah M.",
    role: "Head of Analytics",
    company: "Enterprise Retail Client",
    initials: "SM",
  },
  {
    quote:
      "He didn't just build dashboards. He understood our business first and then built exactly what we needed to make decisions faster. Our churn is down and our CS team actually uses the reports he delivered.",
    name: "Arjun P.",
    role: "VP Customer Success",
    company: "SaaS Company",
    initials: "AP",
  },
  {
    quote:
      "Migrating our legacy warehouse to Microsoft Fabric felt impossible before Dheeraj joined. He ran the whole migration without a single day of downtime and the new platform has been rock solid ever since.",
    name: "Thomas K.",
    role: "Director of Data Engineering",
    company: "Global Manufacturing Client",
    initials: "TK",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[18ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          What clients say
        </motion.h2>

        {/* [NEEDS REAL CONTENT] placeholder notice â€” remove once real quotes are in */}
        <motion.div
          {...reveal(0.06)}
          className="mb-8 px-4 py-3 rounded-xl border border-amber-400/40 bg-amber-50/50 dark:bg-amber-900/10"
        >
          <p className="text-[12px] font-mono text-amber-700 dark:text-amber-400">
            [NEEDS REAL CONTENT]: Replace placeholder quotes below with real testimonials before publishing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...reveal(0.08 + i * 0.08)}
              className="panel panel-lift rounded-2xl p-[clamp(1.25rem,2vw,1.75rem)] flex flex-col gap-5"
            >
              {/* Quote marks */}
              <span aria-hidden className="text-4xl leading-none accent-text select-none" style={{ fontVariant: "normal" }}>&ldquo;</span>

              <blockquote className="text-[14px] leading-relaxed text-muted-foreground flex-1 -mt-3">
                {t.quote}
              </blockquote>

              <footer className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-primary-foreground flex-shrink-0"
                  style={{ background: "var(--primary)" }}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-tight">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

