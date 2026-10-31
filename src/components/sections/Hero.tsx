import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { RotatingWords } from "@/components/common/RotatingWords";
import { Mark } from "@/components/common/Mark";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";
import { allCredentials, flagshipCredentials } from "@/data/credentials";

/**
 * First impression: name, headline, experience, the key certifications and
 * the actions, with the portrait beside them. Numbers and results follow in
 * the Impact section below.
 */
export function Hero() {
  const keyCerts = flagshipCredentials.slice(0, 5);
  return (
    <section id="top" className="rh" aria-labelledby="hero-title">
      <div className="container rh-grid">
        <div className="rh-copy">
          <p className="rh-status">
            <span className="fx-status-dot" aria-hidden />
            Open to opportunities<span className="rh-status-loc"> · Bengaluru · Remote</span>
          </p>
          <h1 id="hero-title" className="rh-name">
            Dheeraj Kashyap
          </h1>
          <p className="rh-role">
            BI &amp; Analytics Engineer <span className="rh-sep" aria-hidden>·</span> 7+ years
          </p>
          <p className="rh-lede">
            I build reporting that cuts hours to minutes, with{" "}
            <RotatingWords words={["Power BI", "Microsoft Fabric", "Snowflake", "Databricks"]} suffix="." className="hl" />
          </p>
          <div className="rh-certs">
            <p className="rh-certs-label">{allCredentials.length} certifications, including</p>
            <ul className="rh-cert-list" aria-label="Key certifications">
              {keyCerts.map((c) => (
                <li key={c.code} className="rh-cert" title={c.name}>
                  <span translate="no">{c.code}</span>
                  <span className="sr-only"> {c.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rh-actions">
            <a href="#contact" className="btn btn-primary">
              Contact me <ArrowRight size={16} aria-hidden />
            </a>
            <DownloadButton />
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn">
              <LinkedinIcon size={20} />
              <span className="hx-icon-label">LinkedIn</span>
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="sx-icon-btn" aria-label="GitHub profile (opens in a new tab)" title="GitHub">
              <Mark name="GitHub" size={20} />
              <span className="hx-icon-label">GitHub</span>
            </a>
          </div>
        </div>

        <div className="rh-photo">
          <Image
            src="/images/portrait.webp"
            alt="Dheeraj Kashyap"
            width={1000}
            height={1340}
            priority
            sizes="(min-width: 1024px) 420px, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
