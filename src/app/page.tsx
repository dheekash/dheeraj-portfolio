import { CinematicHero } from "@/components/sections/CinematicHero";
import { PortraitStoriesSection } from "@/components/sections/PortraitStoriesSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CoreExpertiseSection, PlatformGuideSection } from "@/components/sections/TechStackSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

/**
 * Section order follows the sequence a recruiter actually asks questions in,
 * not the order the sections were built in.
 *
 *   Hero            Who is this, what do they do, at what level
 *   Case Studies    Prove it: real problems, real outcomes
 *   Experience      Where has that work happened
 *   Certifications  Is the enterprise credential bar cleared
 *   Core Expertise  What is the working toolset
 *   Platform Guide  Do they show senior judgment, not just tool knowledge
 *   How I Work      How do they operate day to day
 *   About           Who are they behind the work
 *   Footer/Contact  How do I reach them
 *
 * Two rules drive it: evidence precedes methodology (a recruiter has no
 * reason to care how someone works before seeing what they have shipped),
 * and the hard-credibility block (Experience -> Certifications) stays
 * contiguous rather than being split by reflective content.
 *
 * `section-alt` alternates to keep a visible band rhythm down the page.
 */
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <div className="section-alt">
        <CaseStudiesSection />
      </div>
      <CareerEvolutionSection />
      <div className="section-alt">
        <CertificationsSection />
      </div>
      <CoreExpertiseSection />
      <div className="section-alt">
        <PlatformGuideSection />
      </div>
      <PortraitStoriesSection />
      <div className="section-alt">
        <AboutSection />
      </div>
    </>
  );
}
