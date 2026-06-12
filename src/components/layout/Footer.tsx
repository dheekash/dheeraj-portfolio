"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Calendar, MapPin } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border overflow-hidden">
      {/* Bottom glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(77,141,255,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="container-max section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">Contact</p>
          <h2 className="ink-gradient mb-6">
            Let&apos;s turn your data into decisions.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            I&apos;m open to senior BI &amp; analytics roles, contract engagements,
            and consulting. Tell me about the problem — I&apos;ll tell you how
            I&apos;d approach it.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Calendar size={16} /> Book a 30-min call
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={12} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <GithubIcon size={16} /> GitHub <ArrowUpRight size={12} />
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> {profile.location}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border">
        <div className="container-max px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            BI &amp; Analytics Engineer · Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
