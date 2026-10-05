"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/* Four destinations. Platform judgment and certifications sit inside
   Expertise's reach on the page; Contact is the primary button. */
const links = [
  { id: "work", label: "Work", sections: ["work"] },
  { id: "experience", label: "Experience", sections: ["experience"] },
  { id: "expertise", label: "Expertise", sections: ["platforms", "expertise", "certifications"] },
  { id: "about", label: "About", sections: ["about"] },
];

function ThemeButton() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      className="nav-icon-btn"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section: whichever tracked section crosses the middle band. */
  useEffect(() => {
    if (!onHome) return;
    const map = new Map<string, string>();
    links.forEach((l) => l.sections.forEach((s) => map.set(s, l.id)));
    const els = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(map.get(hit.target.id) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  /* Sheet: Escape closes, body does not scroll behind it, desktop width closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className={`nav${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href={onHome ? "#top" : "/"} className="nav-brand">
          Dheeraj Kashyap
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.id}
              href={href(l.id)}
              className="nav-link"
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeButton />
          <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            Résumé<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={href("contact")} className="btn btn-primary btn-sm">
            Let&rsquo;s talk
          </a>
        </div>

        <div className="nav-mobile">
          <ThemeButton />
          <button
            type="button"
            className="nav-icon-btn"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="nav-sheet" className="nav-sheet">
          <nav className="container" aria-label="Mobile">
            <ul>
              {links.map((l) => (
                <li key={l.id}>
                  <a href={href(l.id)} className="sheet-link" onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="sheet-actions">
              <a href={href("contact")} className="btn btn-primary" onClick={() => setOpen(false)}>
                Let&rsquo;s talk
              </a>
              <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Download résumé<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
