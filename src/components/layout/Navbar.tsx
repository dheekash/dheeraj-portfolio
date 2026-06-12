"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { href: "#case-files", label: "Case files" },
  { href: "#path", label: "The path" },
  { href: "#method", label: "Method" },
  { href: "#contact", label: "Contact" },
];

/**
 * Masthead — a newspaper-style top bar rather than a floating glass nav.
 * Sits on the paper, ruled off with a hairline once scrolled.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-page h-14 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-serif text-[17px] font-semibold tracking-tight text-foreground shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Dheeraj Kashyap
        </a>

        <p className="hidden lg:block kicker text-center flex-1 truncate">
          Business Intelligence &amp; Analytics · Bengaluru
        </p>

        <nav className="flex items-center gap-5 sm:gap-7 shrink-0">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden sm:inline text-[13px] text-muted-foreground hover:text-rust transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground link-editorial"
          >
            Résumé <ArrowUpRight size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
}
