"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Download } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { MagneticButton } from "@/components/common/MagneticButton";
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
        <div className="grid lg:grid-cols-12 gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 items-start">
          {/* Left: headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-[clamp(1.25rem,2vw,2rem)]">Let&apos;s work together</p>
            <h2 className="ink-fade mb-[clamp(1.5rem,2.5vw,2.25rem)]">
              Let&apos;s build better decisions <span className="accent-text">with data.</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground max-w-[52ch] mb-[clamp(2rem,3.5vw,3rem)]">
              Whether you&apos;re modernizing a Lakehouse, building executive reporting,
              implementing Microsoft Fabric, or scaling enterprise analytics — I design
              systems that drive measurable outcomes.
            </p>
            <p className="text-[13px] text-muted-foreground/70 font-mono mb-[clamp(1.5rem,2.5vw,2rem)] -mt-[clamp(1rem,1.5vw,1.5rem)]">
              Typically responds within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.25rem)] mb-[clamp(2rem,3vw,2.5rem)]">
              <MagneticButton
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Calendar size={15} /> Schedule a Conversation
              </MagneticButton>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-foreground transition-colors"
              >
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

          {/* Right: availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="panel rounded-2xl px-[clamp(1.5rem,2.5vw,2rem)] py-[clamp(1.25rem,2vw,1.75rem)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[13px] font-semibold">Available for new opportunities</p>
              </div>
              <p className="eyebrow mb-3">Open to</p>
              <ul className="space-y-2">
                {[
                  "Full-time BI & Analytics roles",
                  "Contract opportunities",
                  "Consulting engagements",
                  "Freelance analytics projects",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
