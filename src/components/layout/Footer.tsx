"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

const availableFor = [
  "BI & Analytics Engineering roles",
  "Microsoft Fabric architecture projects",
  "Power BI consulting & semantic modeling",
  "Analytics platform builds (Snowflake / Databricks)",
  "Data strategy & advisory engagements",
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 85% at 50% 115%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 75%)",
        }}
      />

      <div className="container-page section-pad relative">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20">
          {/* Left: headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-4">Get in touch</p>
            <h2 className="mb-4">
              Let&apos;s build analytics systems{" "}
              <span className="accent-text">that scale.</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground max-w-[50ch] mb-[clamp(2rem,3vw,2.5rem)]">
              Open to BI & Analytics Engineering roles and enterprise Fabric / Databricks consulting.
              Based in Bengaluru (IST, UTC+5:30) — usually replies within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Mail size={14} /> Email me
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full panel text-sm font-medium hover:border-primary/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <LinkedinIcon size={14} /> LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* Right: Available For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:min-w-[280px]"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Available for
            </p>
            <ul className="flex flex-col gap-3">
              {availableFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: "color-mix(in srgb, var(--primary) 15%, var(--card))",
                    }}
                  >
                    <Check size={9} style={{ color: "var(--primary)" }} />
                  </span>
                  <span className="text-[13px] text-muted-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap · Bengaluru, India
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">
            From raw data to executive decisions
          </p>
        </div>
      </div>
    </footer>
  );
}
