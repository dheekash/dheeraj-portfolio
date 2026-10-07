import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Mark } from "@/components/common/Mark";
import { Logo } from "@/components/common/Logo";
import { LinkedinIcon } from "@/components/common/SocialIcons";

/* The portrait renders once a file exists at public/images/avatar.jpg;
   until then the frame shows the DK monogram, never a broken image. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

const working = ["Power BI", "Microsoft Fabric", "SQL", "Snowflake", "Databricks", "Azure"];

export function Hero() {
  return (
    <section className="sx-hero" aria-labelledby="hero-title">
      <div className="container sx-hero-grid">
        <div className="sx-hero-copy">
          <span className="sx-hero-rail" aria-hidden />
          <h1 id="hero-title" className="sx-hero-title hero-anim" style={{ "--d": 0 } as React.CSSProperties}>
            Hi, I&rsquo;m
            <span className="sx-hero-name">Dheeraj</span>
          </h1>
          <p className="sx-hero-lede hero-anim" style={{ "--d": 1 } as React.CSSProperties}>
            <span className="hl">BI &amp; Analytics Engineer</span> building enterprise data systems
            with Power BI and Microsoft Fabric. 7+ years turning complex data into decision-ready
            reporting.
          </p>

          <div className="sx-hero-actions hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="LinkedIn (opens in a new tab)">
              <LinkedinIcon size={20} />
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="GitHub (opens in a new tab)">
              <Mark name="GitHub" size={20} />
            </a>
            <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-primary sx-cv">
              <Download size={16} aria-hidden /> Download CV
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <p className="sx-hero-working hero-anim" style={{ "--d": 3 } as React.CSSProperties}>
            {working.map((w) => (
              <span key={w} className="sx-tech" translate="no">
                <Mark name={w} size={16} />
                {w}
              </span>
            ))}
          </p>
        </div>

        <figure className={`sx-hero-photo hero-anim${hasPhoto ? "" : " is-placeholder"}`} style={{ "--d": 2 } as React.CSSProperties}>
          {hasPhoto ? (
            <Image src={PHOTO} alt="Dheeraj Kashyap" width={520} height={600} priority sizes="(min-width: 960px) 420px, 80vw" />
          ) : (
            <span className="sx-photo-placeholder" aria-hidden>
              <Logo size={120} />
            </span>
          )}
        </figure>
      </div>
    </section>
  );
}
