"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
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

interface Cert {
  name: string;
  code: string;
  issuer: Issuer;
  date: string;
  featured?: boolean;
}

function IssuerLogo({ issuer }: { issuer: Issuer }) {
  if (issuer === "Microsoft")  return <MicrosoftLogo size={14} />;
  if (issuer === "Databricks") return <DatabricksLogo size={14} />;
  return <SnowflakeLogo size={14} />;
}

const certGroups: { category: string; color: string; certs: Cert[] }[] = [
  {
    category: "Power BI",
    color: "rgba(21,145,220,0.12)",
    certs: [
      { name: "Power BI Data Analyst",    code: "PL-300", issuer: "Microsoft", date: "Sep 2021", featured: true },
      { name: "Power Platform Fundamentals", code: "PL-900", issuer: "Microsoft", date: "Aug 2021" },
    ],
  },
  {
    category: "Microsoft Fabric",
    color: "rgba(124,58,237,0.1)",
    certs: [
      { name: "Fabric Analytics Engineer", code: "DP-600", issuer: "Microsoft", date: "Dec 2024", featured: true },
      { name: "Fabric Data Engineer",      code: "DP-700", issuer: "Microsoft", date: "Jun 2025" },
    ],
  },
  {
    category: "Azure",
    color: "rgba(8,145,178,0.1)",
    certs: [
      { name: "Azure Administrator",   code: "AZ-104", issuer: "Microsoft", date: "Dec 2021", featured: true },
      { name: "Azure Fundamentals",    code: "AZ-900", issuer: "Microsoft", date: "Dec 2021" },
      { name: "Azure AI Fundamentals", code: "AI-900", issuer: "Microsoft", date: "Sep 2021" },
    ],
  },
  {
    category: "Data & AI",
    color: "rgba(217,119,6,0.1)",
    certs: [
      { name: "Azure Data Scientist",             code: "DP-100", issuer: "Microsoft", date: "Feb 2023", featured: true },
      { name: "Azure Data Fundamentals",          code: "DP-900", issuer: "Microsoft", date: "Feb 2022" },
      { name: "Security, Compliance & Identity",  code: "SC-900", issuer: "Microsoft", date: "Feb 2022" },
      { name: "Microsoft 365 Fundamentals",       code: "MS-900", issuer: "Microsoft", date: "Dec 2021" },
    ],
  },
  {
    category: "Platform Engineering",
    color: "rgba(5,150,105,0.1)",
    certs: [
      { name: "SnowPro Associate: Core", code: "SnowPro", issuer: "Snowflake",  date: "Jan 2026" },
      { name: "Data Engineer Associate", code: "DE-A",    issuer: "Databricks", date: "May 2026" },
    ],
  },
];

const FEATURED_CODES = ["PL-300", "DP-600", "DP-700", "DE-A"];

const featuredCerts: (Cert & { groupColor: string })[] = certGroups.flatMap((g) =>
  g.certs
    .filter((c) => FEATURED_CODES.includes(c.code))
    .map((c) => ({ ...c, groupColor: g.color }))
);

function CertCard({ cert, groupColor }: { cert: Cert; groupColor?: string }) {
  return (
    <div
      className="panel rounded-xl px-4 py-3.5 flex flex-col gap-2.5"
      style={groupColor ? { borderTop: `2px solid ${groupColor.replace("0.1", "0.4").replace("0.12", "0.4")}` } : undefined}
    >
      <div className="flex items-center justify-between">
        <IssuerLogo issuer={cert.issuer} />
        {cert.featured && (
          <span
            className="text-[9px] font-mono font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
            style={{
              background: "color-mix(in srgb, var(--primary) 12%, var(--card))",
              color: "var(--primary)",
            }}
          >
            Featured
          </span>
        )}
      </div>
      <div>
        <p className="text-[12.5px] font-semibold leading-snug mb-0.5">{cert.name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] accent-text font-semibold">{cert.code}</span>
          <span className="text-muted-foreground/40 text-[10px]">·</span>
          <span className="font-mono text-[10px] text-muted-foreground">{cert.issuer}</span>
          <span className="text-muted-foreground/40 text-[10px]">·</span>
          <span className="font-mono text-[10px] text-muted-foreground">{cert.date}</span>
        </div>
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);
  const totalCount = certGroups.reduce((s, g) => s + g.certs.length, 0);

  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <motion.h2 {...reveal()} className="max-w-[14ch] mb-3">
          Certifications
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground max-w-[52ch] text-sm mb-[clamp(1.75rem,3vw,3rem)]">
          {totalCount} certifications across 5 years, each earned while actively shipping the
          technology it covers. 11 Microsoft, 1 Snowflake, 1 Databricks.
        </motion.p>

        {/* Featured 4 certs — always visible */}
        <motion.div {...reveal(0.08)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {featuredCerts.map((cert) => (
              <CertCard key={cert.code} cert={cert} groupColor={cert.groupColor} />
            ))}
          </div>
        </motion.div>

        {/* Expanded: full grouped view */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="all-certs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-[clamp(1.25rem,2vw,2rem)] pt-2 pb-4">
                {certGroups.map((group) => {
                  const nonFeatured = group.certs.filter((c) => !FEATURED_CODES.includes(c.code));
                  if (nonFeatured.length === 0) return null;
                  return (
                    <div key={group.category}>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-semibold font-mono uppercase tracking-[0.1em]"
                          style={{ background: group.color, color: "var(--foreground)" }}
                        >
                          {group.category}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {nonFeatured.length} additional
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {nonFeatured.map((cert) => (
                          <CertCard key={cert.code} cert={cert} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / collapse toggle */}
        <motion.div {...reveal(0.15)} className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {showAll ? (
              <>
                Show less <ChevronUp size={14} />
              </>
            ) : (
              <>
                View all {totalCount} certifications <ChevronDown size={14} />
              </>
            )}
          </button>

          <a
            href="https://learn.microsoft.com/en-us/users/dheerajkashyap/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={13} />
            Verify on Microsoft Learn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
