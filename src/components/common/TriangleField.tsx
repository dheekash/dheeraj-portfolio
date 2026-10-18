/**
 * A field of small outlined triangles, the Void theme's constellation motif,
 * as static SVG. Positions come from a seeded generator, so the markup is
 * identical on the server and in the browser. Colours are classes (t1–t6),
 * set per theme in globals.css; `main` biases most triangles to one colour.
 *
 * shape "cluster" gathers them around (cx, cy) as fractions of the box;
 * "field" spreads them across it, in three groups that can drift at
 * different speeds (.tf-g1–3).
 */
export function TriangleField({
  seed,
  count,
  width,
  height,
  shape = "cluster",
  cx = 0.5,
  cy = 0.5,
  main,
  className,
}: {
  seed: number;
  count: number;
  width: number;
  height: number;
  shape?: "cluster" | "field";
  cx?: number;
  cy?: number;
  main?: number;
  className?: string;
}) {
  // Mulberry32: small, fast, deterministic.
  let a = seed >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) * 2;

  const groups: string[][] = [[], [], []];
  for (let i = 0; i < count; i++) {
    const x = shape === "cluster" ? width * cx + gauss() * width * 0.16 : rnd() * width;
    const y = shape === "cluster" ? height * cy + gauss() * height * 0.16 : rnd() * height;
    const s = 2.4 + rnd() * 3.6;
    const r = rnd() * Math.PI * 2;
    const pts = [0, 1, 2].map((k) => {
      const ang = r + (k * 2 * Math.PI) / 3;
      return `${(x + Math.cos(ang) * s).toFixed(1)},${(y + Math.sin(ang) * s).toFixed(1)}`;
    }).join(" ");
    const c = main && rnd() < 0.7 ? main : 1 + Math.floor(rnd() * 6);
    const o = (0.35 + rnd() * 0.65).toFixed(2);
    groups[i % 3].push(`<polygon class="t${c}" points="${pts}" opacity="${o}"/>`);
  }

  return (
    <svg
      className={`tf ${className ?? ""}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={shape === "field" ? "xMidYMid slice" : "xMidYMid meet"}
      aria-hidden
      focusable="false"
      dangerouslySetInnerHTML={{ __html: groups.map((g, i) => `<g class="tf-g${i + 1}">${g.join("")}</g>`).join("") }}
    />
  );
}
