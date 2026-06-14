"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Download, Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { MagneticButton } from "@/components/common/MagneticButton";
import { profile } from "@/data/profile";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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
            <h2 className="mb-4">
              Let&apos;s build analytics systems <span className="accent-text">that scale.</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground max-w-[52ch] mb-[clamp(2rem,3.5vw,3rem)]">
              Whether you need a BI Engineer to architect your Fabric Lakehouse, a consulting
              partner for your next enterprise analytics build, or a freelance specialist for Power BI
              and Databricks delivery — I&apos;d love to hear about it.
            </p>

            {/* Three primary CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-[clamp(2rem,3vw,2.5rem)]">
              {/* [NEEDS REAL CONTENT] Replace with actual Calendly URL */}
              <MagneticButton
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 glow-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Calendar size={15} /> Book a 30-min call
                <ArrowUpRight size={14} />
              </MagneticButton>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium hover:border-primary/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Download size={14} /> Download my resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.8rem,1.2vw,1rem)] rounded-full panel text-sm font-medium hover:border-primary/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Mail size={14} /> Send me an email
              </a>
            </div>

            {/* Secondary contact links */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
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
              {/* [NEEDS REAL CONTENT] Replace +91XXXXXXXXXX with real WhatsApp number */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors text-emerald-600 dark:text-emerald-400"
              >
                <WhatsAppIcon size={15} /> WhatsApp <ArrowUpRight size={11} />
              </a>
            </div>
          </motion.div>

          {/* Right: availability card */}
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
                <p className="text-[13px] font-semibold">Available for new work</p>
              </div>

              <p className="eyebrow mb-3">Open to</p>
              <ul className="space-y-2 mb-5">
                {[
                  "BI & Analytics Engineering roles",
                  "Enterprise Fabric / Databricks consulting",
                  "Analytics platform architecture projects",
                  "Power BI and data product delivery",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4 space-y-1.5">
                <p className="text-[12px] text-muted-foreground font-mono">
                  📍 Based in India (IST, UTC+5:30)
                </p>
                <p className="text-[12px] text-muted-foreground font-mono">
                  ⚡ Usually replies within 24 hours
                </p>
              </div>
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
