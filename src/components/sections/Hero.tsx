import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { ParallaxField } from "@/components/common/ParallaxField";
import { CountUp } from "@/components/common/CountUp";

/* Headshot sits beside the availability line once public/images/avatar.jpg exists. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

/* Floating chips are tools only, three a side at matched heights, with
   rotations kept within ±3–6°. Results get their own row under the CTAs. */
const tools = [
  { name: "Power BI", x: 7, y: 26, depth: 1.2, rot: -5 },
  { name: "SQL", x: 3, y: 52, depth: 0.8, rot: 4 },
  { name: "Databricks", x: 8, y: 78, depth: 1.0, rot: -3 },
  { name: "Microsoft Fabric", x: 80, y: 26, depth: 0.9, rot: 5 },
  { name: "Snowflake", x: 86, y: 52, depth: 1.3, rot: -4 },
  { name: "Azure", x: 82, y: 78, depth: 1.1, rot: 3 },
];

/* Results from the case studies, written so each reads on its own. */
const results = [
  { value: "<1%", label: "Pipeline failures", from: "down from 12%" },
  { value: "<5 min", label: "Fraud detection", from: "down from 24 hrs" },
  { value: "15 min", label: "Report refresh", from: "down from 4 hrs" },
  { value: "−70%", label: "Manual reporting effort", from: "self-serve Power BI" },
];

export function Hero() {
  return (
    <section className="fx-hero" aria-labelledby="hero-title">
      <ParallaxField className="fx-field">
        {tools.map((t, i) => (
          <div
            key={t.name}
            className="fx-tile"
            style={{ "--x": `${t.x}%`, "--y": `${t.y}%`, "--depth": t.depth, "--rot": `${t.rot}deg`, "--i": i } as React.CSSProperties}
            aria-hidden
          >
            <div className="fx-tile-body">
              <span className="fx-logo">
                <Mark name={t.name} size={28} />
                <span>{t.name}</span>
              </span>
            </div>
          </div>
        ))}
      </ParallaxField>

      <div className="container fx-center">
        <p className="fx-status hero-anim" style={{ "--d": 0 } as React.CSSProperties}>
          {hasPhoto && (
            <Image src={PHOTO} alt="" width={36} height={36} className="fx-avatar" />
          )}
          <span className="fx-status-dot" aria-hidden />
          Open to opportunities · Bengaluru · Remote
        </p>
        <p className="fx-hello hero-anim" style={{ "--d": 1 } as React.CSSProperties}>Hi, I&rsquo;m</p>
        <h1 id="hero-title" className="fx-name hero-anim" style={{ "--d": 1 } as React.CSSProperties}>
          <span className="fx-name-line">Dheeraj</span>
          <span className="fx-name-line">Kashyap</span>
        </h1>
        <p className="fx-lede hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
          I build BI systems that cut reporting from hours to minutes, with{" "}
          <span className="hl">Power BI</span> and <span className="hl">Microsoft Fabric</span>.
        </p>
        <p className="fx-cred hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
          BI &amp; Analytics Engineer · 7+ years · 13 certifications incl. Microsoft DP-600 &amp; DP-700
        </p>

        <div className="fx-actions hero-anim" style={{ "--d": 3 } as React.CSSProperties}>
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

        <dl className="fx-metrics hero-anim" style={{ "--d": 4 } as React.CSSProperties}>
          {results.map((r, i) => (
            <div key={r.label} className="fx-metric">
              <dt className="sr-only">{r.label}, {r.from}</dt>
              <dd>
                <span className="fx-metric-value">
                  <CountUp value={r.value} delay={500 + i * 120} />
                </span>
                <span className="fx-metric-label" aria-hidden>{r.label}</span>
                <span className="fx-metric-from" aria-hidden>{r.from}</span>
              </dd>
            </div>
          ))}
        </dl>

        <a href="#about" className="fx-next" aria-label="Scroll to About">
          <ChevronDown size={22} aria-hidden />
        </a>
      </div>
    </section>
  );
}
