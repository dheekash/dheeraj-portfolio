"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { label: "Impact",     href: "#impact" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
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
        "fixed top-0 inset-x-0 z-50 flex justify-center px-5 pt-5 pointer-events-none",
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hidden ? "-translate-y-[110%]" : "translate-y-0"
      )}
    >
      <header
        className={cn(
          "w-full max-w-[980px] rounded-2xl pointer-events-auto",
          "transition-all duration-500",
          "backdrop-blur-[28px] saturate-[1.8]",
          "border",
          scrolled
            ? [
                "shadow-2xl shadow-black/25",
                "bg-white/[0.86] border-white/[0.90] dark:bg-[#060D1F]/[0.86] dark:border-white/[0.12]",
              ]
            : [
                "shadow-xl shadow-black/15",
                "bg-white/[0.72] border-white/[0.82] dark:bg-[#060D1F]/[0.60] dark:border-white/[0.09]",
              ],
          "relative overflow-visible"
        )}
      >
        {/* Top-edge light refraction */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/25 to-transparent pointer-events-none rounded-full z-10" />

        <nav className="px-5 sm:px-7">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Home">
              <div
                className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-sm tracking-tight">DK</span>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-200" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {profile.name}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">{profile.role}</p>
              </div>
            </Link>

            {/* ── Desktop nav — centered ── */}
            <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "px-4 py-2 text-[14px] rounded-xl transition-all duration-200 cursor-pointer font-semibold tracking-wide",
                      active === item.href
                        ? "text-blue-600 dark:text-blue-400 bg-blue-500/12 dark:bg-blue-500/15"
                        : "text-foreground/70 hover:text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
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
                onClick={() => scrollTo("#contact")}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                Hire Me
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8 transition-all cursor-pointer"
                aria-label="Toggle menu"
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
                  className="w-full py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shadow-lg shadow-blue-600/25"
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
