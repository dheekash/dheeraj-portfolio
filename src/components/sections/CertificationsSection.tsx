"use client";

import { motion } from "framer-motion";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";
import { onSpotlightMove } from "@/components/common/spotlight";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
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
  verifyUrl?: string;
}

function IssuerLogo({ issuer, size = 14 }: { issuer: Issuer; size?: number }) {
  if (issuer === "Microsoft")  return <MicrosoftLogo size={size} />;
  if (issuer === "Databricks") return <DatabricksLogo size={size} />;
  return <SnowflakeLogo size={size} />;
}

const ISSUER_COLOR: Record<Issuer, string> = {
  Microsoft:  "#2B9AE0",
  Snowflake:  "#29B5E8",
  Databricks: "#FF5A3C",
};

const certGroups: { category: string; color: string; certs: Cert[] }[] = [
  {
    category: "Power BI",
    color: "rgba(21,145,220,0.12)",
    certs: [
      { name: "Power BI Data Analyst",    code: "PL-300", issuer: "Microsoft", date: "Sep 2021", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
      { name: "Power Platform Fundamentals", code: "PL-900", issuer: "Microsoft", date: "Aug 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/" },
    ],
  },
  {
    category: "Microsoft Fabric",
    color: "rgba(124,58,237,0.1)",
    certs: [
      { name: "Fabric Analytics Engineer", code: "DP-600", issuer: "Microsoft", date: "Dec 2024", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/" },
      { name: "Fabric Data Engineer",      code: "DP-700", issuer: "Microsoft", date: "Jun 2025", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/" },
    ],
  },
  {
    category: "Azure",
    color: "rgba(8,145,178,0.1)",
    certs: [
      { name: "Azure Administrator",   code: "AZ-104", issuer: "Microsoft", date: "Dec 2021", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/" },
      { name: "Azure Fundamentals",    code: "AZ-900", issuer: "Microsoft", date: "Dec 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
      { name: "Azure AI Fundamentals", code: "AI-900", issuer: "Microsoft", date: "Sep 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/" },
    ],
  },
  {
    category: "Data & AI",
    color: "rgba(217,119,6,0.1)",
    certs: [
      { name: "Azure Data Scientist",             code: "DP-100", issuer: "Microsoft", date: "Feb 2023", featured: true, verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/" },
      { name: "Azure Data Fundamentals",          code: "DP-900", issuer: "Microsoft", date: "Feb 2022", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/" },
      { name: "Security, Compliance & Identity",  code: "SC-900", issuer: "Microsoft", date: "Feb 2022", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/" },
      { name: "Microsoft 365 Fundamentals",       code: "MS-900", issuer: "Microsoft", date: "Dec 2021", verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/" },
    ],
  },
  {
    category: "Platform Engineering",
    color: "rgba(5,150,105,0.1)",
    certs: [
      { name: "SnowPro Associate: Core", code: "SnowPro", issuer: "Snowflake",  date: "Jan 2026", verifyUrl: "https://learn.snowflake.com/en/certifications/" },
      { name: "Data Engineer Associate", code: "DE-A",    issuer: "Databricks", date: "May 2026", verifyUrl: "https://www.databricks.com/learn/certification/data-engineer-associate" },
    ],
  },
];

const allCerts: (Cert & { groupColor: string })[] = certGroups.flatMap((g) =>
  g.certs.map((c) => ({ ...c, groupColor: g.color }))
);

function CertCard({ cert, groupColor }: { cert: Cert; groupColor?: string }) {
  return (
    <div
      onPointerMove={onSpotlightMove}
      className="spotlight gradient-frame px-4 py-4 flex flex-col gap-3.5"
      style={{ borderTop: `2px solid ${ISSUER_COLOR[cert.issuer]}` }}
    >
      <div className="flex items-start justify-between">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: `color-mix(in srgb, ${ISSUER_COLOR[cert.issuer]} 16%, transparent)`, border: `1px solid color-mix(in srgb, ${ISSUER_COLOR[cert.issuer]} 30%, var(--border))` }}
        >
          <IssuerLogo issuer={cert.issuer} size={20} />
        </span>
        {cert.featured && (
          <span
            className="text-[9px] font-mono font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full cursor-default"
            style={{
              background: "color-mix(in srgb, var(--primary) 16%, transparent)",
              color: "var(--accent)",
            }}
            title="High-signal credential — core to the BI & Analytics Engineering role"
          >
            Core cert
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[13.5px] font-semibold leading-snug mb-2">{cert.name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {cert.verifyUrl ? (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11.5px] font-bold px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
              style={{
                background: "color-mix(in srgb, var(--accent) 16%, transparent)",
                color: "var(--accent)",
              }}
              title="Verify certification"
            >{cert.code} ↗</a>
          ) : (
            <span
              className="font-mono text-[11.5px] font-bold px-2 py-0.5 rounded"
              style={{
                background: "color-mix(in srgb, var(--accent) 16%, transparent)",
                color: "var(--accent)",
              }}
            >{cert.code}</span>
          )}
          <span className="font-mono text-[11px] text-muted-foreground">{cert.date}</span>
        </div>
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const totalCount = certGroups.reduce((s, g) => s + g.certs.length, 0);

  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <motion.div {...reveal()} className="flex items-end justify-between gap-6 flex-wrap mb-[clamp(1.75rem,3vw,3rem)]">
          <div>
            <h2 className="mb-3">Certifications</h2>
            <p className="text-muted-foreground text-sm max-w-[52ch]">
              {totalCount} certifications across 5 years, each earned while actively shipping the
              technology it covers.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>11 Microsoft</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>1 Snowflake</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 px-3 py-1.5 rounded-full" style={{ background: "color-mix(in srgb, var(--muted) 60%, transparent)", border: "1px solid var(--border)" }}>1 Databricks</span>
          </div>
        </motion.div>

        <motion.div {...reveal(0.08)}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allCerts.map((cert) => (
              <CertCard key={cert.code} cert={cert} groupColor={cert.groupColor} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
