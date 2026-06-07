"use client";

import { motion } from "framer-motion";
import {
  BarChart3, Database, Layers, Zap, RefreshCw, TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { consultingServices } from "@/data/consulting";

const iconMap: Record<string, React.ElementType> = {
  "bar-chart-3": BarChart3,
  layers: Layers,
  database: Database,
  zap: Zap,
  "refresh-cw": RefreshCw,
  "trending-up": TrendingUp,
};

const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
  amber: { border: "border-amber-500/25", bg: "bg-amber-500/5", text: "text-amber-400", iconBg: "bg-amber-500/10" },
  violet: { border: "border-violet-500/25", bg: "bg-violet-500/5", text: "text-violet-400", iconBg: "bg-violet-500/10" },
  blue: { border: "border-blue-500/25", bg: "bg-blue-500/5", text: "text-blue-400", iconBg: "bg-blue-500/10" },
  red: { border: "border-red-500/25", bg: "bg-red-500/5", text: "text-red-400", iconBg: "bg-red-500/10" },
  emerald: { border: "border-emerald-500/25", bg: "bg-emerald-500/5", text: "text-emerald-400", iconBg: "bg-emerald-500/10" },
  orange: { border: "border-orange-500/25", bg: "bg-orange-500/5", text: "text-orange-400", iconBg: "bg-orange-500/10" },
};

export function ConsultingSection() {
  return (
    <section id="consulting" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Services"
          title="Enterprise Analytics"
          titleHighlight="Services"
          description="Specialized consulting services for organizations building modern data platforms, BI solutions, and analytics capabilities."
        />

        {/* Positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 max-w-3xl mx-auto text-center"
        >
          <p className="text-muted-foreground leading-relaxed">
            I partner with organizations to design and deliver modern data infrastructure — from Lakehouse architecture
            through executive reporting. Each engagement is outcome-driven, anchored to measurable business impact.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            {["Architecture Design", "End-to-End Delivery", "Team Enablement", "Outcome-Focused"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultingServices.map((service, i) => {
            const Icon = iconMap[service.icon] || BarChart3;
            const colors = colorMap[service.color] || colorMap.blue;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group p-6 rounded-2xl border ${colors.border} ${colors.bg} hover:scale-[1.01] transition-all`}
              >
                <div className={`inline-flex p-3 rounded-xl ${colors.iconBg} border ${colors.border} mb-4`}>
                  <Icon size={20} className={colors.text} />
                </div>

                <h3 className={`font-bold text-foreground mb-2 group-hover:${colors.text} transition-colors`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-1.5">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex gap-2 text-xs text-muted-foreground">
                      <span className={`${colors.text} mt-0.5 shrink-0`}>→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 gap-2"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Discuss Your Project
            <ArrowRight size={16} />
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Engagements available for full-time roles, consulting projects, and advisory work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
