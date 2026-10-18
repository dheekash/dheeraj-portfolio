"use client";

import { useEffect, useState } from "react";

/**
 * The case study's "On this page" list. Marks the section being read with
 * aria-current="location": the last section whose top has passed a line
 * just under the floating nav, so short final sections still light up once
 * the page bottoms out.
 */
export function CaseToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((b) => document.getElementById(b.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sections[0].id;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (atBottom) {
        // Bottomed out: pick the last section still on screen.
        const visible = sections.filter((el) => el.getBoundingClientRect().top < window.innerHeight);
        if (visible.length) current = visible[visible.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav className="cs2-toc" aria-label="On this page">
      <span className="label">On this page</span>
      <ol>
        {items.map((b) => (
          <li key={b.id}>
            <a href={`#${b.id}`} aria-current={active === b.id ? "location" : undefined}>{b.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
