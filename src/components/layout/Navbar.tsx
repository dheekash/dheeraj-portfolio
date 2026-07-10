"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { profile } from "@/data/profile";

const links = [
  { href: "#case-studies", id: "case-studies", label: "Projects"   },
  { href: "#skills",       id: "skills",       label: "Skills"     },
  { href: "#journey",      id: "journey",      label: "Experience" },
  { href: "#about",        id: "about",        label: "About"      },
  { href: "#contact",      id: "contact",      label: "Contact"    },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState("");
  const [progress, setProgress]   = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
      setScrolled(y > 16);
      if (open) { setHidden(false); }
      else if (y > last && y > 320) { setHidden(true); }
      else if (y < last) { setHidden(false); }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-[transform,background-color,border-color,backdrop-filter] duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "glass-nav" : "bg-transparent border-transparent"}`}
      style={scrolled || open ? undefined : { borderColor: "transparent" }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-10 transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00E5FF, #A855F7)",
        }}
      />

      <div className="container-page h-[4rem] flex items-center gap-8">
        <a
          href="#top"
          className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {/* Square logo box — cyan→purple gradient */}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[13px] font-bold"
            style={{ background: "linear-gradient(135deg, #00E5FF, #A855F7)", color: "#0B0E14", boxShadow: "0 0 16px rgba(0,229,255,0.35)" }}
          >
            DK
          </span>
          <span
            className="text-[17px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--foreground)" }}
          >
            Dheeraj Kashyap
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                active === l.id ? "" : "text-muted-foreground hover:text-foreground"
              }`}
              style={active === l.id ? { color: "var(--cyan)" } : undefined}
            >
              <span className="opacity-50 mr-1">{String(i + 1).padStart(2, "0")}.</span>
              {l.label}
              {active === l.id && (
                <span aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #00E5FF, #A855F7)" }} />
              )}
            </a>
          ))}
        </nav>

        {/* Theme toggle — top-right */}
        <div className="hidden lg:flex items-center">
          <ThemeSwitch />
        </div>

        <div className="lg:hidden flex items-center gap-3 ml-auto">
          <ThemeSwitch />
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex items-center justify-center w-11 h-11 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden glass-nav border-t border-border" aria-label="Mobile">
          <ul className="container-page py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center min-h-12 text-[15px] font-medium transition-colors ${
                    active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  )}
                </a>
              </li>
            ))}
            <li className="flex flex-wrap items-center gap-4 pt-2 border-t border-border mt-1">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 text-[15px] text-muted-foreground"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 text-[15px] text-muted-foreground"
              >
                <GithubIcon size={15} /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
