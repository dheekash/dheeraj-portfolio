"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Briefcase, Award, Globe } from "lucide-react";
import { profile } from "@/data/profile";

const ABOUT_TEXT =
  "I started in customer support. The data told a different story than the reports, so I switched to analytics. Seven years later, I build Lakehouse platforms, semantic models, and pipelines for enterprise clients across 15 countries. My focus is simple: does the dashboard answer the question it was built to answer?";

const SKILLS = [
  "Power BI", "SQL", "Python", "Microsoft Fabric",
  "Azure", "Data Modeling", "DAX", "ETL", "Snowflake", "dbt",
];

const SNAPSHOT = [
  { icon: Briefcase, label: "Current Role",   value: "BI & Analytics Engineer", sub: "Amplify Analytix" },
  { icon: Award,     label: "Certifications", value: "13 Microsoft + Platform",  sub: "PL-300 Â· DP-600 Â· AZ-104 Â· DP-700" },
  { icon: Globe,     label: "Global Reach",   value: "15 Countries",             sub: "Enterprise clients Â· 100% retention" },
  { icon: MapPin,    label: "Location",        value: "Bengaluru, India",         sub: "Open to remote & hybrid roles" },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function AboutSection() {

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="container-page section-pad">
        <div className="grid lg:grid-cols-2 gap-x-[clamp(3rem,6vw,7rem)] gap-y-12 items-start">

          {/* â”€â”€ Left: heading + bio + skills â”€â”€ */}
          <div>
            <motion.h2 {...reveal()} className="mb-6">
              About me
            </motion.h2>

            <p className="text-[clamp(1rem,1.1vw,1.1rem)] leading-relaxed text-muted-foreground mb-8 max-w-[52ch] text-pretty">
              {ABOUT_TEXT}
            </p>

            {/* Skill pills */}
            <motion.div {...reveal(0.1)} className="flex flex-wrap gap-2 mb-8">
              {SKILLS.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-[12px] font-medium panel">
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div {...reveal(0.18)}>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Get in touch <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* â”€â”€ Right: professional snapshot â”€â”€ */}
          <motion.div {...reveal(0.08)} className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Professional Snapshot</p>

            {/* Stat row: years + certs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="panel rounded-2xl p-5">
                <p
                  className="font-mono font-bold leading-none tabular-nums mb-1"
                  style={{ fontSize: "clamp(2.4rem,3.5vw,3.2rem)", color: "var(--primary)" }}
                >
                  7+
                </p>
                <p className="text-[13px] font-semibold text-foreground">Years Experience</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Analytics & BI engineering</p>
              </div>
              <div className="panel rounded-2xl p-5">
                <p
                  className="font-mono font-bold leading-none tabular-nums mb-1"
                  style={{ fontSize: "clamp(2.4rem,3.5vw,3.2rem)", color: "var(--primary)" }}
                >
                  13
                </p>
                <p className="text-[13px] font-semibold text-foreground">Certifications</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Microsoft Â· Snowflake Â· Databricks</p>
              </div>
            </div>

            {/* Snapshot rows */}
            {SNAPSHOT.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  {...reveal(0.12 + i * 0.06)}
                  className="panel rounded-xl px-4 py-3.5 flex items-center gap-4"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
                  >
                    <Icon size={16} style={{ color: "var(--primary)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-[0.1em] mb-0.5">{item.label}</p>
                    <p className="text-[13px] font-semibold text-foreground leading-snug">{item.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

