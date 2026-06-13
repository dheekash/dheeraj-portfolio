"use client";

import { motion } from "framer-motion";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";

const tracks = [
  {
    track: "Cloud & Platform Foundations",
    arc: "2021",
    certs: [
      { name: "Power Platform Fundamentals",   code: "PL-900",  issuer: "Microsoft", date: "Aug 2021" },
      { name: "Azure AI Fundamentals",         code: "AI-900",  issuer: "Microsoft", date: "Sep 2021" },
      { name: "Azure Fundamentals",            code: "AZ-900",  issuer: "Microsoft", date: "Dec 2021" },
      { name: "Microsoft 365 Fundamentals",    code: "MS-900",  issuer: "Microsoft", date: "Dec 2021" },
      { name: "Azure Administrator",           code: "AZ-104",  issuer: "Microsoft", date: "Dec 2021" },
    ],
  },
  {
    track: "Analytics & BI",
    arc: "2021–2024",
    certs: [
      { name: "Power BI Data Analyst",         code: "PL-300",  issuer: "Microsoft", date: "Sep 2021" },
      { name: "Fabric Analytics Engineer",     code: "DP-600",  issuer: "Microsoft", date: "Dec 2024" },
    ],
  },
  {
    track: "Data & AI",
    arc: "2022–2023",
    certs: [
      { name: "Azure Data Fundamentals",       code: "DP-900",  issuer: "Microsoft", date: "Feb 2022" },
      { name: "Security, Compliance & Identity",code: "SC-900", issuer: "Microsoft", date: "Feb 2022" },
      { name: "Azure Data Scientist",          code: "DP-100",  issuer: "Microsoft", date: "Feb 2023" },
    ],
  },
  {
    track: "Platform Engineering",
    arc: "2025–2026",
    certs: [
      { name: "Fabric Data Engineer",          code: "DP-700",  issuer: "Microsoft", date: "Jun 2025" },
      { name: "SnowPro Associate: Platform",   code: "Core",    issuer: "Snowflake", date: "Jan 2026" },
      { name: "Data Engineer Associate",       code: "DE-A",    issuer: "Databricks",date: "May 2026" },
    ],
  },
];

const featured = [
  { name: "Power BI Data Analyst",     code: "PL-300", issuer: "Microsoft"  as const, date: "Sep 2021" },
  { name: "Fabric Analytics Engineer", code: "DP-600", issuer: "Microsoft"  as const, date: "Dec 2024" },
  { name: "Fabric Data Engineer",      code: "DP-700", issuer: "Microsoft"  as const, date: "Jun 2025" },
  { name: "Azure Data Scientist",      code: "DP-100", issuer: "Microsoft"  as const, date: "Feb 2023" },
  { name: "SnowPro Associate",         code: "Core",   issuer: "Snowflake"  as const, date: "Jan 2026" },
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
        <motion.p {...reveal()} className="eyebrow mb-4">Credentials</motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[14ch] mb-[clamp(1.5rem,2.5vw,2rem)]">
          Certifications
        </motion.h2>
        <motion.p {...reveal(0.1)} className="text-muted-foreground max-w-[52ch] mb-[clamp(2.5rem,4vw,4.5rem)]">
          13 certifications across five years — each earned while actively shipping the technology
          it covers, not just studying for an exam.
        </motion.p>

        {/* Featured credentials */}
        <motion.div {...reveal(0.12)} className="mb-[clamp(2.5rem,4vw,5rem)]">
          <p className="eyebrow mb-5">Key credentials</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {featured.map((c) => (
              <div key={`${c.code}-${c.name}`} className="panel panel-lift rounded-2xl px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <IssuerLogo issuer={c.issuer} />
                  <span className="font-mono text-[10px] accent-text font-semibold">{c.code}</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-tight mb-1">{c.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{c.issuer}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full track list */}
        <div className="max-w-6xl">
          <p className="eyebrow mb-5">All certifications</p>
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
                <h3 className="text-[15px] font-semibold">{t.track}</h3>
              </div>

              <div className="relative flex flex-wrap items-stretch gap-y-4">
                <span aria-hidden className="absolute left-0 right-0 top-1/2 h-px bg-border hidden md:block" />
                <div className="relative flex flex-wrap gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-4 w-full">
                  {t.certs.map((c, ci) => (
                    <div
                      key={`${c.name}-${ci}`}
                      className="relative panel rounded-xl px-4 py-3 flex items-center gap-3"
                    >
                      <IssuerLogo issuer={c.issuer} />
                      <div>
                        <p className="text-[13px] font-medium leading-tight">{c.name}</p>
                        <p className="font-mono text-[10px] accent-text mt-0.5">{c.code}</p>
                        <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{c.issuer} · {c.date}</p>
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
