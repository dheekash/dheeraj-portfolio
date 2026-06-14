"use client";

import { motion } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const competencies = [
  {
    num: "01",
    title: "Client Workshops",
    desc: "Structured discovery sessions that align stakeholders and surface the real data problem before any engineering begins.",
  },
  {
    num: "02",
    title: "KPI Strategy",
    desc: "Defining metric frameworks that connect data outputs to business outcomes executives actually make decisions on.",
  },
  {
    num: "03",
    title: "Executive Reporting",
    desc: "Power BI products designed for C-suite consumption — clarity, governance, and real-time accuracy that survives audit.",
  },
  {
    num: "04",
    title: "Stakeholder Management",
    desc: "Managing delivery across business units, IT teams, and regional leads in high-complexity enterprise environments.",
  },
  {
    num: "05",
    title: "Solution Design",
    desc: "Architecting end-to-end data platform designs that balance technical excellence with business constraints and budget.",
  },
  {
    num: "06",
    title: "Data Governance",
    desc: "Implementing lineage, row-level security, access controls, and quality frameworks that meet compliance and audit standards.",
  },
  {
    num: "07",
    title: "Team Leadership",
    desc: "Mentoring analysts and coordinating cross-functional delivery teams on multi-month enterprise data platform projects.",
  },
];

export function ConsultingLeadershipSection() {
  return (
    <section id="process">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[20ch] mb-4">
          How I work with clients
        </motion.h2>
        <motion.p {...reveal(0.06)} className="text-muted-foreground max-w-[56ch] text-sm leading-relaxed mb-[clamp(2.5rem,4vw,4.5rem)]">
          Engineering is the last mile. The work that makes it land is discovery, alignment, and
          governance — and that is where enterprise data projects win or lose.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-0 max-w-5xl">
          {competencies.map((c, i) => (
            <motion.div
              key={c.num}
              {...reveal(0.04 + i * 0.06)}
              className={`flex items-start gap-5 py-[clamp(1.25rem,2vw,1.75rem)] pr-6 ${
                i > 0 ? "border-t border-border" : ""
              } ${
                i % 2 === 1 ? "md:border-l md:pl-6 md:pr-0" : "md:pr-8"
              } ${
                i > 1 ? "md:border-t md:border-border" : i === 1 ? "md:border-t-0" : ""
              }`}
            >
              <span className="font-mono text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] font-bold tabular-nums leading-none accent-text flex-shrink-0 pt-0.5">
                {c.num}
              </span>
              <div>
                <h3 className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] font-semibold leading-tight mb-1.5">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[40ch]">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
