"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionRail } from "@/components/common/SectionRail";
import { Logo } from "@/components/common/Logo";

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

/**
 * Small contact bar for phones and tablets (desktop keeps "Let's talk" in
 * the sticky nav). Appears once the hero is passed and steps aside when the
 * contact section itself is on screen.
 */
function MobileContactBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    let contactVisible = false;
    const io = contact
      ? new IntersectionObserver(([e]) => {
          contactVisible = e.isIntersecting;
          update();
        })
      : null;
    function update() {
      setShow(window.scrollY > window.innerHeight * 0.9 && !contactVisible);
    }
    if (contact && io) io.observe(contact);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);

  return (
    <div className={`contact-bar glass${show ? " is-shown" : ""}`} aria-hidden={!show}>
      <span className="contact-bar-id">
        <Logo size={32} />
        <span className="contact-bar-text">
          <strong>Dheeraj Kashyap</strong>
          <span>BI &amp; Analytics Engineer</span>
        </span>
      </span>
      <a href="#contact" className="btn btn-primary btn-sm" tabIndex={show ? 0 : -1}>
        Let&rsquo;s talk
      </a>
    </div>
  );
}

export function SiteChrome({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname();
  useRevealOnce(pathname);


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
      <MobileContactBar />
      {pathname === "/" && <SectionRail />}
      <PageTransition />
    </>
  );
}
