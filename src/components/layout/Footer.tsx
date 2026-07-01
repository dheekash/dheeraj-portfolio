"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, ArrowUp } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

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
          <p className="leading-relaxed text-muted-foreground max-w-[50ch] mb-2">
            Open to full-time BI & Analytics Engineering roles and enterprise Fabric / Databricks consulting.
            Remote or Bengaluru-based.
          </p>
          <p className="leading-relaxed text-muted-foreground max-w-[50ch] mb-[clamp(2rem,3vw,2.5rem)]">
            Based in Bengaluru (IST, UTC+5:30). <span className="text-foreground font-medium">Usually replies within 24 hours.</span>
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-[clamp(2rem,3vw,2.5rem)]">
            {/* Primary CTA */}
            <a
              href={`mailto:${profile.email}?subject=BI%20%26%20Analytics%20Engineer%20%E2%80%94%20Let%27s%20connect`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Mail size={14} /> Email me
            </a>
            {/* Secondary CTAs */}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              style={{ border: "1px solid var(--border)" }}
            >
              <LinkedinIcon size={14} /> LinkedIn <ArrowUpRight size={12} />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              style={{ border: "1px solid var(--border)" }}
            >
              Resume <ArrowUpRight size={12} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              style={{ border: "1px solid var(--border)" }}
            >
              <GithubIcon size={14} /> GitHub <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Availability status */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[13px] font-medium text-foreground/70 tracking-[0.01em]">
              Currently available · Bengaluru, India · IST (UTC+5:30)
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-border">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/80">
            © {new Date().getFullYear()} Dheeraj Kashyap · Bengaluru, India
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground/80">
            From raw data to executive decisions
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-[12px] font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <ArrowUp size={12} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
