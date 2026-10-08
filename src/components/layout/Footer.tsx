import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { Mark } from "@/components/common/Mark";
import { Logo } from "@/components/common/Logo";
import { Scribble } from "@/components/common/Scribble";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/work";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmail } from "@/components/layout/CopyEmail";

const mail = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

/**
 * One closing block: get in touch and the footer together. The pitch and
 * direct routes sit beside the form; the brand and site links share the
 * same panel below a hairline; a copyright bar ends the page. Each route
 * (email, LinkedIn, GitHub, CV) appears once.
 */
export function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  /* Build date: the site is static, so this is when it was last published. */
  const updated = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <footer id="contact" className="band sx-contact cf" aria-labelledby="contact-title">
      <div className="container cf-inner">
        <div className="cf-top">
          <div className="cf-pitch reveal">
            <p className="sx-eyebrow">Get in touch</p>
            <h2 id="contact-title" className="sx-title cf-title">
              Let&rsquo;s work <Scribble>together</Scribble>
              <span className="sx-dot">.</span>
            </h2>
            <p className="cf-intro">
              Open to full-time BI roles and consulting. Let&rsquo;s talk about the architecture, the
              dashboard, or everything in between. I usually reply within 24 hours.
            </p>

            <div className="contact-ctas cf-ctas">
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

            <div className="contact-email cf-email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <div className="cf-form reveal">
            <ContactForm />
          </div>
        </div>

        <div className="cf-links">
          <div className="fcol-brand">
            <p className="fcol-logo">
              <Logo size={28} />
              Dheeraj Kashyap
            </p>
            <p className="fcol-blurb">
              BI &amp; Analytics Engineer in Bengaluru, building Power BI and Microsoft Fabric
              systems that cut reporting from hours to minutes.
            </p>
          </div>

          <nav aria-labelledby="fcol-site">
            <h2 id="fcol-site">Site</h2>
            <ul>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#experience">Experience</Link></li>
              <li><Link href="/#skills">Technologies</Link></li>
              <li><Link href="/#work">Projects</Link></li>
              <li><Link href="/certifications">Certifications</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="fcol-work">
            <h2 id="fcol-work">Case studies</h2>
            <ul>
              {caseStudies.filter((s) => s.featured).map((s) => (
                <li key={s.slug}>
                  <Link href={`/work/${s.slug}`}>{s.title.replace(/, (Amazon|Rockwool)$/, "").replace(/ Platform$/, "")}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="fcol-base cf-base">
          <p>© {year} Dheeraj Kashyap · Bengaluru, India · Updated {updated}</p>
          <a href="#top" className="cf-top-link">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
