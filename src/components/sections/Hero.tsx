import { ArrowRight } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { RotatingWords } from "@/components/common/RotatingWords";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";
import { allCredentials } from "@/data/credentials";
import { caseStudies, metaOf } from "@/data/work";
import { leadOf, ratioOf } from "@/lib/results";
import { ReportCanvas, type ReportStudy } from "@/components/sections/ReportCanvas";

/* Short slicer labels for the featured studies. */
const TAB: Record<string, string> = {
  "fabric-lakehouse-migration": "Fabric migration",
  "seller-analytics-platform": "Seller analytics",
  "manufacturing-analytics-suite": "Rockwool",
  "real-time-fraud-monitoring": "Fraud monitoring",
};

const kpis = [
  { value: "7+", label: "Years" },
  { value: String(allCredentials.length), label: "Certifications" },
  { value: "15", label: "Markets" },
  { value: String(caseStudies.length), label: "Case studies" },
];

const studies: ReportStudy[] = caseStudies
  .filter((s) => s.featured)
  .slice(0, 4)
  .map((s) => {
    const [lead, ...more] = s.impact;
    return {
      slug: s.slug,
      tab: TAB[s.slug] ?? s.title,
      title: s.title,
      meta: metaOf(s),
      lead: { ...lead, ratio: ratioOf(lead.value) },
      more: more.slice(0, 2),
      mark: <Mark name={leadOf[s.slug]} size={18} />,
    };
  });

/**
 * The hero as a report page: who and what on the left; on the right a live
 * "impact report" built from the portfolio's own figures, with a slicer
 * across the featured case studies. It shows the work instead of
 * describing it.
 */
export function Hero() {
  return (
    <section id="top" className="rh" aria-labelledby="hero-title">
      <div className="container rh-grid">
        <div className="rh-copy">
          <p className="rh-status">
            <span className="fx-status-dot" aria-hidden />
            Open to opportunities<span className="rh-status-loc"> · Bengaluru · Remote</span>
          </p>
          <h1 id="hero-title" className="rh-name">
            Dheeraj Kashyap
          </h1>
          <p className="rh-role">BI &amp; Analytics Engineer</p>
          <p className="rh-lede">
            I build reporting that cuts hours to minutes, with{" "}
            <RotatingWords words={["Power BI", "Microsoft Fabric", "Snowflake", "Databricks"]} suffix="." className="hl" />
          </p>
          <div className="rh-actions">
            <a href="#contact" className="btn btn-primary">
              Contact me <ArrowRight size={16} aria-hidden />
            </a>
            <DownloadButton />
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn">
              <LinkedinIcon size={20} />
              <span className="hx-icon-label">LinkedIn</span>
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="GitHub profile (opens in a new tab)" title="GitHub">
              <Mark name="GitHub" size={20} />
              <span className="hx-icon-label">GitHub</span>
            </a>
          </div>
        </div>

        <ReportCanvas kpis={kpis} studies={studies} />
      </div>
    </section>
  );
}
