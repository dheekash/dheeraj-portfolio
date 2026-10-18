"use client";

import { useEffect, useRef, useState } from "react";

/* Outline colours for the particles: iris, saffron, teal, magenta, blue, lilac. */
const COLORS = ["#8052FF", "#FFB829", "#2EC4A6", "#E0479E", "#4D7CFF", "#B69CFF"];

type P = { x: number; y: number; s: number; r: number; vr: number; c: number; a: number; ph: number; amp: number; z: number };

/** Normal-ish random number, mean 0, roughly ±3. */
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;

/**
 * The Void palette's hero art: a star schema drawn as a constellation of
 * small outlined triangles. The portrait is the fact table, ringed by a
 * dense halo; on wide screens dimension clusters sit in the free space
 * beside it, strung back to it; a faint field drifts across the rest. The
 * copy column is always kept clear.
 *
 * Only runs while the Void palette is active. Animates on desktop; draws one
 * still frame on phones and tablets, and under reduced motion. Pauses when
 * the hero is off screen or the tab is hidden.
 */
export function HeroConstellation() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  // Follow the palette: the switcher sets data-palette on <html>.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setOn(root.getAttribute("data-palette") === "void");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-palette"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const cv = canvas.current;
    if (!on || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const hero = cv.parentElement as HTMLElement;
    const still = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 1023.98px)").matches;

    let parts: P[] = [];
    let w = 0, h = 0, raf = 0, last = 0, visible = true;
    let px = 0, py = 0, tx = 0, ty = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rects relative to the hero: the portrait is the fact table, the
      // copy column is kept clear so no triangle sits on the text.
      const box = hero.getBoundingClientRect();
      const rel = (el: Element | null) => {
        const r = el?.getBoundingClientRect();
        return r ? { l: r.left - box.left, t: r.top - box.top, r: r.right - box.left, b: r.bottom - box.top } : null;
      };
      const pr = rel(hero.querySelector(".hx-photo")) ?? { l: w * 0.62, t: h * 0.15, r: w * 0.88, b: h * 0.7 };
      const cr = rel(hero.querySelector(".hx-copy"));
      // Text to keep clear: the copy column and the pipeline strip below it.
      const clear = [cr, rel(hero.querySelector(".hflow"))].filter((r): r is NonNullable<typeof r> => !!r);
      const pad = 18;
      const inCopy = (x: number, y: number) => clear.some((c) => x > c.l - pad && x < c.r + pad && y > c.t - pad && y < c.b + pad);
      const inPhoto = (x: number, y: number) => x > pr.l && x < pr.r && y > pr.t && y < pr.b;
      // Side by side (desktop) leaves room for dimension clusters around the portrait.
      const wide = !!cr && pr.l > cr.r + 120;

      const add = (x: number, y: number, z: number, aMin = 0.55) => parts.push({
        x, y, z,
        s: 2.6 + Math.random() * 4.2,
        r: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.6,
        c: Math.floor(Math.random() * COLORS.length),
        a: aMin + Math.random() * (1 - aMin),
        ph: Math.random() * Math.PI * 2,
        amp: 1.5 + Math.random() * 4,
      });

      parts = [];
      const keep = (x: number, y: number) => !inCopy(x, y) && x > 4 && x < w - 4 && y > 4 && y < h - 4;
      const put = (x: number, y: number, z: number, aMin?: number) => { if (keep(x, y)) add(x, y, z, aMin); };

      // Fact table: a halo hugging the portrait's edge, densest at the rim.
      const pw = pr.r - pr.l, ph = pr.b - pr.t, per = 2 * (pw + ph);
      const edge = (u: number) => {
        let d = u * per;
        if (d < pw) return { x: pr.l + d, y: pr.t, nx: 0, ny: -1 };
        d -= pw; if (d < ph) return { x: pr.r, y: pr.t + d, nx: 1, ny: 0 };
        d -= ph; if (d < pw) return { x: pr.r - d, y: pr.b, nx: 0, ny: 1 };
        d -= pw; return { x: pr.l, y: pr.b - d, nx: -1, ny: 0 };
      };
      for (let i = 0; i < (wide ? 230 : 120); i++) {
        const e = edge(Math.random());
        const out = 8 + Math.abs(gauss()) * (wide ? 16 : 10);
        put(e.x + e.nx * out + gauss() * 3, e.y + e.ny * out + gauss() * 3, 1);
      }

      // Dimensions in the free space beside the portrait, each strung back to it.
      if (wide && cr) {
        const gapX = (cr.r + pr.l) / 2, sideX = (pr.r + w) / 2;
        const dims = [
          { x: gapX, y: pr.t + ph * 0.12 },
          { x: gapX - 10, y: pr.t + ph * 0.55 },
          { x: gapX + 20, y: Math.min(pr.b + 70, h - 60) },
          ...(w - pr.r > 110 ? [{ x: sideX, y: pr.t + ph * 0.3 }, { x: sideX, y: pr.t + ph * 0.78 }] : []),
        ];
        const cx = (pr.l + pr.r) / 2, cy = (pr.t + pr.b) / 2;
        for (const d of dims) {
          for (let i = 0; i < 70; i++) put(d.x + gauss() * 15, d.y + gauss() * 13, 0.8);
          // Strand: from the cluster towards the portrait's centre, stopping at its edge.
          for (let i = 0; i < 26; i++) {
            const t = Math.random() * 0.9;
            const x = d.x + (cx - d.x) * t + gauss() * 3, y = d.y + (cy - d.y) * t + gauss() * 3;
            if (!inPhoto(x, y)) put(x, y, 0.6, 0.4);
          }
        }
      }

      // Faint ambient field across the rest of the hero.
      for (let i = 0; i < (wide ? 110 : 34); i++) {
        const x = Math.random() * w, y = Math.random() * h;
        if (!inPhoto(x, y)) put(x, y, 0.3, 0.15);
      }
    };

    const tri = (p: P, x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        const a = p.r + (i * 2 * Math.PI) / 3;
        const vx = x + Math.cos(a) * p.s, vy = y + Math.sin(a) * p.s;
        if (i === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    // One stroke per colour and opacity band keeps a frame to ~18 paths.
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.1;
      ctx.lineJoin = "round";
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      for (let c = 0; c < COLORS.length; c++) {
        ctx.strokeStyle = COLORS[c];
        for (let band = 0; band < 3; band++) {
          ctx.globalAlpha = 0.35 + band * 0.3;
          ctx.beginPath();
          for (const p of parts) {
            if (p.c !== c || Math.min(2, Math.floor(p.a * 3)) !== band) continue;
            const o = p.ph + t * 0.0004;
            tri(p, p.x + Math.cos(o) * p.amp + px * p.z, p.y + Math.sin(o * 1.3) * p.amp + py * p.z);
            if (!still) p.r += p.vr * 0.01;
          }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 33) return; // ~30 fps is plenty for a slow drift
      last = t;
      draw(t);
    };
    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    build();
    draw(0);
    if (still) {
      let id = 0;
      const onResize = () => { clearTimeout(id); id = window.setTimeout(() => { build(); draw(0); }, 150); };
      window.addEventListener("resize", onResize);
      return () => { window.removeEventListener("resize", onResize); ctx.clearRect(0, 0, w, h); };
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(hero);
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => { tx = (e.clientX / window.innerWidth - 0.5) * -24; ty = (e.clientY / window.innerHeight - 0.5) * -16; };
    let id = 0;
    const onResize = () => { clearTimeout(id); id = window.setTimeout(build, 150); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      ctx.clearRect(0, 0, w, h);
    };
  }, [on]);

  return <canvas ref={canvas} className="hx-constellation" aria-hidden />;
}
