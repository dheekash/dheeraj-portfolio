import { ImageResponse } from "next/og";
import { allCredentials, flagshipCredentials, issuerList } from "@/data/credentials";
import { OG, OG_SIZE, OgFrame, OgTopBar } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Dheeraj Kashyap's certifications";

/** Link preview for the certifications page: the count, issuers and key codes. */
export default function CertificationsImage() {
  return new ImageResponse(
    (
      <OgFrame>
        <OgTopBar tag="Certifications" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "24px" }}>
            <div style={{ display: "flex", fontSize: "150px", fontWeight: 800, letterSpacing: "-6px", lineHeight: 0.9, color: OG.amber }}>{allCredentials.length}</div>
            <div style={{ display: "flex", fontSize: "56px", fontWeight: 800, letterSpacing: "-2px" }}>certifications</div>
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: OG.soft }}>From {issuerList}.</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", maxWidth: "1060px" }}>
          {flagshipCredentials.map((c) => (
            <div key={c.code} style={{ display: "flex", padding: "10px 18px", borderRadius: "12px", border: `1px solid ${OG.line}`, background: OG.panel, fontSize: "24px", fontWeight: 700 }}>
              {c.code}
            </div>
          ))}
        </div>
      </OgFrame>
    ),
    size,
  );
}
