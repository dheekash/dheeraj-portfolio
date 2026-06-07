"use client";

import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Award, ArrowRight } from "lucide-react";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { LinkButton } from "@/components/common/LinkButton";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";

const topics = [
  "Microsoft Fabric",
  "Databricks",
  "Lakehouse Architecture",
  "Snowflake",
  "Data Engineering",
  "Analytics Engineering",
  "Power BI",
  "Modern Data Stack",
  "DAX Optimization",
  "Medallion Architecture",
  "dbt Best Practices",
  "Delta Lake",
];

const insights = [
  {
    icon: Award,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Certification Journey",
    description: "Documenting the path from AZ-900 foundations through DP-700 Fabric Data Engineer — sharing tips, study guides, and lessons learned.",
  },
  {
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Industry Insights",
    description: "Perspectives on the modern data stack evolution: why Microsoft Fabric changes the lakehouse conversation and where the industry is heading.",
  },
  {
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    title: "Technical Deep Dives",
    description: "Architecture decisions, DAX patterns, Databricks performance optimization, and dbt design choices from real enterprise deployments.",
  },
];

export function ThoughtLeadershipSection() {
  return (
    <section id="insights" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Thought Leadership"
          title="Insights &"
          titleHighlight="Learning"
          description="Sharing knowledge from the trenches of enterprise analytics engineering, data platform delivery, and the modern data stack."
        />

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
              <LinkedinIcon size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Follow on LinkedIn</h3>
              <p className="text-sm text-muted-foreground">Certification achievements, industry insights, and technical learning — shared regularly.</p>
            </div>
          </div>
          <LinkButton
            href="https://linkedin.com/in/kashyap-dheeraj"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="shrink-0 border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
          >
            <LinkedinIcon size={14} className="mr-2" />
            linkedin.com/in/kashyap-dheeraj
          </LinkButton>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${item.bg} group hover:scale-[1.01] transition-all`}
            >
              <item.icon size={22} className={`${item.color} mb-3`} />
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Topic cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Topics Covered</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground hover:border-blue-500/30 hover:text-blue-300 hover:bg-blue-500/10 transition-all cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Blog CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-2xl border border-dashed border-white/20 bg-white/2"
        >
          <BookOpen size={32} className="text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Articles & Blog — Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            In-depth technical articles on Lakehouse architecture, Power BI optimization, and modern data stack patterns will be published here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
