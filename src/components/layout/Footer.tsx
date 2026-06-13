"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Download } from "lucide-react";
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

      <div className="container-page section-pad relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="eyebrow mb-[clamp(1.25rem,2vw,2rem)]">Final word</p>
          <h2 className="ink-fade mb-[clamp(1.5rem,2.5vw,2.25rem)]">
            Let&apos;s turn data into <span className="accent-text">decisions.</span>
          </h2>
          <p className="leading-relaxed text-muted-foreground max-w-[52ch] mx-auto mb-[clamp(2rem,3.5vw,3rem)]">
            Whether you&apos;re modernizing a Lakehouse, building executive
            reporting, implementing Microsoft Fabric, or scaling enterprise
            analytics — let&apos;s create systems that drive measurable business
            outcomes.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] mb-[clamp(2.5rem,4vw,4rem)]">
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Calendar size={15} /> Schedule a Conversation
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
              {profile.email}
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <LinkedinIcon size={15} /> LinkedIn <ArrowUpRight size={11} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <GithubIcon size={15} /> GitHub <ArrowUpRight size={11} />
            </a>
          </div>
        </motion.div>
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
