import { ImageResponse } from "next/og";
import { resume } from "@/data/resume";
import { OG, OG_SIZE, OgFrame, OgTopBar } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Dheeraj Kashyap, CV";

/** Link preview for the CV: name, headline, tools and the record in brief. */
export default function CvImage() {
  const facts = [
    { value: "7+", label: "Years in BI & analytics" },
    { value: String(resume.experience.filter((r) => !/^career break/i.test(r.title)).length), label: "Roles" },
    { value: String(resume.certifications.length), label: "Key certifications" },
  ];
  return new ImageResponse(
    (
      <OgFrame>
        <OgTopBar tag="CV" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: "84px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1 }}>
            Dheeraj Kashyap<span style={{ color: OG.iris }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: OG.soft }}>{resume.headline}</div>
          <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
            {resume.tools.map((t) => (
              <div key={t} style={{ display: "flex", padding: "6px 16px", borderRadius: "999px", border: `1px solid ${OG.line}`, fontSize: "20px", color: OG.amber }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px" }}>
          {facts.map((f) => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "18px 22px", borderRadius: "16px", border: `1px solid ${OG.line}`, background: OG.panel, width: "300px" }}>
              <div style={{ display: "flex", fontSize: "42px", fontWeight: 800, color: OG.amber, letterSpacing: "-1px" }}>{f.value}</div>
              <div style={{ display: "flex", fontSize: "20px", color: OG.ink }}>{f.label}</div>
            </div>
          ))}
        </div>
      </OgFrame>
    ),
    size,
  );
}
