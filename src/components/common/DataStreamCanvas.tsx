"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

/**
 * Cinematic data-topology animation: drifting nodes, signal paths between
 * near neighbours, and bright pulses travelling along the edges — an
 * abstract lakehouse network. Canvas 2D, DPR-aware, fully fluid, pauses
 * when off-screen and renders a single static frame under reduced motion.
 */
export function DataStreamCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Theme-aware palette, re-read when the .dark class flips
    let palette = { node: "", edge: "", pulse: "" };
    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      palette = {
        node: s.getPropertyValue("--net-node").trim() || "rgba(37,99,235,0.42)",
        edge: s.getPropertyValue("--net-edge").trim() || "37, 99, 235",
        pulse: s.getPropertyValue("--net-pulse").trim() || "rgba(37,99,235,0.85)",
      };
    };
    readPalette();
    const mo = new MutationObserver(() => {
      readPalette();
      frame(false);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    const LINK_DIST = 170;

    const seed = () => {
      const area = w * h;
      const count = Math.min(90, Math.max(28, Math.round(area / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6,
      }));
      pulses = Array.from({ length: Math.round(count / 4) }, () => ({
        a: Math.floor(Math.random() * count),
        b: Math.floor(Math.random() * count),
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Layout may not be settled yet — never size (or seed) against a 0-rect
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const changed = Math.abs(rect.width - w) > 1 || Math.abs(rect.height - h) > 1;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0 || changed) seed();
    };

    const frame = (advance: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (advance) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${palette.edge}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = palette.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulses travelling along edges
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        if (advance) {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.a = p.b;
            p.b = Math.floor(Math.random() * nodes.length);
          }
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grad.addColorStop(0, palette.pulse);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      if (w === 0) resize(); // retry until layout settles
      frame(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    // Always paint one synchronous frame so the hero is never blank,
    // even before RAF ticks (or if it never does under reduced motion).
    frame(false);

    // Layout can settle after mount while RAF/ResizeObserver are throttled
    // (background tabs, embedded webviews) — retry on plain timers too.
    const retries = [60, 250, 1000].map((ms) =>
      setTimeout(() => {
        if (w === 0) {
          resize();
          frame(false);
        }
      }, ms)
    );

    if (!reduced) {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      frame(false);
    });
    ro.observe(canvas);

    const onWinResize = () => {
      resize();
      frame(false);
    };
    window.addEventListener("resize", onWinResize);

    // Pause when scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      retries.forEach(clearTimeout);
      window.removeEventListener("resize", onWinResize);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block w-full h-full ${className}`} />;
}
