"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { href: "#impact", label: "Impact" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#journey", label: "Journey" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "glass-nav" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page h-[3.75rem] flex items-center justify-between gap-4">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          dheeraj kashyap<span className="signal-text">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass text-[13px] font-medium hover:border-foreground/25 transition-colors"
          >
            Resume <ArrowUpRight size={12} />
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden glass-nav border-t border-border" aria-label="Mobile">
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
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 text-[15px] font-medium signal-text"
              >
                Download Resume <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
