"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

type Issuer = "Microsoft" | "Snowflake" | "Databricks";
type Cert = { name: string; code: string; issuer: Issuer; date: string };

function IssuerLogo({ issuer }: { issuer: Issuer }) {
  if (issuer === "Microsoft") return <MicrosoftLogo size={14} />;
  if (issuer === "Databricks") return <DatabricksLogo size={14} />;
  return <SnowflakeLogo size={14} />;
}

const featured: Cert[] = [
  { name: "Fabric Analytics Engineer", code: "DP-600", issuer: "Microsoft", date: "Dec 2024" },
  { name: "Power BI Data Analyst",     code: "PL-300", issuer: "Microsoft", date: "Sep 2021" },
  { name: "Azure Administrator",       code: "AZ-104", issuer: "Microsoft", date: "Dec 2021" },
  { name: "Azure Data Scientist",      code: "DP-100", issuer: "Microsoft", date: "Feb 2023" },
];

const additional: Cert[] = [
  { name: "Fabric Data Engineer",            code: "DP-700",  issuer: "Microsoft",  date: "Jun 2025" },
  { name: "Data Engineer Associate",         code: "DE-A",    issuer: "Databricks", date: "May 2026" },
  { name: "SnowPro Associate: Platform",     code: "Core",    issuer: "Snowflake",  date: "Jan 2026" },
  { name: "Azure Data Fundamentals",         code: "DP-900",  issuer: "Microsoft",  date: "Feb 2022" },
  { name: "Security, Compliance & Identity", code: "SC-900",  issuer: "Microsoft",  date: "Feb 2022" },
  { name: "Power Platform Fundamentals",     code: "PL-900",  issuer: "Microsoft",  date: "Aug 2021" },
  { name: "Azure AI Fundamentals",           code: "AI-900",  issuer: "Microsoft",  date: "Sep 2021" },
  { name: "Azure Fundamentals",              code: "AZ-900",  issuer: "Microsoft",  date: "Dec 2021" },
  { name: "Microsoft 365 Fundamentals",      code: "MS-900",  issuer: "Microsoft",  date: "Dec 2021" },
];

export function CertificationsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">Credentials</motion.p>
        <motion.h2 {...reveal(0.05)} className="max-w-[14ch] mb-3">
          Certifications
        </motion.h2>
        <motion.p {...reveal(0.08)} className="text-muted-foreground max-w-[52ch] text-sm mb-[clamp(2rem,3.5vw,3.5rem)]">
          13 certifications across five years — each earned while actively shipping the technology it covers.
        </motion.p>

        {/* 4 featured */}
        <motion.div {...reveal(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {featured.map((c) => (
            <div key={c.code} className="panel panel-lift rounded-2xl px-5 py-4 flex flex-col gap-3">
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
        </motion.div>

        {/* Accordion: +9 additional */}
        <motion.div {...reveal(0.14)} className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-[clamp(1.25rem,2vw,1.75rem)] py-4 text-left hover:bg-[color:color-mix(in_srgb,var(--primary)_3%,var(--card))] transition-colors"
            aria-expanded={open}
          >
            <span className="text-[13px] font-medium text-muted-foreground">
              +{additional.length} additional certifications
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={16} className="text-muted-foreground" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="certs-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="border-t border-border grid sm:grid-cols-2 lg:grid-cols-3 gap-3 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(1rem,1.5vw,1.5rem)]">
                  {additional.map((c) => (
                    <div key={c.code} className="panel rounded-xl px-4 py-3 flex items-center gap-3">
                      <IssuerLogo issuer={c.issuer} />
                      <div>
                        <p className="text-[12px] font-medium leading-tight">{c.name}</p>
                        <p className="font-mono text-[10px] accent-text mt-0.5">{c.code}</p>
                        <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{c.issuer} · {c.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
