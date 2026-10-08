/**
 * {DK} wordmark: a D holding a gold database, a gold K, and a white
 * database, between code braces. Drawn as shapes, not type, so it has no
 * font dependency and no background box. Braces take their colour from
 * CSS (--logo-brace) so they read on both light and dark grounds.
 * Keep the letterforms in sync with src/app/icon.svg.
 */
export const LOGO_RATIO = 118 / 40;

function Db({ cx, top, bottom, body, cap }: { cx: number; top: number; bottom: number; body: string; cap: string }) {
  const rx = 7;
  const ry = 2.4;
  const l = cx - rx;
  const r = cx + rx;
  const step = (bottom - top) / 3;
  return (
    <g stroke="#1B1F25" strokeWidth="1">
      <path d={`M${l} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${r} ${bottom}V${top}Z`} fill={body} />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={cap} />
      <path d={`M${l} ${top + step}A${rx} ${ry} 0 0 0 ${r} ${top + step}M${l} ${top + 2 * step}A${rx} ${ry} 0 0 0 ${r} ${top + 2 * step}`} fill="none" strokeWidth="1.3" />
    </g>
  );
}

export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 118 40"
      width={Math.round(size * LOGO_RATIO)}
      height={size}
      className={`logo ${className}`.trim()}
      aria-hidden
      focusable="false"
    >
      <g className="logo-brace" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5C7 5 6.5 7 6.5 10.5V15.5C6.5 18 5.5 20 2.5 20C5.5 20 6.5 22 6.5 24.5V29.5C6.5 33 7 35 11 35" />
        <path d="M107 5C111 5 111.5 7 111.5 10.5V15.5C111.5 18 112.5 20 115.5 20C112.5 20 111.5 22 111.5 24.5V29.5C111.5 33 111 35 107 35" />
      </g>
      <path
        d="M16 4H31A16 16 0 0 1 31 36H16ZM24.5 11V29H30.5A7 9 0 0 0 30.5 11Z"
        fill="#40464F"
        fillRule="evenodd"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.6"
      />
      <Db cx={31} top={12} bottom={28} body="#F5AF1B" cap="#FFD873" />
      <path d="M52 4H61V17L73 4H85L70 19.5L86.5 36H74.5L64 25.3L61 28.4V36H52Z" fill="#F7AE1D" />
      <Db cx={94} top={16} bottom={31} body="#ECEEF1" cap="#FFFFFF" />
    </svg>
  );
}
