"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/common/LinkButton";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Services", href: "#consulting" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="container-max section-padding !py-0">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo / Monogram */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Dheeraj Kashyap home">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="text-white font-bold text-sm tracking-tight select-none">DK</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                {profile.name}
              </span>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">{profile.role}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <LinkButton
              href={profile.resumeUrl}
              download
              aria-label="Download Resume"
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 border-white/10 hover:border-blue-500/50 bg-transparent hover:bg-blue-500/10 text-foreground"
            >
              <Download size={14} />
              Resume
            </LinkButton>

            <Button
              size="sm"
              className="hidden lg:flex bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              onClick={() => handleNavClick("#contact")}
            >
              Contact Me
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <LinkButton
                href={profile.resumeUrl}
                download
                variant="outline"
                size="sm"
                className="border-white/10 bg-transparent text-foreground"
              >
                <Download size={14} className="mr-2" />
                Download Resume
              </LinkButton>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => handleNavClick("#contact")}
              >
                Contact Me
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
