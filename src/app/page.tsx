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
 * Backgrounds run a three-tier surface scale (base / surface-1 / surface-2)
 * rather than a two-state alternation. Binary alternation makes every other
 * section identical, which reads as a template. With three tiers, adjacent
 * sections always differ and so do the alternating ones.
 *
 * `surface-2` is reserved for the two sections carrying the most weight
 * (the work itself, and the platform judgement piece); `surface-lift` adds
 * a single faint top wash to the section the page is steering toward.
 * Sections that paint their own background (How I Work runs a WebGL dot
 * field, About a dot grid) stay on the base tier so the treatments do not
 * stack.
 */
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <div className="surface-2 surface-lift">
        <CaseStudiesSection />
      </div>
      <CareerEvolutionSection />
      <div className="surface-1">
        <CertificationsSection />
      </div>
      <CoreExpertiseSection />
      <div className="surface-2">
        <PlatformGuideSection />
      </div>
      <PortraitStoriesSection />
      <div className="surface-1">
        <AboutSection />
      </div>
    </>
  );
}
