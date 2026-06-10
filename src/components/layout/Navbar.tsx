"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Impact",         href: "#impact" },
  { label: "Process",        href: "#process" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Scrolled past hero = tighten glass
      setScrolled(y > 60);

      // Hide on scroll-down, show on scroll-up
      // Only hide after user has scrolled 100px from top
      if (y < 100) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);   // scrolling down
      } else if (y < lastY.current - 4) {
        setHidden(false);  // scrolling up
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 pointer-events-none",
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hidden ? "-translate-y-[110%]" : "translate-y-0"
      )}
    >
      <header
        className={cn(
          "w-full pointer-events-auto",
          "transition-all duration-300",
          "backdrop-blur-[16px]",
          "border-b border-border",
          scrolled
            ? "bg-background/90 shadow-sm"
            : "bg-background/75",
          "relative"
        )}
      >
        {/* Bottom edge glow when scrolled */}

        <nav className="container-max px-6 sm:px-10">
          <div className="flex items-center justify-between h-[76px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Home">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm tracking-tight">DK</span>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-200" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-base font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground font-medium">{profile.role}</p>
              </div>
            </Link>

            {/* ── Desktop nav — centered ── */}
            <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 cursor-pointer font-medium",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      active === item.href
                        ? "text-primary bg-primary/8"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2.5 shrink-0">
              <ThemeSwitch />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ── Mobile menu ── */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-black/[0.06] dark:border-white/[0.08] py-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] rounded-xl transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 px-1 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3 rounded-lg text-sm font-semibold bg-primary hover:opacity-90 text-primary-foreground transition-opacity cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
