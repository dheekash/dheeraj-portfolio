import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt = "Dheeraj Kashyap, BI & Analytics Engineer: Power BI and Microsoft Fabric";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Link-preview card in the site's palette: navy ground, cobalt glow and
   figures, one red point. Figures match the home-page results. */
const results = [
  { value: "<1%", label: "Pipeline failures", from: "from 12%" },
  { value: "<5 min", label: "Fraud detection", from: "from 24 hrs" },
  { value: "15 min", label: "Report refresh", from: "from 4 hrs" },
];

/* The {DK} wordmark from components/common/Logo.tsx, dark-ground colours. */
const db = (cx: number, top: number, bottom: number, body: string, cap: string) => {
  const l = cx - 7, r = cx + 7, s = (bottom - top) / 3;
  return `<g stroke="#20231F" stroke-width="1"><path d="M${l} ${top}V${bottom}A7 2.4 0 0 0 ${r} ${bottom}V${top}Z" fill="${body}"/><ellipse cx="${cx}" cy="${top}" rx="7" ry="2.4" fill="${cap}"/><path d="M${l} ${top + s}A7 2.4 0 0 0 ${r} ${top + s}M${l} ${top + 2 * s}A7 2.4 0 0 0 ${r} ${top + 2 * s}" fill="none" stroke-width="1.3"/></g>`;
};
const LOGO_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 40"><g fill="none" stroke="#7CC8A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5C7 5 6.5 7 6.5 10.5V15.5C6.5 18 5.5 20 2.5 20C5.5 20 6.5 22 6.5 24.5V29.5C6.5 33 7 35 11 35"/><path d="M107 5C111 5 111.5 7 111.5 10.5V15.5C111.5 18 112.5 20 115.5 20C112.5 20 111.5 22 111.5 24.5V29.5C111.5 33 111 35 107 35"/></g><path d="M16 4H31A16 16 0 0 1 31 36H16ZM24.5 11V29H30.5A7 9 0 0 0 30.5 11Z" fill="#237A57" fill-rule="evenodd"/>${db(31, 12, 28, "#F4F2EC", "#FFFFFF")}<path d="M52 4H61V17L73 4H85L70 19.5L86.5 36H74.5L64 25.3L61 28.4V36H52Z" fill="#F4F2EC"/>${db(94, 16, 31, "#237A57", "#7CC8A3")}</svg>`,
  );

export default function OpengraphImage() {
  const host = SITE_URL.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #20231F 0%, #111310 70%)",
          fontFamily: "system-ui, sans-serif",
          color: "#F4F2EC",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-160px",
            bottom: "-220px",
            width: "720px",
            height: "620px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(35, 122, 87,0.55) 0%, rgba(35, 122, 87,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(35, 122, 87,0.18) 0%, rgba(35, 122, 87,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} width={165} height={56} alt="" />
            <div style={{ display: "flex", fontSize: "22px", color: "#B7B9B0" }}>{host}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(183,185,176,0.35)",
              fontSize: "20px",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E", display: "flex" }} />
            Open to opportunities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: "84px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            Dheeraj Kashyap<span style={{ color: "#237A57" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: "#E6E4DC", maxWidth: "980px", lineHeight: 1.3 }}>
            BI &amp; Analytics Engineer building Power BI and Microsoft Fabric systems that cut reporting from hours to minutes.
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px" }}>
          {results.map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "18px 22px",
                borderRadius: "16px",
                border: "1px solid rgba(124, 200, 163,0.28)",
                background: "rgba(25,28,24,0.75)",
                width: "300px",
              }}
            >
              <div style={{ display: "flex", fontSize: "40px", fontWeight: 800, color: "#7CC8A3", letterSpacing: "-1px" }}>{r.value}</div>
              <div style={{ display: "flex", fontSize: "20px", color: "#F4F2EC" }}>{r.label}</div>
              <div style={{ display: "flex", fontSize: "17px", color: "#B7B9B0" }}>{r.from}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
