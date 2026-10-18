/* Shared pieces for the link-preview images (Open Graph): the {DK} logo,
   the Void palette's colours and the backdrop, so every page's card
   matches. Colours are literal here because the images are rendered on the
   server, outside the page's CSS. */
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG = {
  ink: "#FFFFFF",
  muted: "#BDBDBD",
  soft: "#EDEDED",
  amber: "#FFB829",
  iris: "#8052FF",
  panel: "rgba(255,255,255,0.05)",
  line: "rgba(255,255,255,0.14)",
};
export const OG_HOST = SITE_URL.replace(/^https?:\/\//, "");

const db = (cx: number, top: number, bottom: number, body: string, cap: string) => {
  const l = cx - 7, r = cx + 7, s = (bottom - top) / 3;
  return `<g stroke="#000000" stroke-width="1"><path d="M${l} ${top}V${bottom}A7 2.4 0 0 0 ${r} ${bottom}V${top}Z" fill="${body}"/><ellipse cx="${cx}" cy="${top}" rx="7" ry="2.4" fill="${cap}"/><path d="M${l} ${top + s}A7 2.4 0 0 0 ${r} ${top + s}M${l} ${top + 2 * s}A7 2.4 0 0 0 ${r} ${top + 2 * s}" fill="none" stroke-width="1.3"/></g>`;
};

/** The {DK} wordmark from components/common/Logo.tsx, dark-ground colours. */
export const LOGO_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 40"><g fill="none" stroke="#FFB829" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5C7 5 6.5 7 6.5 10.5V15.5C6.5 18 5.5 20 2.5 20C5.5 20 6.5 22 6.5 24.5V29.5C6.5 33 7 35 11 35"/><path d="M107 5C111 5 111.5 7 111.5 10.5V15.5C111.5 18 112.5 20 115.5 20C112.5 20 111.5 22 111.5 24.5V29.5C111.5 33 111 35 107 35"/></g><path d="M16 4H31A16 16 0 0 1 31 36H16ZM24.5 11V29H30.5A7 9 0 0 0 30.5 11Z" fill="#8052FF" fill-rule="evenodd"/>${db(31, 12, 28, "#FFFFFF", "#FFFFFF")}<path d="M52 4H61V17L73 4H85L70 19.5L86.5 36H74.5L64 25.3L61 28.4V36H52Z" fill="#FFFFFF"/>${db(94, 16, 31, "#8052FF", "#FFB829")}</svg>`,
  );

/** Black backdrop with two soft iris glows; children are laid out top to bottom. */
export function OgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#000000",
        fontFamily: "system-ui, sans-serif",
        color: OG.ink,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: "-160px", bottom: "-220px", width: "720px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle, rgba(128,82,255,0.38) 0%, rgba(128,82,255,0) 70%)", display: "flex" }} />
      <div style={{ position: "absolute", right: "-120px", top: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(128,82,255,0.18) 0%, rgba(128,82,255,0) 70%)", display: "flex" }} />
      {children}
    </div>
  );
}

/** Logo and site address on the left, an optional tag on the right. */
export function OgTopBar({ tag }: { tag?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} width={165} height={56} alt="" />
        <div style={{ display: "flex", fontSize: "22px", color: OG.muted }}>{OG_HOST}</div>
      </div>
      {tag && (
        <div style={{ display: "flex", alignItems: "center", padding: "8px 18px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)", fontSize: "20px" }}>
          {tag}
        </div>
      )}
    </div>
  );
}
