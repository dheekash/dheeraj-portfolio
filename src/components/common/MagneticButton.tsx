"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a link/button so it subtly follows the cursor while hovered, then
 * springs back on leave. Translate-only (GPU), disabled for touch and
 * reduced-motion. Renders an <a> by default.
 */
export function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.32,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-flex transition-transform duration-300 ease-out will-change-transform active:scale-[0.97] ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
