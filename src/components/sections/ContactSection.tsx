"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Download, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { LinkButton } from "@/components/common/LinkButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/common/SectionHeader";
import { profile } from "@/data/profile";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build Something"
          titleHighlight="Data-Driven"
          description="Available for senior analytics engineering roles, consulting engagements, and advisory projects."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold text-foreground mb-4">Get in touch</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                  { icon: MapPin, label: "Location", value: "Bengaluru, India", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-card/30">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <item.icon size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-blue-300 transition-colors font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social CTAs */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href="https://linkedin.com/in/kashyap-dheeraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all group"
                >
                  <LinkedinIcon size={18} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-blue-300 transition-colors">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">linkedin.com/in/kashyap-dheeraj</p>
                  </div>
                </a>
                <a
                  href="https://github.com/dheekash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5 transition-all group"
                >
                  <GithubIcon size={18} className="text-foreground/70" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">GitHub</p>
                    <p className="text-xs text-muted-foreground">github.com/dheekash</p>
                  </div>
                </a>
                <a
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:border-amber-400/40 hover:bg-amber-500/10 transition-all group"
                >
                  <Calendar size={18} className="text-amber-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-amber-300 transition-colors">Schedule a Call</p>
                    <p className="text-xs text-muted-foreground">Book 30 min via Calendly</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Resume download */}
            <LinkButton
              href={profile.resumeUrl}
              download
              variant="outline"
              className="w-full border-white/15 bg-white/5 hover:bg-white/10 text-foreground gap-2"
            >
              <Download size={16} />
              Download Full Resume
            </LinkButton>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-card/50 border-white/10 focus:border-blue-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="bg-card/50 border-white/10 focus:border-blue-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-medium text-muted-foreground">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Role opportunity / Consulting enquiry / Other"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="bg-card/50 border-white/10 focus:border-blue-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-medium text-muted-foreground">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about the role, project, or opportunity..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="bg-card/50 border-white/10 focus:border-blue-500/50 resize-none"
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  <CheckCircle size={16} />
                  Message sent! I&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please email me directly at {profile.email}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 gap-2"
              >
                {status === "loading" ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Or email directly: <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">{profile.email}</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
