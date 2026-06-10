"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";
import { certifications } from "@/data/certifications";
import { isExpired } from "@/lib/utils";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  };
}

function IssuerLogo({ issuer, size = 22 }: { issuer: string; size?: number }) {
  if (issuer === "Microsoft")  return <MicrosoftLogo size={size} />;
  if (issuer === "Databricks") return <DatabricksLogo size={size} />;
  if (issuer === "Snowflake")  return <SnowflakeLogo size={size} />;
  return null;
}

const stats = [
  { value: "13+", label: "Certifications" },
  { value: "3",   label: "Issuers" },
  { value: "4",   label: "Cert Tracks" },
  { value: "12",  label: "Active" },
];

const FEATURED_COUNT = 4;

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);

  const featured = certifications.filter((c) => c.featured).slice(0, FEATURED_COUNT);
  const rest = certifications.filter((c) => !featured.includes(c));
  const filtered = showAll ? certifications : featured;

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div data-parallax="-35" className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)" }} />

      <div className="container-max">
        {/* Section label */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">05</span>
          <div className="w-8 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Certifications</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-bold mb-4">
          13+ Professional <span className="gradient-text">Certifications</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          A continuous learning journey across Microsoft Fabric, Databricks, Snowflake, Azure, and Power BI.
        </motion.p>

        {/* Stats — plain editorial row */}
        <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-x-12 gap-y-4 mb-12 pb-8 border-b border-border">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold font-mono text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cert grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((cert, i) => {
              const expired = cert.expiryDate ? isExpired(cert.expiryDate) : false;

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
                  className={`group relative p-5 rounded-xl border bg-card card-depth transition-colors duration-200 ${
                    cert.featured ? "border-primary/30" : "border-border"
                  }`}
                >
                  {/* Issuer + status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <IssuerLogo issuer={cert.issuer} size={18} />
                      <span className="text-xs font-medium text-muted-foreground">{cert.issuer}</span>
                    </div>
                    {expired ? (
                      <div title="Expired" className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={13} />
                      </div>
                    ) : (
                      <div title="Active" className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={13} />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-3 line-clamp-2">
                    {cert.name}
                  </h3>

                  {/* Dates */}
                  <div className="text-xs text-muted-foreground space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>Issued</span>
                      <span className="text-foreground/60 font-medium">{cert.issuedDate}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex justify-between">
                        <span>Expires</span>
                        <span className={expired ? "text-red-400 font-medium" : "text-foreground/60 font-medium"}>
                          {cert.expiryDate}
                        </span>
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="flex justify-between">
                        <span>ID</span>
                        <span className="font-mono text-muted-foreground/80 truncate max-w-[90px]">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed">
                    {cert.skills.slice(0, 3).join("  ·  ")}
                    {cert.skills.length > 3 && `  +${cert.skills.length - 3}`}
                  </p>

                  {/* Verify link (hover) */}
                  {cert.verificationUrl && (
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={10} /> Verify Credential
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {/* Show more / less */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground transition-all hover:scale-[1.02] cursor-pointer shadow-sm"
            >
              {showAll ? (
                <>Show Less</>
              ) : (
                <>+ {rest.length} More Certifications</>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
