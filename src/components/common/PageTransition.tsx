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

    /* Cover, jump to a section, uncover. `focus` moves keyboard focus to the
       section (link clicks); wheel paging leaves focus where it is. */
    const wipeTo = async (id: string, focus: boolean) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (!el || busy.current) return;
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
      history.pushState(null, "", `#${id}`);
      if (focus && id !== "top") {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
      setPhase("out");
      await wait(TOTAL);
      setPhase("idle");
      // Let trackpad momentum die down before the wheel can page again.
      await wait(wheelCooldown);
      busy.current = false;
    };

    /* Mouse-wheel paging at section boundaries (home page, fine pointer).
       Inside a section the wheel scrolls normally; once the end of the
       section is on screen, the next wheel-down wipes to the next section,
       and at the start of a section a wheel-up wipes to the previous one. */
    const wheelCooldown = 350;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let acc = 0;
    let accTimer = 0;
    const navOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 100;
    const currentIndex = () => {
      const line = navOffset() + 8;
      let idx = -1;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      return Math.max(0, idx);
    };
    const onWheel = (e: WheelEvent) => {
      if (location.pathname !== "/" || reduce.matches || !fine.matches) return;
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const t = e.target as HTMLElement;
      if (t.closest?.("textarea, select, input, .nav-sheet, [data-native-scroll]")) return;
      if (busy.current) { e.preventDefault(); return; }

      const i = currentIndex();
      const el = document.getElementById(SECTIONS[i].id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const down = e.deltaY > 0;
      const target = down ? i + 1 : i - 1;
      if (target < 0 || target >= SECTIONS.length) return;

      const atEnd = r.bottom <= window.innerHeight + 2;
      const atStart = r.top >= navOffset() - 4;
      if ((down && !atEnd) || (!down && !atStart)) { acc = 0; return; }

      // At a boundary: hold the page and wait for a deliberate push.
      e.preventDefault();
      acc += e.deltaY;
      clearTimeout(accTimer);
      accTimer = window.setTimeout(() => { acc = 0; }, 200);
      if (Math.abs(acc) < 40) return;
      acc = 0;
      void wipeTo(SECTIONS[target].id, false);
    };
    window.addEventListener("wheel", onWheel, { passive: false });

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
        await wipeTo(id, true);
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
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", onWheel);
      clearTimeout(accTimer);
    };
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
