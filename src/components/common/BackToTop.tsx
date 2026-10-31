"use client";

import { useEffect, useState } from "react";

/**
 * Floating back-to-top button (after a Uiverse.io button by vinodjangid07):
 * a round button that appears once you have scrolled a screen down; on
 * hover it widens into a pill, the arrow lifts out and "Back to top" slides
 * in. It moves focus to the top of the content too.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Shown after the first screen; hidden again at the very end, where the
    // footer has its own "Back to top" link.
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#main-content"
      className={`btt${show ? " is-shown" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <svg className="btt-icon" viewBox="0 0 384 512" aria-hidden>
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
      </svg>
      <span className="btt-label" aria-hidden>Back to top</span>
    </a>
  );
}
