"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

const links = [
  { href: "#about",         id: "about",         label: "About"          },
  { href: "#skills",        id: "skills",        label: "Skills"         },
  { href: "#case-studies",  id: "case-studies",  label: "Projects"       },
  { href: "#journey",       id: "journey",       label: "Experience"     },
  { href: "#certifications",id: "certifications",label: "Certifications" },
  { href: "#contact",       id: "contact",       label: "Contact"        },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Show on scroll up, hide on scroll down (once past the hero)
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (open) {
        setHidden(false);
      } else if (y > last && y > 320) {
        setHidden(true);
      } else if (y < last) {
        setHidden(false);
      }
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

  // Highlight the section currently in view
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
      className={`fixed top-0 inset-x-0 z-50 transition-[transform,background-color,border-color] duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "glass-nav" : "bg-transparent border-b border-transparent"}`}
    >
      <div className="container-page h-[3.75rem] flex items-center justify-between gap-4">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Dheeraj Kashyap<span className="accent-text">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative px-3 py-2 text-[13px] transition-colors rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
                active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              {active === l.id && (
                <span
                  aria-hidden
                  className="absolute left-3 right-3 -bottom-0.5 h-px"
                  style={{ background: "var(--primary)" }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <LinkedinIcon size={15} />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity"
          >
            Download Resume <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Mobile: toggle + burger */}
        <div className="lg:hidden flex items-center gap-1.5">
          <ThemeToggle />
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
                  className="flex items-center min-h-12 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-5 pt-2">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 text-[15px] font-medium accent-text"
              >
                Download Resume <ArrowUpRight size={14} />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 text-[15px] text-muted-foreground"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
