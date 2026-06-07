"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

const reasons = [
  {
    title: "7+ Years Enterprise Experience",
    body: "Delivered analytics solutions across Amazon, consulting, and product companies — not just side projects.",
    color: "#3B82F6",
  },
  {
    title: "End-to-End BI Ownership",
    body: "From raw data ingestion to executive dashboard — I own the full stack, not just one layer.",
    color: "#F59E0B",
  },
  {
    title: "Microsoft Fabric & Databricks Certified",
    body: "13+ active certifications including DP-600, DP-700, PL-300, AZ-104, and Databricks DE Associate.",
    color: "#8B5CF6",
  },
  {
    title: "Amazon Analytics Background",
    body: "Built forecasting models and Power BI dashboards adopted by senior leadership across 8 regional markets.",
    color: "#10B981",
  },
  {
    title: "Stakeholder-First Mindset",
    body: "I translate complex data architectures into clear executive narratives — from analyst to boardroom.",
    color: "#06B6D4",
  },
  {
    title: "Global Scale Delivery",
    body: "Supported 15+ countries, 200+ end users, and 20+ senior stakeholders across enterprise organisations.",
    color: "#EF4444",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

export function WhyMeSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.15), transparent 70%)" }} />
      </div>

      <div className="container-max">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-start">

          {/* Left — headline + CTA */}
          <div className="lg:sticky lg:top-24">
            <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500 font-mono">Why Hire Me</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.05)} className="font-extrabold tracking-tight mb-5 leading-tight">
              Why Work<br />
              <span className="gradient-text">With Me?</span>
            </motion.h2>

            <motion.p {...fadeUp(0.1)} className="text-muted-foreground leading-relaxed mb-8 text-base">
              I don&apos;t just build dashboards — I architect data systems that make organisations smarter, faster, and more profitable.
            </motion.p>

            {/* Mini stat row */}
            <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-3 mb-8">
              {[
                { value: "7+", label: "Years" },
                { value: "15+", label: "Countries" },
                { value: "13+", label: "Certs" },
                { value: "200+", label: "Users Served" },
              ].map((s) => (
                <div key={s.label} className="p-3.5 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <LinkButton
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
              >
                View Full Resume
                <ArrowRight size={14} />
              </LinkButton>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          {/* Right — reasons grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" as const }}
                className="group relative p-5 rounded-2xl border border-border bg-card/60 hover:bg-card hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                style={{
                  ["--accent" as string]: r.color,
                }}
              >
                {/* Accent line top */}
                <div className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${r.color}60, transparent)` }} />

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: r.color }}
                  />
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1.5 leading-snug group-hover:text-[var(--accent)] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
