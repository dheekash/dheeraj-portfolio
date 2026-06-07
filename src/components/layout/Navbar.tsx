"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { LinkButton } from "@/components/common/LinkButton";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { label: "About",      href: "#about" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "Projects",   href: "#projects" },
  { label: "Career",     href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Certs",      href: "#certifications" },
  { label: "Contact",    href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled
        ? "glass border-b border-border shadow-lg"
        : "bg-transparent"
    )}>
      <nav className="container-max section-padding !py-0">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">DK</span>
              </div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-foreground/90 group-hover:text-foreground transition-colors">{profile.name}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{profile.role}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "px-3.5 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer font-medium",
                    active === item.href
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/6"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LinkButton
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-border bg-muted/50 hover:bg-muted text-foreground/80 transition-all"
            >
              <Download size={13} />
              Resume
            </LinkButton>

            {/* Theme toggle */}
            <ThemeSwitch />

            <button
              onClick={() => scrollTo("#contact")}
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition-all cursor-pointer"
            >
              Contact Me
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 px-1 flex flex-col gap-2">
              <LinkButton
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-white/10 bg-white/5 text-foreground/80"
              >
                <Download size={14} /> Download Resume
              </LinkButton>
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
