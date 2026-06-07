"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { certifications, certificationCategories } from "@/data/certifications";
import { isExpired } from "@/lib/utils";
import type { CertCategory } from "@/types";

const issuerColors: Record<string, { bg: string; text: string; border: string }> = {
  Microsoft: { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/20" },
  Databricks: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/20" },
  Snowflake: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/20" },
};

const categoryStats = [
  { label: "Total Certifications", value: "13+" },
  { label: "Issuing Bodies", value: "3" },
  { label: "Cert Tracks", value: "4" },
  { label: "Active Credentials", value: "12" },
];

export function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = activeFilter === "All"
    ? certifications
    : certifications.filter((c) => c.category === activeFilter);

  const getStatus = (cert: typeof certifications[0]) => {
    if (cert.expiryDate && isExpired(cert.expiryDate)) return "expired";
    return cert.status;
  };

  return (
    <section id="certifications" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Certifications"
          title="13+ Professional"
          titleHighlight="Certifications"
          description="A continuous learning journey across Microsoft Fabric, Databricks, Snowflake, Azure, and Power BI."
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {categoryStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-center"
            >
              <div className="text-2xl font-bold text-blue-400">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {certificationCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60">
                  ({certifications.filter((c) => c.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cert, i) => {
            const status = getStatus(cert);
            const colors = issuerColors[cert.issuer] || { bg: "bg-white/5", text: "text-muted-foreground", border: "border-white/10" };

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className={`group relative p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
                  cert.featured
                    ? "border-blue-500/40 bg-blue-500/5 hover:border-blue-400/60"
                    : "border-white/10 bg-card/50 hover:border-white/20"
                }`}
              >
                {cert.featured && (
                  <div className="absolute -top-2 -right-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30">
                      Latest
                    </span>
                  </div>
                )}

                {/* Issuer badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {cert.issuer}
                  </span>
                  {status === "active" ? (
                    <CheckCircle size={14} className="text-emerald-400" />
                  ) : status === "expired" ? (
                    <AlertCircle size={14} className="text-red-400" />
                  ) : (
                    <Clock size={14} className="text-amber-400" />
                  )}
                </div>

                <div className="mb-2">
                  <Award size={22} className={`mb-2 ${colors.text}`} />
                  <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-blue-300 transition-colors">
                    {cert.name}
                  </h3>
                </div>

                {/* Dates */}
                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Issued</span>
                    <span className="text-foreground/70">{cert.issuedDate}</span>
                  </div>
                  {cert.expiryDate && (
                    <div className="flex justify-between">
                      <span>Expires</span>
                      <span className={status === "expired" ? "text-red-400" : "text-foreground/70"}>
                        {cert.expiryDate}
                      </span>
                    </div>
                  )}
                  {cert.credentialId && (
                    <div className="flex justify-between">
                      <span>ID</span>
                      <span className="font-mono text-xs text-foreground/50 truncate max-w-[100px]">
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-muted-foreground">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Verify link */}
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink size={10} />
                    Verify Credential
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
