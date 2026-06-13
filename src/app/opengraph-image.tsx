import { ImageResponse } from "next/og";

export const alt = "Dheeraj Kashyap — Business Analyst & BI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0B0E14",
          fontFamily: "system-ui, sans-serif",
          color: "#ECEFF5",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue nebula glow — top-right */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(37,99,235,0.1) 50%, transparent 72%)",
            display: "flex",
          }}
        />
        {/* Secondary glow — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "120px",
            width: "380px",
            height: "280px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Subtle dot-grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            display: "flex",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            background:
              "linear-gradient(to bottom, transparent, #2563EB 25%, #60A5FA 75%, transparent)",
            display: "flex",
          }}
        />

        {/* Content layer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px 60px 84px",
            flex: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top: eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#2563EB",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#60A5FA",
                fontWeight: 600,
                display: "flex",
              }}
            >
              dheerajkashyap.com
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(96,165,250,0.2)",
                display: "flex",
              }}
            />
            <span style={{ fontSize: "14px", color: "#5A6478", display: "flex" }}>
              13× Certified
            </span>
          </div>

          {/* Center: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "76px",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "960px",
              }}
            >
              <span style={{ display: "flex" }}>Turning complex data into&nbsp;</span>
              <span style={{ display: "flex", color: "#60A5FA" }}>business growth.</span>
            </div>
            <div
              style={{
                fontSize: "26px",
                color: "#8B98B0",
                fontWeight: 400,
                display: "flex",
              }}
            >
              Dheeraj Kashyap · Business Analyst @ Amplify Analytix
            </div>
          </div>

          {/* Bottom: tech stack */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {["Power BI", "Microsoft Fabric", "Databricks", "Snowflake", "dbt"].map(
                (tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "6px 16px",
                      border: "1px solid rgba(96,165,250,0.22)",
                      borderRadius: "100px",
                      color: "#8B98B0",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                    }}
                  >
                    {tag}
                  </div>
                )
              )}
            </div>
            <span style={{ fontSize: "18px", color: "#3D4A5F", display: "flex" }}>
              Bengaluru · India
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
