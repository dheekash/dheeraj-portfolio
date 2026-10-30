"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/* Shapes for the switch's sky: three cloud puffs per layer and four stars. */
const CLOUD = "M7 17a5 5 0 0 1 .9-9.9A6.5 6.5 0 0 1 20.4 9 4 4 0 0 1 20 17Z";
const STAR = "M12 1.5 13.9 10.1 22.5 12 13.9 13.9 12 22.5 10.1 13.9 1.5 12 10.1 10.1Z";

/**
 * Light/dark switch drawn as a sky (after a Uiverse.io switch by
 * RiccardoRapelli): a daytime sky with drifting clouds and a sun, which
 * slides across, turns into a cratered moon and brings out twinkling stars.
 * A real switch for assistive tech (role="switch", aria-checked = dark).
 */
export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="tsw"
      onClick={toggle}
    >
      <span className="tsw-sky" aria-hidden>
        <span className="tsw-orb">
          <span className="tsw-ray tsw-ray-1" />
          <span className="tsw-ray tsw-ray-2" />
          <span className="tsw-ray tsw-ray-3" />
          <span className="tsw-dot tsw-dot-1" />
          <span className="tsw-dot tsw-dot-2" />
          <span className="tsw-dot tsw-dot-3" />
        </span>
        <svg className="tsw-clouds tsw-clouds-back" viewBox="0 0 60 34">
          <path d={CLOUD} transform="translate(30 10) scale(1.5)" />
          <path d={CLOUD} transform="translate(44 4) scale(0.9)" />
          <path d={CLOUD} transform="translate(16 18) scale(1.2)" />
        </svg>
        <svg className="tsw-clouds tsw-clouds-front" viewBox="0 0 60 34">
          <path d={CLOUD} transform="translate(36 14) scale(1.5)" />
          <path d={CLOUD} transform="translate(48 9) scale(0.9)" />
          <path d={CLOUD} transform="translate(22 21) scale(1.2)" />
        </svg>
        <svg className="tsw-stars" viewBox="0 0 60 34">
          <path className="tsw-star" d={STAR} transform="translate(3 2) scale(0.55)" />
          <path className="tsw-star" d={STAR} transform="translate(4 17) scale(0.25)" />
          <path className="tsw-star" d={STAR} transform="translate(11 21) scale(0.4)" />
          <path className="tsw-star" d={STAR} transform="translate(19 1) scale(0.5)" />
        </svg>
      </span>
    </button>
  );
}
