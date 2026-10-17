import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { CountUp } from "@/components/common/CountUp";
import { allCredentials } from "@/data/credentials";
import { HeroFlow } from "@/components/sections/HeroFlow";

/* Headshot sits beside the availability line once public/images/avatar.jpg exists. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));
/* Portrait shown beside the name. */
const PORTRAIT = "/images/portrait.webp";

/* Two facts under the portrait. Project results live on the project cards. */
const facts = [
  { value: "7+", label: "Years experience" },
  { value: String(allCredentials.length), label: "Certifications" },
];

/**
 * Compact hero: who and what on the left, the proof on the right, both in
 * the first screen. Tools are shown once, further down, in Technologies.
 */
export function Hero() {
  return (
    <section id="top" className="fx-hero hx" aria-labelledby="hero-title">
      <div className="container hx-grid">
        <div className="hx-copy">
          <p className="fx-status hero-anim" style={{ "--d": 0 } as React.CSSProperties}>
            {hasPhoto && <Image src={PHOTO} alt="" width={36} height={36} className="fx-avatar" />}
            <span className="fx-status-dot" aria-hidden />
            Open to opportunities<span className="fx-status-loc"> · Bengaluru · Remote</span>
          </p>
          <p className="fx-hello hero-anim" style={{ "--d": 1 } as React.CSSProperties}>Hi, I&rsquo;m</p>
          {/* Each line rises out of its own mask, one after the other. */}
          <h1 id="hero-title" className="fx-name hx-name">
            <span className="fx-name-line"><span className="hx-rise" style={{ "--d": 2 } as React.CSSProperties}>Dheeraj</span></span>
            <span className="fx-name-line"><span className="hx-rise" style={{ "--d": 3 } as React.CSSProperties}>Kashyap</span></span>
          </h1>
          <p className="fx-lede hx-lede hero-anim" style={{ "--d": 4 } as React.CSSProperties}>
            I build BI systems that cut reporting from hours to minutes, with{" "}
            <span className="hl">Power BI</span> and <span className="hl">Microsoft Fabric</span>.
          </p>
          <p className="fx-cred hero-anim" style={{ "--d": 5 } as React.CSSProperties}>
            BI &amp; Analytics Engineer · 7+ years · {allCredentials.length} certifications incl. Microsoft DP-600 &amp; DP-700
          </p>
          <div className="fx-actions hx-actions hero-anim" style={{ "--d": 6 } as React.CSSProperties}>
            <a href="#contact" className="btn btn-primary">
              Contact me <ArrowRight size={16} aria-hidden />
            </a>
            <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Download size={16} aria-hidden /> Download CV
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="GitHub profile (opens in a new tab)" title="GitHub">
              <Mark name="GitHub" size={20} />
            </a>
          </div>
        </div>

        {/* Portrait, with two facts in aligned cards beneath it. */}
        <div className="hx-visual">
          <div className="hx-photo" style={{ "--d": 3 } as React.CSSProperties}>
            <Image
              src={PORTRAIT}
              alt="Dheeraj Kashyap"
              width={1000}
              height={1340}
              priority
              sizes="(min-width: 1024px) 340px, 68vw"
            />
          </div>
        <dl className="hx-facts hero-anim" style={{ "--d": 7 } as React.CSSProperties}>
          {facts.map((f, i) => (
            <div key={f.label} className="hx-fact">
              <dt>{f.label}</dt>
              <dd><CountUp value={f.value} delay={400 + i * 120} /></dd>
            </div>
          ))}
        </dl>
        </div>
      </div>
      <HeroFlow />
    </section>
  );
}
