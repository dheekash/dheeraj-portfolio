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
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

const issuerStyle: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Microsoft:  { bg: "bg-blue-500/12",  text: "text-blue-300",  border: "border-blue-500/25",  dot: "#3B82F6" },
  Databricks: { bg: "bg-red-500/12",   text: "text-red-300",   border: "border-red-500/25",   dot: "#FF3621" },
  Snowflake:  { bg: "bg-cyan-500/12",  text: "text-cyan-300",  border: "border-cyan-500/25",  dot: "#29B5E8" },
};

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
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)" }} />

      <div className="container-max">
        {/* Section label */}
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Certifications</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          13+ Professional <span className="gradient-text">Certifications</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          A continuous learning journey across Microsoft Fabric, Databricks, Snowflake, Azure, and Power BI.
        </motion.p>

        {/* Stats */}
        <motion.div {...fadeUp(0.12)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="glass-card glass-highlight relative p-5 rounded-2xl border border-blue-500/20 text-center overflow-hidden group card-depth">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
              <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cert grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((cert, i) => {
              const expired = cert.expiryDate ? isExpired(cert.expiryDate) : false;
              const style = issuerStyle[cert.issuer] || { bg: "bg-white/5", text: "text-muted-foreground", border: "border-white/10", dot: "#6B7280" };

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
                  className={`glass-card glass-highlight group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl card-depth ${
                    cert.featured
                      ? "border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/15"
                      : "border-white/[0.09] hover:border-white/[0.15]"
                  }`}
                >
                  {/* Latest badge */}
                  {cert.featured && (
                    <div className="absolute -top-2.5 right-4">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30">
                        Latest
                      </span>
                    </div>
                  )}

                  {/* Issuer + status */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border}`}>
                      {cert.issuer}
                    </span>
                    {expired ? (
                      <div title="Expired" className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle size={13} />
                      </div>
                    ) : (
                      <div title="Active" className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle size={13} />
                      </div>
                    )}
                  </div>

                  {/* Issuer logo */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border"
                    style={{ backgroundColor: `${style.dot}15`, borderColor: `${style.dot}30` }}>
                    <IssuerLogo issuer={cert.issuer} size={22} />
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
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
                        <span className="font-mono text-muted-foreground/50 truncate max-w-[90px]">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/4 border border-white/7 text-muted-foreground">{s}</span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/4 border border-white/7 text-muted-foreground">+{cert.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Verify link (hover) */}
                  {cert.verificationUrl && (
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: style.dot }}
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
