"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Order matches the page; used for labels and the rail. */
export const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Technologies" },
  { id: "work", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const BARS = 8;
const STAGGER = 40; // ms between bars
const DUR = 320; // ms per bar
const TOTAL = DUR + STAGGER * (BARS - 1);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pad = (n: number) => String(n).padStart(2, "0");

function routeLabel(path: string) {
  if (path === "/") return "Home";
  if (path.startsWith("/work/")) return "Case study";
  if (path.startsWith("/certifications")) return "Certifications";
  return "";
}

/**
 * Striped section transition, after "Fancy Sections Transition" by Nikolay
 * Talanov: eight vertical bars sweep down to cover the screen, the page
 * jumps (in-page section or new route) while covered, then the bars sweep
 * away. The cover shows where you are going ("03 / 07 Experience").
 *
 * Intercepts same-origin link clicks only; modified clicks, new tabs,
 * downloads, mail links and external links behave normally. Skipped
 * entirely under prefers-reduced-motion.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [label, setLabel] = useState({ count: "", name: "" });
  const busy = useRef(false);
  const pending = useRef<{ hash: string } | null>(null);

  // Uncover after a route change lands.
  useEffect(() => {
    if (!pending.current) return;
    const { hash } = pending.current;
    pending.current = null;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(async () => {
      setPhase("out");
      await wait(TOTAL);
      setPhase("idle");
      busy.current = false;
    });
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = async (e: MouseEvent) => {
      if (reduce.matches || busy.current) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || !a.href) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname.startsWith("/api/")) return;

      const samePage = url.pathname === location.pathname;
      const hash = url.hash;

      if (samePage) {
        if (!hash) return;
        const id = decodeURIComponent(hash.slice(1));
        const el = id === "top" ? document.body : document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        busy.current = true;
        const i = SECTIONS.findIndex((s) => s.id === id);
        setLabel({
          count: i >= 0 ? `${pad(i + 1)} / ${pad(SECTIONS.length)}` : "",
          name: i >= 0 ? SECTIONS[i].label : "",
        });
        setPhase("in");
        await wait(TOTAL + 60);
        if (id === "top") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        else el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
        history.pushState(null, "", hash);
        // Move focus for keyboard and screen-reader users.
        if (id !== "top") {
          if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        }
        setPhase("out");
        await wait(TOTAL);
        setPhase("idle");
        busy.current = false;
        return;
      }

      // Different route on this site.
      e.preventDefault();
      busy.current = true;
      setLabel({ count: "", name: routeLabel(url.pathname) });
      setPhase("in");
      await wait(TOTAL + 60);
      pending.current = { hash };
      router.push(url.pathname + url.search + url.hash, { scroll: false });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div className={`stw stw-${phase}`} aria-hidden>
      {Array.from({ length: BARS }, (_, i) => (
        <span key={i} className="stw-bar" style={{ "--i": i } as React.CSSProperties} />
      ))}
      <p className="stw-label">
        {label.count && <span className="stw-count">{label.count}</span>}
        {label.name && <span className="stw-name">{label.name}</span>}
      </p>
    </div>
  );
}
