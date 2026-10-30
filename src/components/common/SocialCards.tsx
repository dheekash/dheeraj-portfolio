import { Download, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/common/SocialIcons";
import { Mark } from "@/components/common/Mark";
import { profile } from "@/data/profile";
import { CV_PDF, CV_PDF_NAME } from "@/lib/site";

/**
 * Four ways to reach me as one rounded 2×2 block (after a Uiverse.io card
 * set by Praashoo7): each tile's outer corner is rounded, and on hover a
 * tile grows its corner and fills with the brand colour.
 */
export function SocialCards() {
  return (
    <ul className="soc" aria-label="Elsewhere">
      <li>
        <a className="soc-card soc-li" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
          <LinkedinIcon size={26} />
        </a>
      </li>
      <li>
        <a className="soc-card soc-gh" href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub">
          <Mark name="GitHub" size={26} />
        </a>
      </li>
      <li>
        <a className="soc-card soc-mail" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email">
          <Mail size={26} strokeWidth={1.8} aria-hidden />
        </a>
      </li>
      <li>
        <a className="soc-card soc-cv" href={CV_PDF} download={CV_PDF_NAME} aria-label="Download CV (PDF)" title="Download CV">
          <Download size={26} strokeWidth={1.8} aria-hidden />
        </a>
      </li>
    </ul>
  );
}
