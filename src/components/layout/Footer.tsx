"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

type Status = "idle" | "loading" | "success" | "error";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Impact",     href: "#impact"     },
  { label: "Process",    href: "#process"    },
  { label: "Certs",      href: "#certifications" },
];

export function Footer() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="border-t border-border">

      {/* ── Main contact + nav block ── */}
      <div className="container-max section-padding">

        {/* Top row: section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-xs font-medium tracking-[0.14em] text-primary font-mono">06</span>
          <div className="w-8 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground font-mono">Contact</span>
        </motion.div>

        {/* 2-col: left = info, right = form */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 xl:gap-24">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Let&apos;s work<br />
              <span className="gradient-text">together.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm mb-10">
              Open to full-time roles, contract engagements, and analytics consulting across Europe &amp; India.
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-10">
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <Mail size={14} className="text-primary shrink-0" />
                {profile.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0" />
                {profile.location}
              </div>
              <a href={profile.calendlyUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Calendar size={14} className="text-primary shrink-0" />
                Schedule a 30-min call via Calendly
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <span className="text-border">·</span>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <GithubIcon size={16} /> GitHub
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            onSubmit={submit}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cf-name" className="text-xs font-semibold text-muted-foreground">Name</Label>
                <Input id="cf-name" placeholder="Your name" value={form.name} onChange={set("name")} required
                  className="h-11 border-border bg-card focus-visible:ring-primary/30 rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-email" className="text-xs font-semibold text-muted-foreground">Email</Label>
                <Input id="cf-email" type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} required
                  className="h-11 border-border bg-card focus-visible:ring-primary/30 rounded-lg" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cf-subject" className="text-xs font-semibold text-muted-foreground">Subject</Label>
              <Input id="cf-subject" placeholder="Role opportunity · Consulting enquiry · Other" value={form.subject} onChange={set("subject")} required
                className="h-11 border-border bg-card focus-visible:ring-primary/30 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cf-message" className="text-xs font-semibold text-muted-foreground">Message</Label>
              <Textarea id="cf-message" placeholder="Tell me about the role, project, or opportunity…" rows={5}
                value={form.message} onChange={set("message")} required
                className="border-border bg-card focus-visible:ring-primary/30 rounded-lg resize-none" />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
                <CheckCircle size={15} className="shrink-0" />
                Message sent — I&apos;ll reply within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-500/8 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                Something went wrong. Email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline ml-1">{profile.email}</a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:opacity-90 text-primary-foreground text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" ? "Sending…" : <><Send size={14} /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border">
        <div className="container-max px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap · Built with Next.js &amp; Tailwind CSS
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
            <a href="/deck" className="text-sm font-medium text-primary hover:opacity-80 transition-opacity">
              Portfolio Deck
            </a>
          </nav>
        </div>
      </div>

    </footer>
  );
}
