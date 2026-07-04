"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

const quickLinks = [
  { href: "#about",        label: "About"      },
  { href: "#skills",       label: "Skills"     },
  { href: "#case-studies", label: "Projects"   },
  { href: "#journey",      label: "Experience" },
  { href: "#contact",      label: "Contact"    },
];

const socials = [
  { href: profile.linkedinUrl, label: "Connect on LinkedIn", Icon: LinkedinIcon },
  { href: profile.githubUrl,   label: "See my work on GitHub", Icon: GithubIcon },
];

export function Footer() {
  const [email, setEmail] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("BI & Analytics Engineer — Let's connect");
    const body = email ? encodeURIComponent(`Hi Dheeraj,\n\n(Reply to: ${email})\n\n`) : "";
    window.location.href = `mailto:${profile.email}?subject=${subject}${body ? `&body=${body}` : ""}`;
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border bg-background text-foreground">
      {/* Single warm peach note in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 88% 115%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container-page section-pad relative"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ── Connect / contact CTA ── */}
          <div className="lg:col-span-1">
            <p className="eyebrow mb-4">Get in touch</p>
            <h2
              className="mb-5"
              style={{ fontSize: "clamp(1.9rem,1.3rem+1.6vw,2.6rem)", lineHeight: 1.12 }}
            >
              Let&apos;s build analytics systems{" "}
              <span className="text-gradient">that scale.</span>
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground max-w-[36ch]">
              Open to full-time BI &amp; Analytics Engineering roles and enterprise Fabric / Databricks consulting. Remote or Bengaluru-based.
            </p>

            <form className="relative max-w-sm" onSubmit={onSubmit}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Your email"
                className="h-12 rounded-full border-border bg-card pl-5 pr-14 text-[15px] placeholder:text-[color:var(--smoke)] focus-visible:ring-foreground/20"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Email me"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Email me</span>
              </Button>
            </form>
          </div>

          {/* ── Explore ── */}
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <nav className="space-y-2.5 text-[15px]">
              {quickLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <address className="space-y-2.5 text-[15px] not-italic text-muted-foreground">
              <p>Bengaluru, India</p>
              <p>IST (UTC+5:30)</p>
              <a
                href={`mailto:${profile.email}`}
                className="block break-all transition-colors hover:text-foreground"
              >
                {profile.email}
              </a>
              <p className="pt-1 text-foreground">Usually replies within 24 hours.</p>
            </address>
          </div>

          {/* ── Follow ── */}
          <div>
            <p className="eyebrow mb-4">Follow</p>
            <div className="mb-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Tooltip key={href}>
                  <TooltipTrigger
                    render={
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                      />
                    }
                  >
                    <Icon size={17} />
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              ))}
            </div>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] text-foreground transition-opacity hover:opacity-70"
            >
              Download resume <ArrowUpRight size={14} />
            </a>

            <div className="mt-6 flex items-center gap-2.5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--sienna)" }} />
              <span className="text-[14px] text-muted-foreground">Currently available</span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row md:text-left">
          <p className="text-[14px] text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap · Bengaluru, India
          </p>
          <p className="text-[13px] uppercase tracking-[0.12em]" style={{ color: "var(--ash)" }}>
            From raw data to executive decisions
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUp size={13} /> Back to top
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
