"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Download, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

type Status = "idle" | "loading" | "success" | "error";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
    } catch { setStatus("error"); }
  };

  const connects = [
    {
      href: "https://linkedin.com/in/kashyap-dheeraj",
      icon: <LinkedinIcon size={18} className="text-blue-400" />,
      label: "LinkedIn",
      sub: "linkedin.com/in/kashyap-dheeraj",
      style: "border-blue-500/20 bg-blue-500/5 hover:border-blue-400/40 hover:bg-blue-500/10",
    },
    {
      href: "https://github.com/dheekash",
      icon: <GithubIcon size={18} className="text-foreground/60" />,
      label: "GitHub",
      sub: "github.com/dheekash",
      style: "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6",
    },
    {
      href: profile.calendlyUrl,
      icon: <Calendar size={18} className="text-amber-400" />,
      label: "Schedule a Call",
      sub: "30 min via Calendly",
      style: "border-amber-500/20 bg-amber-500/5 hover:border-amber-400/40 hover:bg-amber-500/10",
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.2), transparent 70%)" }} />

      <div className="container-max">
        <motion.div {...fadeUp()} className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 font-mono">Contact</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Hiring a <span className="gradient-text-amber">BI or Analytics Professional?</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          Looking for a <strong className="text-foreground font-semibold">Business Analyst</strong>,{" "}
          <strong className="text-foreground font-semibold">BI Analyst</strong>,{" "}
          <strong className="text-foreground font-semibold">Analytics Engineer</strong>, or{" "}
          <strong className="text-foreground font-semibold">Data Consultant</strong>?{" "}
          Let&apos;s discuss how data can drive measurable business outcomes for your organisation.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Left */}
          <motion.div {...fadeUp(0.1)} className="space-y-5">
            {/* Contact info */}
            {[
              { icon: <Mail size={15} className="text-blue-400" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: <MapPin size={15} className="text-blue-400" />, label: "Location", value: "Bengaluru, India", href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3.5 p-4 rounded-xl border border-white/8 bg-card/30">
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-sm font-semibold text-foreground hover:text-blue-300 transition-colors">{item.value}</a>
                    : <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  }
                </div>
              </div>
            ))}

            {/* Connect */}
            <div className="space-y-2.5 pt-2">
              {connects.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all group ${c.style}`}>
                  <div className="shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-blue-200 transition-colors">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume */}
            <LinkButton
              href={profile.resumeUrl}
              download
              className="flex justify-center items-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border border-white/12 bg-white/5 hover:bg-white/10 text-foreground/80 transition-all"
            >
              <Download size={15} /> Download Full Resume
            </LinkButton>
          </motion.div>

          {/* Right — Form */}
          <motion.form {...fadeUp(0.15)} onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">Name</Label>
                <Input id="name" placeholder="Your name" value={form.name} onChange={set("name")} required
                  className="bg-card/40 border-white/10 focus:border-blue-500/50 rounded-xl h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} required
                  className="bg-card/40 border-white/10 focus:border-blue-500/50 rounded-xl h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-xs font-semibold text-muted-foreground">Subject</Label>
              <Input id="subject" placeholder="Role opportunity · Consulting enquiry · Other" value={form.subject} onChange={set("subject")} required
                className="bg-card/40 border-white/10 focus:border-blue-500/50 rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-semibold text-muted-foreground">Message</Label>
              <Textarea id="message" placeholder="Tell me about the role, project, or opportunity…" rows={5}
                value={form.message} onChange={set("message")} required
                className="bg-card/40 border-white/10 focus:border-blue-500/50 rounded-xl resize-none" />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle size={16} /> Message sent — I&apos;ll reply within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={16} /> Something went wrong. Email me directly at{" "}
                <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-500/30 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" ? "Sending…" : <><Send size={15} /> Send Message</>}
            </button>
            <p className="text-xs text-muted-foreground/60 text-center">
              Or email directly:{" "}
              <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">{profile.email}</a>
            </p>

            {/* Social quick-links under the form */}
            <div className="pt-2 border-t border-border/50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 text-center mb-3">Connect</p>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-blue-500/25 bg-blue-500/6 hover:bg-blue-500/12 text-blue-500 hover:text-blue-400 text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 bg-white/4 hover:bg-white/8 text-foreground/70 hover:text-foreground text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 bg-white/4 hover:bg-white/8 text-foreground/70 hover:text-foreground text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  <Mail size={14} />
                  Email
                </a>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-amber-500/25 bg-amber-500/6 hover:bg-amber-500/12 text-amber-600 dark:text-amber-400 hover:text-amber-500 text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  <Download size={14} />
                  Resume
                </a>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
