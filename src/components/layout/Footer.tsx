import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmail } from "@/components/layout/CopyEmail";

const mail = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

/**
 * The close: one dark band holding contact and the footer. Email is the
 * primary route and can be copied in one tap; the form is the fallback.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="band" aria-labelledby="contact-title">
      <div className="container" style={{ paddingTop: "var(--section-y)" }}>
        <div className="contact-grid">
          <div>
            <p className="label">Contact</p>
            <h2 id="contact-title" className="display-2" style={{ marginTop: 12 }}>
              Have a data problem worth solving?
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              I usually reply within 24 hours.
            </p>

            <div className="contact-email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail email={profile.email} />
            </div>

            <div className="paths">
              <div className="card path">
                <h3 className="title-3" style={{ fontSize: "1.125rem" }}>Full-time roles</h3>
                <p className="small">Senior BI, analytics engineering and Power BI / Fabric roles.</p>
                <a href={mail("Full-time opportunity")} className="btn btn-primary btn-sm">
                  Get in touch <ArrowRight size={16} aria-hidden />
                </a>
              </div>
              <div className="card path">
                <h3 className="title-3" style={{ fontSize: "1.125rem" }}>Consulting &amp; projects</h3>
                <p className="small">Fabric, Power BI and Databricks engagements, remote or Bengaluru.</p>
                <a href={mail("Consulting enquiry")} className="btn btn-secondary btn-sm">
                  Book a conversation <ArrowRight size={16} aria-hidden />
                </a>
              </div>
            </div>

            <div className="contact-links">
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                LinkedIn <ArrowUpRight size={16} className="arrow-out" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="link-arrow">
                Download résumé <ArrowUpRight size={16} className="arrow-out" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                GitHub <ArrowUpRight size={16} className="arrow-out" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="footer-bar">
          <span>© {year} Dheeraj Kashyap · Bengaluru, India</span>
          <nav aria-label="Footer">
            <Link href="/#work">Work</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#expertise">Expertise</Link>
            <Link href="/certifications">Certifications</Link>
            <Link href="/#about">About</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
