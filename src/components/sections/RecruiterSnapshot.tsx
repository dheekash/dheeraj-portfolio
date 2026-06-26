"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Calendar, MapPin, Activity, Code2 } from "lucide-react";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const stack = ["Power BI", "Microsoft Fabric", "Snowflake", "Azure", "Databricks", "Python", "dbt", "SQL"];

const cards = [
  {
    icon: Briefcase,
    label: "Current Role",
    value: "BI & Analytics Engineer",
    sub: "@ Amplify Analytix",
    accent: false,
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "7+ Years",
    sub: "In data & analytics since 2019",
    accent: false,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bengaluru, India",
    sub: "IST Â· UTC+5:30",
    accent: false,
  },
  {
    icon: Award,
    label: "Certifications",
    value: "13 Credentials",
    sub: "11 Microsoft Â· 1 Snowflake Â· 1 Databricks",
    accent: false,
  },
  {
    icon: Activity,
    label: "Availability",
    value: "Open to Roles",
    sub: "Full-time & consulting",
    accent: true,
  },
];

export function RecruiterSnapshot() {
  return (
    <section id="snapshot" className="border-b border-border">
      <div className="container-page py-[clamp(2.5rem,4vw,4rem)]">
        <motion.div
          {...reveal()}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                {...reveal(i * 0.06)}
                className="panel panel-lift rounded-2xl px-5 py-4 flex items-start gap-4"
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: "color-mix(in srgb, var(--primary) 12%, var(--card))" }}
                >
                  <Icon
                    size={16}
                    style={{ color: card.accent ? "var(--primary)" : "var(--primary)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-0.5">
                    {card.label}
                  </p>
                  <p
                    className="text-[15px] font-semibold leading-tight"
                    style={card.accent ? { color: "var(--primary)" } : undefined}
                  >
                    {card.value}
                    {card.accent && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-2 animate-pulse align-middle"
                      />
                    )}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{card.sub}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Stack card â€” spans 1 or 2 cols on lg */}
          <motion.div
            {...reveal(cards.length * 0.06)}
            className="panel panel-lift rounded-2xl px-5 py-4 flex items-start gap-4 sm:col-span-2 lg:col-span-1"
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
              style={{ background: "color-mix(in srgb, var(--primary) 12%, var(--card))" }}
            >
              <Code2 size={16} style={{ color: "var(--primary)" }} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-border"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

