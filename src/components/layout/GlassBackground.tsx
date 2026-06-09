/**
 * GlassBackground — quiet editorial backdrop.
 * Server component — zero JS, pure CSS.
 * Sits at z-index:-10, behind all page content.
 */
export function GlassBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Base (dark) — near-black with faint top wash ── */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(180deg, #0E1014 0%, #0B0C0F 30%, #0B0C0F 100%)",
        }}
      />
      {/* ── Base (light) — warm paper ── */}
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FAFAF7 25%, #FAFAF7 100%)",
        }}
      />

      {/* ── Single restrained accent wash, top edge ── */}
      <div
        className="absolute -top-64 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full blur-[140px] dark:opacity-[0.07] opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse, #1D4ED8 0%, transparent 70%)",
        }}
      />

      {/* ── Fine dot grid ── */}
      <div
        className="absolute inset-0 dark:opacity-[0.04] opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          color: "var(--foreground)",
          maskImage:
            "linear-gradient(180deg, black 0%, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
