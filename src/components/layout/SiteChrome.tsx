"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

/**
 * Fades each `.reveal` block up once as it enters the viewport. Content is
 * only hidden after this runs (`reveal-ready` on <html>), so it is always
 * visible without JS, and the CSS skips it under reduced motion.
 */
function useRevealOnce(pathname: string) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    // Anything already on screen is shown at once rather than animated.
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      else io.observe(el);
    });
    root.classList.add("reveal-ready");
    return () => io.disconnect();
  }, [pathname]);
}

export function SiteChrome({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname();
  useRevealOnce(pathname);

  if (pathname.startsWith("/deck")) return <>{children}</>;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {footer}
    </>
  );
}
