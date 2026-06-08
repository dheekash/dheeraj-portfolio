"use client";

import { useState, useEffect } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <header
        className={cn(
          "w-full max-w-[860px] rounded-2xl pointer-events-auto",
          "transition-all duration-500",
          // Glass base — always present
          "backdrop-blur-[28px] saturate-[1.8]",
          "border",
          scrolled
            ? [
                "shadow-2xl shadow-black/25",
                "bg-white/[0.82] border-white/[0.88] dark:bg-[#060D1F]/[0.82] dark:border-white/[0.10]",
              ]
            : [
                "shadow-xl shadow-black/15",
                "bg-white/[0.70] border-white/[0.80] dark:bg-[#060D1F]/[0.55] dark:border-white/[0.08]",
              ],
          // Top highlight
          "relative overflow-visible"
        )}
      >
        {/* Top-edge light refraction */}
        <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent pointer-events-none rounded-full z-10" />

        <nav className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-[60px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Home">
              <div
                className="relative w-8 h-8 rounded-xl overflow-hidden shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-xs tracking-tight">DK</span>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-200" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {profile.name}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">{profile.role}</p>
              </div>
            </Link>

            {/* ── Desktop nav — centered ── */}
            <ul className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "px-4 py-1.5 text-[13px] rounded-xl transition-all duration-200 cursor-pointer font-semibold tracking-wide",
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
            <div className="flex items-center gap-2 shrink-0">
              <ThemeSwitch />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8 transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] rounded-xl transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 px-1 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shadow-lg shadow-blue-600/25"
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
