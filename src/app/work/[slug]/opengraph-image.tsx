import { ImageResponse } from "next/og";
import { caseStudies, getStudy } from "@/data/work";
import { OG, OG_SIZE, OgFrame, OgTopBar } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Dheeraj Kashyap";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

/** Link preview for one case study: its title, headline result and stack. */
export default async function CaseStudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStudy(slug) ?? caseStudies[0];
  const [headline, ...rest] = s.impact;
  return new ImageResponse(
    (
      <OgFrame>
        <OgTopBar tag="Case study" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: "22px", letterSpacing: "3px", textTransform: "uppercase", color: OG.gold }}>
            {s.domain} · {s.type}
          </div>
          <div style={{ display: "flex", fontSize: s.title.length > 40 ? "60px" : "70px", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.04, maxWidth: "1020px" }}>
            {s.title}
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px", padding: "20px 26px", borderRadius: "16px", background: OG.wine, width: "420px" }}>
            <div style={{ display: "flex", fontSize: "48px", fontWeight: 800, letterSpacing: "-1.5px" }}>{headline.value}</div>
            <div style={{ display: "flex", fontSize: "21px", color: OG.soft }}>{headline.label}</div>
          </div>
          {rest.slice(0, 2).map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px", padding: "20px 24px", borderRadius: "16px", border: `1px solid ${OG.line}`, background: OG.panel, width: "300px" }}>
              <div style={{ display: "flex", fontSize: "38px", fontWeight: 800, color: OG.gold, letterSpacing: "-1px" }}>{m.value}</div>
              <div style={{ display: "flex", fontSize: "19px", color: OG.ink }}>{m.label}</div>
            </div>
          ))}
        </div>
      </OgFrame>
    ),
    size,
  );
}
