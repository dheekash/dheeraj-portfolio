"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, MapPin, Download } from "lucide-react";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

const highlights = [
  {
    icon: Briefcase,
    label: "Current Role",
    value: "BI & Analytics Engineer",
    sub: "Amplify Analytix · 2025–Present",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Briefcase,
    label: "Previous Experience",
    value: "Ex-Amazon",
    sub: "Investigation Specialist & Analytics Lead · 4 yrs",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "MSc Data Science",
    sub: "Deakin University, Melbourne",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: GraduationCap,
    label: "Undergraduate",
    value: "BE Information Science",
    sub: "REVA University, Bengaluru",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Award,
    label: "Certifications",
    value: "13 Professional Certs",
    sub: "Microsoft · Databricks · Snowflake · Azure",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bengaluru, India",
    sub: "Open to remote & relocation",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export function ResumeSnapshotSection() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative container-max section-padding !py-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1"
            >
              Resume Snapshot
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-2xl font-extrabold text-foreground"
            >
              Quick Executive Summary
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <LinkButton
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-background hover:bg-muted text-foreground transition-all shadow-sm"
            >
              <Download size={14} />
              Download Full Resume
            </LinkButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" as const }}
              className={`group flex flex-col gap-2.5 p-4 rounded-2xl border ${h.border} ${h.bg} hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${h.bg} border ${h.border}`}>
                <h.icon size={15} className={h.color} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{h.label}</p>
                <p className={`text-sm font-bold leading-tight ${h.color}`}>{h.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{h.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
