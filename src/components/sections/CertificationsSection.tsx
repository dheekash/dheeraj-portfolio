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

const featuredCerts = allCerts.filter((c) => c.featured);
const otherCerts = allCerts.filter((c) => !c.featured);

/* 3D flip card — front: logo + name; back: code, issuer, date, verify */
function CertCard({ cert }: { cert: Cert; groupColor?: string }) {
  const c = ISSUER_COLOR[cert.issuer];
  return (
    <div className="flip-card h-40" tabIndex={0}>
      <div className="flip-inner">
        {/* Front */}
        <div
          className="flip-face gradient-frame px-4 py-4 flex flex-col gap-3"
          style={{ borderLeft: `3px solid ${c}` }}
        >
          <div className="flex items-start justify-between">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
              style={{ background: `color-mix(in srgb, ${c} 16%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, var(--border))` }}
            >
              <IssuerLogo issuer={cert.issuer} size={20} />
            </span>
            {cert.featured && (
              <span
                className="text-[9px] font-mono font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full cursor-default"
                style={{ background: "rgba(0, 229, 255, 0.12)", color: "var(--cyan)" }}
                title="High-signal credential — core to the BI & Analytics Engineering role"
              >
                Core cert
              </span>
            )}
          </div>
          <p className="text-[13.5px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>{cert.name}</p>
        </div>

        {/* Back */}
        <div
          className="flip-back flip-face gradient-frame px-4 py-4 flex flex-col justify-between"
          style={{ borderLeft: `3px solid ${c}` }}
        >
          <div>
            <p className="font-mono text-[16px] font-bold mb-1" style={{ color: c }}>{cert.code}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{cert.issuer}</p>
            <p className="font-mono text-[11px] text-muted-foreground mt-1">{cert.date}</p>
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start font-mono text-[11.5px] font-bold px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity"
              style={{ background: "rgba(0, 229, 255, 0.14)", color: "var(--cyan)" }}
              title="Verify certification"
            >
              Verify ↗
            </a>
          )}
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
            <p className="eyebrow mb-3">Credentials</p>
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

        {/* Featured certs as cards */}
        <motion.div {...reveal(0.08)}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredCerts.map((cert) => (
              <CertCard key={cert.code} cert={cert} groupColor={cert.groupColor} />
            ))}
          </div>
        </motion.div>

        {/* The rest as a compact strip */}
        <motion.div {...reveal(0.12)} className="mt-5">
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground/60 mb-3">
            Also certified
          </p>
          <div className="flex flex-wrap gap-2">
            {otherCerts.map((cert) => {
              const content = (
                <>
                  <span className="flex-shrink-0"><IssuerLogo issuer={cert.issuer} size={14} /></span>
                  <span className="font-mono font-semibold" style={{ color: ISSUER_COLOR[cert.issuer] }}>{cert.code}</span>
                  <span className="text-muted-foreground">{cert.name}</span>
                </>
              );
              const cls = "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] transition-colors";
              const style = { background: "color-mix(in srgb, var(--foreground) 4%, transparent)", border: "1px solid var(--border)" };
              return cert.verifyUrl ? (
                <a key={cert.code} href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[color:var(--accent)]`} style={style}>
                  {content}
                </a>
              ) : (
                <span key={cert.code} className={cls} style={style}>{content}</span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
