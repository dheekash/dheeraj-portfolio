"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart, BarChart2, Shield, Users, Cog, Cloud,
} from "lucide-react";

const domains = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Analytics",
    color: "#FF694B",
    metric: "£2M+",
    metricLabel: "Revenue Attributed",
    bullets: [
      "Customer journey & funnel analysis",
      "Product performance & basket analytics",
      "Promo ROI and markdown optimisation",
      "Real-time order & inventory dashboards",
    ],
    tools: ["Power BI", "SQL", "Azure", "Python"],
  },
  {
    icon: BarChart2,
    title: "Sales Intelligence",
    color: "#3B82F6",
    metric: "30%",
    metricLabel: "Pipeline Accuracy ↑",
    bullets: [
      "Sales pipeline velocity & stage analysis",
      "Territory & quota attainment reporting",
      "CRM data quality & enrichment",
      "Forecast accuracy models",
    ],
    tools: ["Power BI", "DAX", "Salesforce", "SQL"],
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    color: "#F59E0B",
    metric: "98%",
    metricLabel: "Alert Accuracy",
    bullets: [
      "Transaction anomaly detection",
      "Rule-based fraud scoring models",
      "Real-time KQL alert pipelines",
      "Investigation workflow dashboards",
    ],
    tools: ["KQL", "Python", "Azure Monitor", "Power BI"],
  },
  {
    icon: Users,
    title: "Customer Intelligence",
    color: "#8B5CF6",
    metric: "360°",
    metricLabel: "Customer View",
    bullets: [
      "RFM segmentation & cohort analysis",
      "Churn prediction & retention models",
      "Lifetime value & loyalty scoring",
      "Personalisation data pipelines",
    ],
    tools: ["Python", "SQL", "Databricks", "Power BI"],
  },
  {
    icon: Cog,
    title: "Operational Reporting",
    color: "#10B981",
    metric: "15hrs",
    metricLabel: "Weekly Time Saved",
    bullets: [
      "Automated P&L and financial reports",
      "Supply chain & logistics KPIs",
      "SLA & ops health monitoring",
      "Self-service report libraries",
    ],
    tools: ["Power BI", "ADF", "dbt", "SharePoint"],
  },
  {
    icon: Cloud,
    title: "Cloud Analytics",
    color: "#29B5E8",
    metric: "Fabric",
    metricLabel: "End-to-End on Azure",
    bullets: [
      "Microsoft Fabric & OneLake architectures",
      "Snowflake & Databricks lakehouses",
      "Delta Lake Medallion patterns",
      "Cost optimisation & governance",
    ],
    tools: ["MS Fabric", "Snowflake", "Databricks", "ADLS"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function DomainExpertiseSection() {
  return (
    <section id="domains" className="relative section-padding overflow-hidden">
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)" }}
      />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500 font-mono">Industry Domains</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Domain <span className="gradient-text">Expertise</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          Deep, repeatable patterns across six high-value analytics domains — not just dashboards, but business outcomes.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" as const }}
                className="glass-card glass-highlight relative rounded-2xl p-6 border card-depth group cursor-default
                  transition-all duration-300 hover:-translate-y-1.5"
                style={{ borderColor: `${domain.color}25` }}
                whileHover={{ boxShadow: `0 16px 48px ${domain.color}18` }}
              >
                {/* Metric badge */}
                <div
                  className="absolute top-5 right-5 text-right"
                >
                  <div className="text-2xl font-black" style={{ color: domain.color }}>{domain.metric}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{domain.metricLabel}</div>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: `${domain.color}15`, borderColor: `${domain.color}30` }}
                >
                  <Icon size={22} style={{ color: domain.color }} />
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-foreground text-base mb-3 leading-tight pr-16 group-hover:text-blue-200 dark:group-hover:text-blue-200 transition-colors">
                  {domain.title}
                </h3>

                {/* Bullets */}
                <ul className="space-y-2 mb-4">
                  {domain.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12px] text-muted-foreground leading-snug">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: domain.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tool pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: `${domain.color}20` }}>
                  {domain.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                      style={{
                        color: domain.color,
                        backgroundColor: `${domain.color}10`,
                        borderColor: `${domain.color}28`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
