"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { href: "#brief", label: "The brief" },
  { href: "#case-files", label: "Case files" },
  { href: "#path", label: "The path" },
  { href: "#method", label: "Method" },
  { href: "#contact", label: "Contact" },
];

/**
 * Masthead — a newspaper-style top bar rather than a floating glass nav.
 * Collapses into a full-width ruled menu on small screens.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled || open ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-page h-14 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="font-serif text-[17px] font-semibold tracking-tight text-foreground shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Dheeraj Kashyap
        </a>

        <p className="hidden xl:block kicker text-center flex-1 truncate">
          Business Intelligence &amp; Analytics · Bengaluru
        </p>

        {/* Desktop / tablet links */}
        <nav className="hidden md:flex items-center gap-2 shrink-0">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-2.5 py-2 text-[13px] text-muted-foreground hover:text-rust transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1 text-[13px] font-medium text-foreground link-editorial"
          >
            Résumé <ArrowUpRight size={12} />
          </a>
        </nav>

        {/* Mobile toggle — 44px touch target */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu — ruled list, large touch rows */}
      {open && (
        <nav className="md:hidden bg-background container-page pb-4" aria-label="Mobile">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="rule-thin">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-12 py-2 text-[15px] font-medium text-foreground hover:text-rust transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="rule-thin">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 min-h-12 py-2 text-[15px] font-medium text-rust"
              >
                Résumé (PDF) <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
