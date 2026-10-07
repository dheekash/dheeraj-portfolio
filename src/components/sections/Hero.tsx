import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { ParallaxField } from "@/components/common/ParallaxField";

/* Portrait joins the floating tiles once public/images/avatar.jpg exists. */
const PHOTO = "/images/avatar.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

type Tile =
  | { kind: "logo"; name: string; x: number; y: number; depth: number; rot: number; wide?: boolean }
  | { kind: "result"; before: string; after: string; label: string; x: number; y: number; depth: number; rot: number; wide?: boolean };

/* Positions are percentages of the hero; the centre band is kept clear for
   the name. Results are real before/after figures from the case studies.
   `wide` tiles only show on large screens, where there is room. */
const tiles: Tile[] = [
  { kind: "logo", name: "Power BI", x: 9, y: 16, depth: 1.3, rot: -7 },
  { kind: "logo", name: "Microsoft Fabric", x: 84, y: 13, depth: 0.9, rot: 6 },
  { kind: "logo", name: "Snowflake", x: 90, y: 60, depth: 1.5, rot: -5 },
  { kind: "logo", name: "Databricks", x: 13, y: 74, depth: 1.0, rot: 7 },
  { kind: "logo", name: "Azure", x: 70, y: 86, depth: 1.2, rot: -4, wide: true },
  { kind: "logo", name: "SQL", x: 44, y: 14, depth: 0.7, rot: 3, wide: true },
  { kind: "result", before: "12%", after: "<1%", label: "Pipeline failures", x: 3, y: 42, depth: 1.1, rot: -3 },
  { kind: "result", before: "Baseline", after: "−70%", label: "Manual reporting", x: 80, y: 34, depth: 0.8, rot: 4 },
  { kind: "result", before: "4 hrs", after: "15 min", label: "Report refresh", x: 24, y: 88, depth: 1.3, rot: 2, wide: true },
  { kind: "result", before: "24 hrs", after: "<5 min", label: "Fraud detection", x: 56, y: 80, depth: 0.9, rot: -2, wide: true },
];

const chips = ["Power BI", "Microsoft Fabric", "SQL", "Snowflake", "Databricks", "Azure"];

export function Hero() {
  return (
    <section className="fx-hero" aria-labelledby="hero-title">
      <ParallaxField className="fx-field">
        {tiles.map((t, i) => (
          <div
            key={i}
            className={`fx-tile${t.wide ? " is-wide" : ""}`}
            style={{ "--x": `${t.x}%`, "--y": `${t.y}%`, "--depth": t.depth, "--rot": `${t.rot}deg`, "--i": i } as React.CSSProperties}
            aria-hidden
          >
            <div className="fx-tile-body">
              {t.kind === "logo" ? (
                <span className="fx-logo">
                  <Mark name={t.name} size={30} />
                  <span>{t.name}</span>
                </span>
              ) : (
                <span className="fx-result">
                  <span className="fx-result-value">
                    <span className="result-before">{t.before}</span> → <span className="fx-after">{t.after}</span>
                  </span>
                  <span className="fx-result-label">{t.label}</span>
                </span>
              )}
            </div>
          </div>
        ))}
        {hasPhoto && (
          <div className="fx-tile is-photo" style={{ "--x": "72%", "--y": "58%", "--depth": 0.6, "--rot": "3deg", "--i": 11 } as React.CSSProperties}>
            <div className="fx-tile-body">
              <Image src={PHOTO} alt="Dheeraj Kashyap" width={240} height={300} priority />
            </div>
          </div>
        )}
      </ParallaxField>

      <div className="container fx-center">
        <p className="fx-hello hero-anim" style={{ "--d": 0 } as React.CSSProperties}>Hi, I&rsquo;m</p>
        <h1 id="hero-title" className="fx-name hero-anim" style={{ "--d": 1 } as React.CSSProperties}>
          Dheeraj Kashyap
        </h1>
        <p className="fx-lede hero-anim" style={{ "--d": 2 } as React.CSSProperties}>
          <span className="hl">BI &amp; Analytics Engineer</span> building enterprise data systems with
          Power BI and Microsoft Fabric.
        </p>
        <div className="fx-actions hero-anim" style={{ "--d": 3 } as React.CSSProperties}>
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
        {/* Phones: the floating tiles give way to a simple row. */}
        <p className="fx-chips">
          {chips.map((c) => (
            <span key={c} className="sx-tech" translate="no">
              <Mark name={c} size={16} />
              {c}
            </span>
          ))}
        </p>
        <a href="#about" className="fx-scroll" aria-label="Scroll to About">
          <span aria-hidden>Scroll</span>
          <span className="fx-scroll-line" aria-hidden />
        </a>
      </div>
    </section>
  );
}
