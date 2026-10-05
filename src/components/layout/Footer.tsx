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
  const now = new Date();
  const year = now.getFullYear();
  /* Build date: the site is static, so this is when it was last published. */
  const updated = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

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
              Let&rsquo;s talk about the architecture, the dashboard, or everything in between.
              Open to full-time roles and consulting. I usually reply within 24 hours.
            </p>

            <div className="contact-ctas">
              <a href={mail("Hello from your portfolio")} className="btn btn-primary">
                Email me <ArrowRight size={16} aria-hidden />
              </a>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                LinkedIn <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Download résumé <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <div className="contact-email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail email={profile.email} />
            </div>

            <p className="small" style={{ marginTop: 16 }}>
              Consulting enquiry?{" "}
              <a href={mail("Consulting enquiry")} className="inline-link">Email with the project details</a>
              {" "}and I&rsquo;ll suggest a time to talk. Also on{" "}
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-link">GitHub</a>.
            </p>
          </div>

          <ContactForm />
        </div>

        <div className="footer-bar">
          <span>
            © {year} Dheeraj Kashyap · Bengaluru, India · Portfolio updated {updated}
          </span>
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
