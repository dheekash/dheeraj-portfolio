"use client";

import { useEffect, useRef } from "react";

/**
 * "DATA" drawn in particles. Each point springs back to its place in the
 * word and scatters away from the pointer. Runs only while on screen; under
 * reduced motion the word is drawn once, still.
 */
export function DataParticles({ word = "DATA" }: { word?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = ["#A99BFF", "#8B7DF7", "#C084FC", "#E6AD10", "#6EC1CC"];

    type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; c: string; r: number };
    let pts: P[] = [];
    let w = 0, h = 0, dpr = 1;
    let mx = -9999, my = -9999;
    let raf = 0;
    let visible = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the word off-screen and sample its filled pixels.
      const off = document.createElement("canvas");
      off.width = Math.round(w);
      off.height = Math.round(h);
      const o = off.getContext("2d");
      if (!o) return;
      const size = Math.min(h * 0.62, w / (word.length * 0.74));
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      // next/font hashes the family name, so read the resolved stack.
      o.font = `800 ${size}px ${getComputedStyle(document.body).fontFamily}`;
      o.fillText(word, w / 2, h / 2 + size * 0.04);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(4, Math.round(size / 26));
      const next: P[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            const old = pts[next.length];
            next.push({
              hx: x, hy: y,
              x: old ? old.x : Math.random() * w,
              y: old ? old.y : Math.random() * h,
              vx: 0, vy: 0,
              c: palette[(x + y) % palette.length],
              r: step * 0.32,
            });
          }
        }
      }
      pts = next;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      raf = 0;
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 4900) {
          const f = (4900 - d2) / 4900 * 2.2;
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.045;
        p.vy += (p.hy - p.y) * 0.045;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    };

    /* Nothing is built until the panel first nears the viewport, so the
       canvas costs nothing at page load. */
    let built = false;
    const ensureBuilt = async () => {
      if (built) return;
      built = true;
      await document.fonts?.ready; // so the word uses Geist, not a fallback
      build();
      if (reduce) {
        for (const p of pts) { p.x = p.hx; p.y = p.hy; }
        draw();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (!visible) return;
        ensureBuilt().then(() => {
          if (!reduce && visible && !raf) raf = requestAnimationFrame(step);
        });
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(canvas);
    if (reduce) return () => io.disconnect();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    const onResize = () => { if (built) build(); };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [word]);

  return <canvas ref={ref} className="data-canvas" role="img" aria-label={`The word ${word} drawn in particles`} />;
}
