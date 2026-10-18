import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { SITE_URL, pageMeta } from "@/lib/site";
import { PrintButton } from "@/components/common/PrintButton";

export const metadata: Metadata = pageMeta({
  title: "CV",
  description: "Dheeraj Kashyap, Senior BI & Analytics Engineer: summary, skills, experience, projects, certifications and education, ready to print or save as PDF.",
  path: "/cv",
});

const host = SITE_URL.replace(/^https?:\/\//, "");
const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

/**
 * The résumé as a web page (src/data/resume.ts). On screen it is a document
 * card with a print button; printed or saved as PDF it is a plain A4
 * document with no site chrome.
 */
export default function CvPage() {
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
            {/* Each name stays whole; lines break only at the separators. */}
            <p className="cv-role">
              {[resume.headline, ...resume.tools].map((t, i) => (
                <span key={t}>{i > 0 && " · "}<span className="cv-nb">{t}</span></span>
              ))}
            </p>
          </div>
          <ul className="cv-contact">
            <li>{resume.location}</li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.linkedinUrl}>{strip(profile.linkedinUrl)}</a></li>
            <li><a href={profile.githubUrl}>{strip(profile.githubUrl)}</a></li>
            <li><a href={SITE_URL}>{host}</a></li>
          </ul>
        </header>

        <section className="cv-section">
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section className="cv-section">
          <h2>Skills</h2>
          <dl className="cv-skills">
            {resume.skills.map((s) => (
              <div key={s.area}><dt>{s.area}</dt><dd>{s.items}</dd></div>
            ))}
          </dl>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {resume.experience.map((r) => (
            <div key={r.title + r.start} className="cv-role-block">
              <div className="cv-row">
                <h3>{r.title}</h3>
                <p className="cv-when">{r.start} – {r.end}</p>
              </div>
              <p className="cv-org">{r.company} · {r.where}</p>
              <ul className="cv-bullets">
                {r.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Projects</h2>
          {resume.projects.map((p) => (
            <div key={p.name} className="cv-role-block">
              <div className="cv-row">
                <h3>{p.name} · <span>{p.client}</span></h3>
                <p className="cv-when">{p.year}</p>
              </div>
              <dl className="cv-kv">
                <div><dt>Tech</dt><dd>{p.tech}</dd></div>
                <div><dt>Impact</dt><dd>{p.impact}</dd></div>
              </dl>
            </div>
          ))}
        </section>

        <div className="cv-cols">
          <section className="cv-section">
            <h2>Certifications</h2>
            <ul className="cv-certs">
              {resume.certifications.map((c) => (
                <li key={c.name}>{c.name} <span className="cv-muted">· {c.issuer}, {c.year}</span></li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <h2>Education</h2>
            <ul className="cv-certs">
              {resume.education.map((e) => (
                <li key={e.degree}><strong>{e.degree}</strong><br /><span className="cv-muted">{e.school} · {e.years}</span></li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
