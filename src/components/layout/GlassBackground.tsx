/**
 * GlassBackground — fixed full-screen layered gradient + animated orbs.
 * Server component — zero JS, pure CSS animation.
 * Sits at z-index:-10, behind all page content.
 */
export function GlassBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Base gradient (dark) ── */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 140% 90% at 8% 18%, #0D2054 0%, #060D1F 42%, #03091A 100%)",
        }}
      />
      {/* ── Base gradient (light) ── */}
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 140% 90% at 8% 18%, #C7D9F8 0%, #EEF2FF 45%, #F0F7FF 100%)",
        }}
      />

      {/* ── Orb 1 — Blue, top-left ── */}
      <div
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-[130px] orb-animate-1 dark:opacity-[0.22] opacity-[0.28]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, #1D4ED8 55%, transparent 75%)",
        }}
      />

      {/* ── Orb 2 — Indigo/Violet, top-right ── */}
      <div
        className="absolute -top-24 -right-36 w-[560px] h-[560px] rounded-full blur-[110px] orb-animate-2 dark:opacity-[0.16] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, #4338CA 55%, transparent 75%)",
        }}
      />

      {/* ── Orb 3 — Amber/Gold, bottom-left ── */}
      <div
        className="absolute -bottom-20 -left-16 w-[480px] h-[480px] rounded-full blur-[100px] orb-animate-3 dark:opacity-[0.12] opacity-[0.14]"
        style={{
          background: "radial-gradient(circle, #F59E0B 0%, #D97706 55%, transparent 75%)",
        }}
      />

      {/* ── Orb 4 — Cyan, center-right ── */}
      <div
        className="absolute top-[38%] -right-20 w-[380px] h-[380px] rounded-full blur-[90px] orb-animate-2 dark:opacity-[0.09] opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #0EA5E9 0%, #0284C7 55%, transparent 75%)",
        }}
      />

      {/* ── Orb 5 — Violet, center-left ── */}
      <div
        className="absolute top-[55%] -left-24 w-[320px] h-[320px] rounded-full blur-[80px] orb-animate-1 dark:opacity-[0.08] opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, #6D28D9 55%, transparent 75%)",
          animationDelay: "8s",
        }}
      />

      {/* ── Subtle grid (dark only) ── */}
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(to right, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
