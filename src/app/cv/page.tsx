import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { roles } from "@/data/roles";
import { layers } from "@/data/skills";
import { caseStudies } from "@/data/work";
import { allCredentials, flagshipCredentials } from "@/data/credentials";
import { SITE_URL } from "@/lib/site";
import { PrintButton } from "@/components/common/PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: "Dheeraj Kashyap, BI & Analytics Engineer: experience, selected projects, skills and certifications on one printable page.",
  alternates: { canonical: "/cv" },
};

const host = SITE_URL.replace(/^https?:\/\//, "");
const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

/**
 * A printable CV built from the same data as the site, so it never drifts
 * from the portfolio. On screen it is a document card with a print button;
 * printed (or saved as PDF) it is a plain A4 page with no site chrome.
 */
export default function CvPage() {
  const projects = caseStudies.filter((s) => s.featured);
  return (
    <div className="cv-wrap">
      <div className="container cv-tools">
        <Link href="/" className="link-arrow cs-back"><ArrowLeft size={16} aria-hidden /> Back to the site</Link>
        <PrintButton />
      </div>

      <article className="cv" aria-label="Curriculum vitae">
        <header className="cv-head">
          <div>
            <h1 className="cv-name">{profile.name}</h1>
            <p className="cv-role">BI &amp; Analytics Engineer · Power BI · Microsoft Fabric</p>
          </div>
          <ul className="cv-contact">
            <li>Bengaluru, India · Remote</li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.linkedinUrl}>{strip(profile.linkedinUrl)}</a></li>
            <li><a href={profile.githubUrl}>{strip(profile.githubUrl)}</a></li>
            <li><a href={SITE_URL}>{host}</a></li>
          </ul>
        </header>

        <section className="cv-section">
          <h2>Profile</h2>
          <p>
            BI &amp; Analytics Engineer with 7+ years in enterprise reporting, semantic modelling and modern
            data platforms. I design semantic models, build data pipelines and deliver reporting systems for
            finance, operations, sales and executive teams, from support-floor reporting, to risk and fraud
            analytics at Amazon, to Fabric lakehouse platforms for clients across 15 countries.
            {" "}{allCredentials.length} certifications across Microsoft, Databricks, Snowflake and Astronomer.
          </p>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {roles.map((r) => (
            <div key={r.company} className="cv-role-block">
              <div className="cv-row">
                <h3>{r.title} · <span>{r.company}</span></h3>
                <p className="cv-when">{r.start} – {r.end} · {r.location}</p>
              </div>
              <p className="cv-summary">{r.summary}</p>
              <p className="cv-impact">
                {r.impact.map((m, k) => (
                  <span key={m.label}>{k > 0 && " · "}<strong>{m.value}</strong> {m.label}</span>
                ))}
              </p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Selected projects</h2>
          <ul className="cv-projects">
            {projects.map((s) => (
              <li key={s.slug}>
                <strong>{s.title}</strong>: {s.impact[0].value} {s.impact[0].label.toLowerCase()}.{" "}
                <span className="cv-muted">{s.stack.slice(0, 4).join(", ")}.</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="cv-cols">
          <section className="cv-section">
            <h2>Skills</h2>
            <dl className="cv-skills">
              {layers.map((l) => (
                <div key={l.tag}><dt>{l.tag}</dt><dd>{l.items.join(", ")}</dd></div>
              ))}
            </dl>
          </section>

          <section className="cv-section">
            <h2>Certifications</h2>
            <ul className="cv-certs">
              {flagshipCredentials.map((c) => (
                <li key={c.code}><strong>{c.code}</strong> {c.name} <span className="cv-muted">· {c.issuer}, {c.earned}</span></li>
              ))}
            </ul>
            <p className="cv-muted cv-more">
              Plus {allCredentials.length - flagshipCredentials.length} more: {allCredentials.filter((c) => !c.flagship).map((c) => c.code).join(", ")}.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
