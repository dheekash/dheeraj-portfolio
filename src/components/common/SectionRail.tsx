"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "./PageTransition";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Side pagination after the same pen: "01 / 07" and a stack of bars, one
 * per section, with the current one extended. Each bar is a link to its
 * section (so it uses the striped transition). Home page, wide screens only.
 */
export function SectionRail() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const i = SECTIONS.findIndex((s) => s.id === hit.target.id);
        if (i >= 0) setCurrent(i);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="srail" aria-label="Sections">
      <p className="srail-page" aria-hidden>
        <span className="srail-now">{pad(current + 1)}</span>
        <span className="srail-sep" />
        <span>{pad(SECTIONS.length)}</span>
      </p>
      <ul>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`srail-bar${i === current ? " is-active" : ""}`}
              aria-current={i === current ? "true" : undefined}
            >
              <span className="srail-name">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
