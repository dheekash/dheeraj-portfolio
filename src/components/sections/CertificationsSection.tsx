"use client";

import { motion } from "framer-motion";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";

/**
 * A learning journey, not a card wall: 13 real credentials set as ruled
 * ladder rows by specialization, strung in the order they were earned.
 */
const tracks = [
  {
    track: "Cloud & Platform Foundations",
    arc: "2021",
    certs: [
      { name: "Power Platform Fundamentals", code: "Aug 2021", issuer: "Microsoft" },
      { name: "Azure AI Fundamentals", code: "Sep 2021", issuer: "Microsoft" },
      { name: "Azure Fundamentals", code: "Dec 2021", issuer: "Microsoft" },
      { name: "Microsoft 365 Fundamentals", code: "Dec 2021", issuer: "Microsoft" },
      { name: "Azure Administrator · AZ-104", code: "Dec 2021", issuer: "Microsoft" },
    ],
  },
  {
    track: "Analytics & BI",
    arc: "2021–2024",
    certs: [
      { name: "Power BI Data Analyst · PL-300", code: "Sep 2021", issuer: "Microsoft" },
      { name: "Fabric Analytics Engineer · DP-600", code: "Dec 2024", issuer: "Microsoft" },
    ],
  },
  {
    track: "Data & AI",
    arc: "2022–2023",
    certs: [
      { name: "Azure Data Fundamentals", code: "Feb 2022", issuer: "Microsoft" },
      { name: "Security, Compliance & Identity", code: "Feb 2022", issuer: "Microsoft" },
      { name: "Azure Data Scientist · DP-100", code: "Feb 2023", issuer: "Microsoft" },
    ],
  },
  {
    track: "Platform Engineering",
    arc: "2025–2026",
    certs: [
      { name: "Fabric Data Engineer · DP-700", code: "Jun 2025", issuer: "Microsoft" },
      { name: "SnowPro Associate: Platform", code: "Jan 2026", issuer: "Snowflake" },
      { name: "Databricks Data Engineer Associate", code: "May 2026", issuer: "Databricks" },
    ],
  },
];

function IssuerLogo({ issuer }: { issuer: string }) {
  if (issuer === "Microsoft") return <MicrosoftLogo size={14} />;
  if (issuer === "Databricks") return <DatabricksLogo size={14} />;
  if (issuer === "Snowflake") return <SnowflakeLogo size={14} />;
  return null;
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CertificationsSection() {
  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Learning journey</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[20ch] mb-[clamp(1.5rem,2.5vw,2rem)]">
          Credentialed where the work happens.
        </motion.h2>
        <motion.p {...reveal(0.1)} className="text-muted-foreground max-w-[52ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          Thirteen certifications, five years — cloud foundations first, then
          analytics, then platform depth. Each one earned while shipping the
          technology it covers.
        </motion.p>

        <div className="max-w-6xl">
          {tracks.map((t, ti) => (
            <motion.div
              key={t.track}
              {...reveal(0.05 + ti * 0.06)}
              className="grid md:grid-cols-[minmax(9rem,14rem)_1fr] gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-3 border-t border-border py-[clamp(1.5rem,2.2vw,2.25rem)]"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] accent-text mb-1">
                  {String(ti + 1).padStart(2, "0")} · {t.arc}
                </p>
                <h3 className="text-lg font-semibold">{t.track}</h3>
              </div>

              {/* Credentials strung on a line */}
              <div className="relative flex flex-wrap items-stretch gap-y-4">
                <span aria-hidden className="absolute left-0 right-0 top-1/2 h-px bg-border hidden md:block" />
                <div className="relative flex flex-wrap gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-4 w-full">
                  {t.certs.map((c) => (
                    <div key={c.code} className="relative panel rounded-xl px-4 py-3 flex items-center gap-3">
                      <IssuerLogo issuer={c.issuer} />
                      <div>
                        <p className="text-[13px] font-medium leading-tight">{c.name}</p>
                        <p className="font-mono text-[10px] accent-text mt-0.5">{c.code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
