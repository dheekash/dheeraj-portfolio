"use client";

import { useEffect, useRef } from "react";

interface Point { x: number; y: number }
interface WaveConfig {
  offset: number; amplitude: number; frequency: number;
  color: string; opacity: number;
}

/**
 * Mounts an animated glowy-wave canvas onto a <canvas> element ref.
 * Colors are read from the portfolio's dark-mode palette directly.
 */
export function useWaveCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    /* ── Portfolio wave palette (dark-first, adapts via CSS vars) ── */
    const getWaves = (): WaveConfig[] => {
      const root = getComputedStyle(document.documentElement);
      const resolve = (varName: string, fallback: string) => {
        const val = root.getPropertyValue(varName).trim();
        return val || fallback;
      };

      // Read the site's actual --primary / --accent as best-effort hex
      // Falls back to the visual blue/indigo palette already on the page
      return [
        { offset: 0,              amplitude: 72, frequency: 0.003,  color: "rgba(59,130,246,0.9)",  opacity: 0.45 },
        { offset: Math.PI / 2,    amplitude: 94, frequency: 0.0026, color: "rgba(99,102,241,0.8)",  opacity: 0.38 },
        { offset: Math.PI,        amplitude: 58, frequency: 0.0034, color: "rgba(139,92,246,0.7)",  opacity: 0.30 },
        { offset: Math.PI * 1.5,  amplitude: 82, frequency: 0.0022, color: "rgba(59,130,246,0.5)",  opacity: 0.22 },
        { offset: Math.PI * 2,    amplitude: 52, frequency: 0.004,  color: "rgba(245,158,11,0.4)",  opacity: 0.18 },
      ];
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReduced ? 10 : 65;
    const influenceRadius = prefersReduced ? 160 : 320;
    const smoothing = prefersReduced ? 0.04 : 0.1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = { ...c };
      targetRef.current = { ...c };
    };

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const infl = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 40;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const waves = getWaves();

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

      /* Transparent clear — lets the section's CSS background show through */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      waves.forEach(drawWave);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [canvasRef]);
}
