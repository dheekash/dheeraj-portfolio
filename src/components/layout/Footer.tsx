import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { Mark } from "@/components/common/Mark";
import { Logo } from "@/components/common/Logo";
import { Scribble } from "@/components/common/Scribble";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmail } from "@/components/layout/CopyEmail";

const mail = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

/**
 * Contact, centred: heading, direct routes (email, LinkedIn, GitHub, CV),
 * then a short form. A small footer line closes the page.
 */
export function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  /* Build date: the site is static, so this is when it was last published. */
  const updated = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <footer id="contact" className="band sx-contact" aria-labelledby="contact-title">
      <div className="container sx-contact-inner">
        <header className="sx-head is-center reveal">
          <p className="sx-eyebrow">Get in touch</p>
          <h2 id="contact-title" className="sx-title fx-together">
            Let&rsquo;s work <Scribble>together</Scribble>
            <span className="sx-dot">.</span>
          </h2>
          <p className="sx-intro">
            Open to full-time BI roles and consulting. Let&rsquo;s talk about the architecture, the
            dashboard, or everything in between. I usually reply within 24 hours.
          </p>
        </header>

        <div className="contact-ctas sx-contact-ctas">
          <a href={mail("Hello from your portfolio")} className="btn btn-primary">
            <Mail size={16} aria-hidden /> Email me
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary icon-btn">
            <LinkedinIcon size={16} className="mark" /> LinkedIn <ArrowUpRight size={14} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary icon-btn">
            <Mark name="GitHub" size={16} /> GitHub <ArrowUpRight size={14} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary icon-btn">
            <FileText size={16} aria-hidden className="mark" /> CV <ArrowUpRight size={14} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="contact-email sx-contact-email">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyEmail email={profile.email} />
        </div>

        <div className="sx-contact-form">
          <ContactForm />
        </div>

        <div className="footer-bar sx-footer-bar">
          <span className="footer-id">
            <Logo size={28} />
            <span>© {year} Dheeraj Kashyap · Bengaluru, India · Updated {updated}</span>
          </span>
          <nav aria-label="Footer">
            <Link href="/#about">About</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#work">Projects</Link>
            <Link href="/certifications">Certifications</Link>
          </nav>
        </div>
      </div>
      <p className="fx-wordmark" aria-hidden>Kashyap</p>
    </footer>
  );
}
