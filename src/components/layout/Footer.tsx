"use client";

import { Mail, Download, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* ── Pre-footer CTA banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="relative container-max section-padding !py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Ready to collaborate?</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Ready to Transform Data
              <br />
              <span className="text-blue-200">Into Decisions?</span>
            </h2>
            <p className="text-blue-100/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Looking for a <strong className="text-white">Business Analyst</strong>, <strong className="text-white">BI Developer</strong>, or <strong className="text-white">Analytics Consultant</strong>? Let&apos;s build something impactful together.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-2xl shadow-black/20 hover:bg-blue-50 hover:scale-[1.02] transition-all"
              >
                <Calendar size={16} />
                Book a Call
              </a>
              <LinkButton
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white font-bold text-sm hover:bg-white/20 hover:scale-[1.02] transition-all backdrop-blur-sm"
              >
                <Download size={16} />
                Download Resume
              </LinkButton>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white font-bold text-sm hover:bg-white/20 hover:scale-[1.02] transition-all backdrop-blur-sm"
              >
                <Mail size={16} />
                Email Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="border-t border-border bg-card">
        <div className="container-max px-5 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">DK</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a href="https://linkedin.com/in/kashyap-dheeraj" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-all" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href="https://github.com/dheekash" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all" aria-label="GitHub">
                <GithubIcon size={16} />
              </a>
              <a href={`mailto:${profile.email}`}
                className="p-2 rounded-lg text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-all" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              © {currentYear} {profile.name} · Built with Next.js &amp; Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
