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
          background: "linear-gradient(160deg, #021861 0%, #020B2B 70%)",
          fontFamily: "system-ui, sans-serif",
          color: "#F3F6FF",
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
            background: "radial-gradient(circle, rgba(37,93,206,0.55) 0%, rgba(37,93,206,0) 70%)",
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
            background: "radial-gradient(circle, rgba(222,17,16,0.18) 0%, rgba(222,17,16,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#255DCE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 800,
                position: "relative",
              }}
            >
              DK
              <div style={{ position: "absolute", top: "9px", right: "9px", width: "9px", height: "9px", borderRadius: "50%", background: "#DE1110", display: "flex" }} />
            </div>
            <div style={{ display: "flex", fontSize: "22px", color: "#A9B6DA" }}>{host}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(169,182,218,0.35)",
              fontSize: "20px",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E", display: "flex" }} />
            Open to opportunities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: "84px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            Dheeraj Kashyap<span style={{ color: "#DE1110" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: "#DCE4FA", maxWidth: "980px", lineHeight: 1.3 }}>
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
                border: "1px solid rgba(143,176,245,0.28)",
                background: "rgba(7,22,69,0.7)",
                width: "300px",
              }}
            >
              <div style={{ display: "flex", fontSize: "40px", fontWeight: 800, color: "#8FB0F5", letterSpacing: "-1px" }}>{r.value}</div>
              <div style={{ display: "flex", fontSize: "20px", color: "#F3F6FF" }}>{r.label}</div>
              <div style={{ display: "flex", fontSize: "17px", color: "#A9B6DA" }}>{r.from}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
