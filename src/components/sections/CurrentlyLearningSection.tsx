"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";

const items = [
  {
    title: "Microsoft Fabric",
    desc: "Advanced Lakehouse patterns, Real-Time Intelligence, and Fabric Workspaces",
    tag: "Deep Dive",
    color: "#0067C0",
    progress: 85,
  },
  {
    title: "Databricks",
    desc: "Unity Catalog, Delta Live Tables, and ML orchestration with MLflow",
    tag: "Certification Prep",
    color: "#FF3621",
    progress: 70,
  },
  {
    title: "AI Agents & LLMs",
    desc: "Building analytics copilots and natural language query interfaces for BI tools",
    tag: "Exploring",
    color: "#8B5CF6",
    progress: 45,
  },
  {
    title: "dbt Advanced",
    desc: "Semantic layer, dbt Mesh, and advanced incremental strategies",
    tag: "Active",
    color: "#FF694B",
    progress: 75,
  },
  {
    title: "Customer Segmentation",
    desc: "RFM modelling, clustering algorithms, and behavioural analytics at scale",
    tag: "Project",
    color: "#10B981",
    progress: 60,
  },
  {
    title: "Modern Data Warehousing",
    desc: "Cost optimisation, query performance tuning, and warehouse governance",
    tag: "Ongoing",
    color: "#F59E0B",
    progress: 80,
  },
];

export function CurrentlyLearningSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)" }} />

      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500 font-mono">Growth Mindset</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              Currently <span className="gradient-text">Exploring</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2 max-w-lg"
            >
              Technology moves fast. Here&apos;s what I&apos;m actively learning and building with right now.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold shrink-0"
          >
            <BookOpen size={13} />
            Updated June 2025
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" as const }}
              className="group relative p-5 rounded-2xl border border-border bg-card/50 hover:border-blue-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Accent dot */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: item.color }}
              />

              {/* Tag */}
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-3 border"
                style={{
                  color: item.color,
                  backgroundColor: `${item.color}12`,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.tag}
              </span>

              <h3 className="font-bold text-foreground mb-1.5 text-base group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] text-muted-foreground font-medium">Progress</span>
                  <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.progress}%</span>
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom cta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center gap-3 p-4 rounded-2xl border border-dashed border-violet-500/20 bg-violet-500/5"
        >
          <Sparkles size={16} className="text-violet-500 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Always open to conversations about{" "}
            <span className="font-semibold text-foreground">AI-powered analytics</span>,{" "}
            <span className="font-semibold text-foreground">modern data stack</span>, and{" "}
            <span className="font-semibold text-foreground">enterprise BI transformations</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
