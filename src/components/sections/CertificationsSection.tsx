"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { MicrosoftLogo, DatabricksLogo, SnowflakeLogo } from "@/components/common/TechLogos";

const certs = [
  { issuer: "Databricks", name: "Databricks Certified Data Engineer Associate" },
  { issuer: "Microsoft", name: "Fabric Analytics Engineer Associate", code: "DP-600" },
  { issuer: "Microsoft", name: "Power BI Data Analyst Associate", code: "PL-300" },
  { issuer: "Microsoft", name: "Fabric Data Engineer Associate", code: "DP-700" },
  { issuer: "Snowflake", name: "SnowPro Core Associate" },
  { issuer: "Microsoft", name: "Azure Data Scientist Associate", code: "DP-100" },
  { issuer: "Microsoft", name: "Azure Administrator Associate", code: "AZ-104" },
];

function IssuerLogo({ issuer }: { issuer: string }) {
  if (issuer === "Microsoft") return <MicrosoftLogo size={18} />;
  if (issuer === "Databricks") return <DatabricksLogo size={18} />;
  if (issuer === "Snowflake") return <SnowflakeLogo size={18} />;
  return null;
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CertificationsSection() {
  return (
    <section id="certifications">
      <div className="container-page section-pad">
        <motion.p {...reveal()} className="eyebrow mb-4">
          Credentials
        </motion.p>
        <motion.h2 {...reveal(0.05)} className="ink-fade max-w-[20ch] mb-[clamp(2.5rem,4vw,4rem)]">
          Certified across the modern data stack.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(0.75rem,1.25vw,1.25rem)]">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              {...reveal(0.04 * i)}
              className="glass card-lift rounded-2xl p-[clamp(1.25rem,1.8vw,1.75rem)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <IssuerLogo issuer={c.issuer} /> {c.issuer}
                </span>
                <BadgeCheck size={15} className="text-primary" />
              </div>
              <h3 className="text-[0.95rem] font-semibold leading-snug">{c.name}</h3>
              {c.code && (
                <p className="mt-auto pt-3 font-mono text-[11px] text-primary/80">{c.code}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
