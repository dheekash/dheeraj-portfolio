import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { CountUp } from "@/components/common/CountUp";

/* Headshot sits beside the availability line once public/images/avatar.jpg exists. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

/* Results from the case studies, written so each reads on its own. */
const results = [
  { value: "<1%", label: "Pipeline failures", from: "down from 12%" },
  { value: "<5 min", label: "Fraud detection", from: "down from 24 hrs" },
  { value: "15 min", label: "Report refresh", from: "down from 4 hrs" },
  { value: "−70%", label: "Manual reporting effort", from: "self-serve Power BI" },
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
            Open to opportunities · Bengaluru · Remote
          </p>
          <p className="fx-hello hero-anim" style={{ "--d": 1 } as React.CSSProperties}>Hi, I&rsquo;m</p>
          <h1 id="hero-title" className="fx-name hx-name hero-anim" style={{ "--d": 1 } as React.CSSProperties}>
            <span className="fx-name-line">Dheeraj</span>
            <span className="fx-name-line">Kashyap</span>
          </h1>
          <p className="fx-lede hx-lede hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
            I build BI systems that cut reporting from hours to minutes, with{" "}
            <span className="hl">Power BI</span> and <span className="hl">Microsoft Fabric</span>.
          </p>
          <p className="fx-cred hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
            BI &amp; Analytics Engineer · 7+ years · 13 certifications incl. Microsoft DP-600 &amp; DP-700
          </p>
          <div className="fx-actions hx-actions hero-anim" style={{ "--d": 3 } as React.CSSProperties}>
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

        <dl className="fx-metrics hx-metrics hero-anim" style={{ "--d": 3 } as React.CSSProperties} aria-label="Key results">
          {results.map((r, i) => (
            <div key={r.label} className="fx-metric">
              <dt className="sr-only">{r.label}, {r.from}</dt>
              <dd>
                <span className="fx-metric-value">
                  <CountUp value={r.value} delay={400 + i * 120} />
                </span>
                <span className="fx-metric-label" aria-hidden>{r.label}</span>
                <span className="fx-metric-from" aria-hidden>{r.from}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
