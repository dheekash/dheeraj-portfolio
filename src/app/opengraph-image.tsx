import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";
import { LOGO_SRC } from "@/lib/og";

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
          background: "#000000",
          fontFamily: "system-ui, sans-serif",
          color: "#FFFFFF",
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
            background: "radial-gradient(circle, rgba(128, 82, 255,0.38) 0%, rgba(128, 82, 255,0) 70%)",
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
            background: "radial-gradient(circle, rgba(128, 82, 255,0.18) 0%, rgba(128, 82, 255,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} width={165} height={56} alt="" />
            <div style={{ display: "flex", fontSize: "22px", color: "#BDBDBD" }}>{host}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "20px",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E", display: "flex" }} />
            Open to opportunities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: "84px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            Dheeraj Kashyap<span style={{ color: "#8052FF" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: "#EDEDED", maxWidth: "980px", lineHeight: 1.3 }}>
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
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                width: "300px",
              }}
            >
              <div style={{ display: "flex", fontSize: "40px", fontWeight: 800, color: "#FFB829", letterSpacing: "-1px" }}>{r.value}</div>
              <div style={{ display: "flex", fontSize: "20px", color: "#FFFFFF" }}>{r.label}</div>
              <div style={{ display: "flex", fontSize: "17px", color: "#BDBDBD" }}>{r.from}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
