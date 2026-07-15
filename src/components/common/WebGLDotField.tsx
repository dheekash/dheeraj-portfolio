"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 pointer;
  uniform vec3 color;
  uniform float reducedMotion;

  void main() {
    float minDim = min(resolution.x, resolution.y);
    vec2 p = gl_FragCoord.xy / minDim;
    vec2 center = resolution.xy / minDim * 0.5;

    float density = 24.0;
    vec2 drift = pointer * 0.02 * (1.0 - reducedMotion);
    vec2 cell = fract((p + drift) * density) - 0.5;
    float dist = length(cell);

    float breathe = mix(1.0, 0.55 + 0.45 * sin(time * 0.55), 1.0 - reducedMotion);
    float dot = smoothstep(0.16, 0.0, dist) * breathe;

    float fade = 1.0 - smoothstep(0.15, 1.05, length(p - center));

    float alpha = dot * fade * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Parses a computed CSS color (`#rrggbb` or `rgb(r, g, b)`) into 0–1 floats. */
function parseColor(input: string): [number, number, number] {
  const rgbMatch = input.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1].split(",").map((n) => parseFloat(n.trim()));
    return [r / 255, g / 255, b / 255];
  }
  const hex = input.trim().replace("#", "");
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  return [0.4, 0.65, 1];
}

/**
 * Dot-matrix particle field — WebGL shader background for the Portrait
 * Stories section. Full-bleed, alpha-blended, DPR-clamped. Breathes slowly
 * and drifts a few percent toward the pointer; both stop under
 * prefers-reduced-motion, leaving a static field. Falls back to the
 * existing CSS `.bg-dots` grid if WebGL isn't available.
 */
export function WebGLDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return; // DOM fallback (.bg-dots) stays visible

    if (fallbackRef.current) fallbackRef.current.style.display = "none";

    const vertexShader = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");
    const pointerLoc = gl.getUniformLocation(program, "pointer");
    const colorLoc = gl.getUniformLocation(program, "color");
    const reducedLoc = gl.getUniformLocation(program, "reducedMotion");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(reducedLoc, reducedMotion ? 1 : 0);

    let color = parseColor(getComputedStyle(document.documentElement).getPropertyValue("--primary"));
    const syncColor = () => {
      color = parseColor(getComputedStyle(document.documentElement).getPropertyValue("--primary"));
    };
    const observer = new MutationObserver(syncColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = reducedMotion ? 0 : (now - start) / 1000;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.04;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.04;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(pointerLoc, pointerCurrent.x, pointerCurrent.y);
      gl.uniform3f(colorLoc, color[0], color[1], color[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotion) raf = requestAnimationFrame(render);
    };
    render(start);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
      <div ref={fallbackRef} aria-hidden className="bg-dots pointer-events-none absolute inset-0 h-full w-full opacity-40" />
    </>
  );
}
