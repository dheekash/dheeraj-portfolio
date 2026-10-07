"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Horizontal project rail that pins while the page scrolls past it: vertical
 * scroll moves the cards sideways, with a 01 / 0N counter and progress line.
 *
 * Falls back to a native sideways-scrolling row with snap points on narrow
 * screens and under reduced motion, where pinning would fight the user.
 * Keyboard focus on an off-screen card scrolls the page to bring it in.
 *
 * Scroll updates write straight to the DOM (transform, counter, bar); React
 * only re-renders when the mode changes, never per frame.
 */
export function PinnedTrack({
  count,
  head,
  children,
}: {
  count: number;
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const now = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const w = wrap.current;
    const t = track.current;
    if (!w || !t) return;

    let shown = -1;
    const paint = (p: number) => {
      const i = Math.round(p * (count - 1));
      if (i !== shown && now.current) {
        now.current.textContent = pad(i + 1);
        shown = i;
      }
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
    };

    if (!pinned) {
      w.style.height = "";
      t.style.transform = "";
      const onNative = () => {
        const max = t.scrollWidth - t.clientWidth;
        paint(max > 0 ? t.scrollLeft / max : 0);
      };
      t.addEventListener("scroll", onNative, { passive: true });
      onNative();
      return () => t.removeEventListener("scroll", onNative);
    }

    /* Distance the row must slide: from the start of the track to the right
       edge of the last card plus the track's own right padding. */
    let travel = 0;
    const measure = () => {
      const last = t.lastElementChild as HTMLElement | null;
      if (!last) return;
      const padRight = parseFloat(getComputedStyle(t).paddingRight) || 0;
      travel = Math.max(0, last.offsetLeft + last.offsetWidth + padRight - t.clientWidth);
      w.style.height = `${window.innerHeight + travel}px`;
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = w.getBoundingClientRect();
      const span = w.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      t.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      paint(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); update(); };

    /* Bring a keyboard-focused card into view by scrolling the page. */
    const onFocus = (e: FocusEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (!card || travel <= 0) return;
      const p = Math.min(1, card.offsetLeft / travel);
      const top = w.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + p * (w.offsetHeight - window.innerHeight), behavior: "instant" as ScrollBehavior });
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    t.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      t.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(raf);
    };
  }, [pinned, count]);

  return (
    <div ref={wrap} className={`pt${pinned ? " is-pinned" : ""}`}>
      <div className="pt-sticky">
        <div className="container pt-head">{head}</div>
        <div ref={track} className="pt-track">
          {children}
        </div>
        <div className="container pt-foot" aria-hidden>
          <span className="pt-count">
            <span ref={now} className="pt-now">01</span>
            <span className="pt-bar"><span ref={bar} /></span>
            <span className="pt-total">{pad(count)}</span>
          </span>
          <span className="pt-hint">
            {pinned ? (
              <>Scroll to see projects <ArrowDown size={14} /></>
            ) : (
              <>Swipe to see projects <ArrowRight size={14} /></>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
