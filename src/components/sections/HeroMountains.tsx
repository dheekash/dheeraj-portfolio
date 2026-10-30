/**
 * The Mercury palette's hero scene: blue-hour mountains in mist, drawn as
 * static SVG. Five ridges recede from the page colour at the front to a
 * pale haze at the horizon, with soft mist bands between them. Ridge shapes
 * come from a seeded generator, so server and browser markup match; every
 * colour is a CSS variable (--mt-*), so light mode draws a dawn version.
 * Hidden in the other palettes.
 */

// Mulberry32: small, fast, deterministic.
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const W = 1600;
const H = 900;

/** A ridge line: a few broad peaks plus finer roughness, closed to the bottom. */
function ridge(seed: number, base: number, height: number, peaks: number, rough: number) {
  const r = rng(seed);
  const crests = Array.from({ length: peaks }, () => ({ x: r() * W, h: (0.45 + r() * 0.55) * height, w: 140 + r() * 260 }));
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 16) {
    let y = 0;
    for (const c of crests) y = Math.max(y, c.h * Math.max(0, 1 - Math.abs(x - c.x) / c.w));
    y += (r() - 0.5) * rough;
    pts.push(`${x},${(base - y).toFixed(1)}`);
  }
  return `M0,${H} L${pts.join(" L")} L${W},${H} Z`;
}

const ridges = [
  { cls: "mt-r1", d: ridge(11, 520, 260, 5, 6) },
  { cls: "mt-r2", d: ridge(23, 590, 230, 6, 8) },
  { cls: "mt-r3", d: ridge(37, 660, 200, 6, 10) },
  { cls: "mt-r4", d: ridge(53, 735, 170, 7, 12) },
  { cls: "mt-r5", d: ridge(71, 815, 120, 8, 12) },
];

export function HeroMountains() {
  return (
    <svg className="mtn" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden focusable="false">
      <defs>
        <linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="mt-sky-0" />
          <stop offset="0.55" className="mt-sky-1" />
          <stop offset="1" className="mt-sky-2" />
        </linearGradient>
        <radialGradient id="mt-glow" cx="0.5" cy="0.62" r="0.5">
          <stop offset="0" className="mt-glow-0" />
          <stop offset="1" className="mt-glow-1" />
        </radialGradient>
        <linearGradient id="mt-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="mt-mist-0" />
          <stop offset="0.5" className="mt-mist-1" />
          <stop offset="1" className="mt-mist-0" />
        </linearGradient>
        <linearGradient id="mt-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" className="mt-fade-0" />
          <stop offset="1" className="mt-fade-1" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#mt-sky)" />
      <rect width={W} height={H} fill="url(#mt-glow)" />
      {ridges.map((r, i) => (
        <g key={r.cls}>
          <path d={r.d} className={r.cls} />
          {i < 4 && <rect x="0" y={500 + i * 75} width={W} height="90" fill="url(#mt-mist)" className="mt-mist" />}
        </g>
      ))}
      {/* Bottom of the scene melts into the page */}
      <rect width={W} height={H} fill="url(#mt-fade)" />
    </svg>
  );
}
