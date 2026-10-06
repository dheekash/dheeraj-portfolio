/**
 * DK monogram. Drawn as strokes, not type, so it renders identically at
 * 16px in a browser tab and at 40px in the nav, with no font dependency.
 * The gold point at the end of the K's arm is a data point: the one accent.
 * Keep in sync with src/app/icon.svg.
 */
export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={`logo ${className}`.trim()}
      aria-hidden
      focusable="false"
    >
      <rect width="40" height="40" rx="10" fill="#3B3F9E" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 11.5v17h2.8a8.5 8.5 0 0 0 0-17z" />
        <path d="M24.5 11.5v17M24.5 21l6.5-9.5M27.1 17.2l4.4 11.3" />
      </g>
      <circle cx="31" cy="11.5" r="2.6" fill="#E6AD10" />
    </svg>
  );
}
