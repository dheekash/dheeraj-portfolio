/* Shared pieces for the link-preview images (Open Graph): the {DK} logo,
   the Timeless luxury colours and the backdrop, so every page's card
   matches. Colours are literal here because the images are rendered on the
   server, outside the page's CSS. */
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG = {
  ink: "#FFF4E6",
  muted: "#C9B8AE",
  soft: "#F3E6D5",
  gold: "#D9B061",
  wine: "#800020",
  panel: "rgba(36,18,23,0.78)",
  line: "rgba(217,176,97,0.3)",
};
export const OG_HOST = SITE_URL.replace(/^https?:\/\//, "");

const db = (cx: number, top: number, bottom: number, body: string, cap: string) => {
  const l = cx - 7, r = cx + 7, s = (bottom - top) / 3;
  return `<g stroke="#2A1519" stroke-width="1"><path d="M${l} ${top}V${bottom}A7 2.4 0 0 0 ${r} ${bottom}V${top}Z" fill="${body}"/><ellipse cx="${cx}" cy="${top}" rx="7" ry="2.4" fill="${cap}"/><path d="M${l} ${top + s}A7 2.4 0 0 0 ${r} ${top + s}M${l} ${top + 2 * s}A7 2.4 0 0 0 ${r} ${top + 2 * s}" fill="none" stroke-width="1.3"/></g>`;
};

/** The {DK} wordmark from components/common/Logo.tsx, dark-ground colours. */
export const LOGO_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 40"><g fill="none" stroke="#D9B061" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5C7 5 6.5 7 6.5 10.5V15.5C6.5 18 5.5 20 2.5 20C5.5 20 6.5 22 6.5 24.5V29.5C6.5 33 7 35 11 35"/><path d="M107 5C111 5 111.5 7 111.5 10.5V15.5C111.5 18 112.5 20 115.5 20C112.5 20 111.5 22 111.5 24.5V29.5C111.5 33 111 35 107 35"/></g><path d="M16 4H31A16 16 0 0 1 31 36H16ZM24.5 11V29H30.5A7 9 0 0 0 30.5 11Z" fill="#800020" fill-rule="evenodd"/>${db(31, 12, 28, "#FFF4E6", "#FFFFFF")}<path d="M52 4H61V17L73 4H85L70 19.5L86.5 36H74.5L64 25.3L61 28.4V36H52Z" fill="#FFF4E6"/>${db(94, 16, 31, "#800020", "#D9B061")}</svg>`,
  );

/** Wine backdrop with two soft glows; children are laid out top to bottom. */
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
        background: "linear-gradient(160deg, #2A1519 0%, #160B0E 70%)",
        fontFamily: "system-ui, sans-serif",
        color: OG.ink,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: "-160px", bottom: "-220px", width: "720px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle, rgba(128,0,32,0.6) 0%, rgba(128,0,32,0) 70%)", display: "flex" }} />
      <div style={{ position: "absolute", right: "-120px", top: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(128,0,32,0.22) 0%, rgba(128,0,32,0) 70%)", display: "flex" }} />
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
        <div style={{ display: "flex", alignItems: "center", padding: "8px 18px", borderRadius: "999px", border: "1px solid rgba(201,184,174,0.35)", fontSize: "20px" }}>
          {tag}
        </div>
      )}
    </div>
  );
}
