import { CinematicHero } from "@/components/sections/CinematicHero";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CoreExpertiseSection, PlatformGuideSection } from "@/components/sections/TechStackSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <div className="section-alt">
        <CaseStudiesSection />
      </div>
      <PlatformGuideSection />
      <div className="section-alt">
        <CoreExpertiseSection />
      </div>
      <CareerEvolutionSection />
      <div className="section-alt">
        <AboutSection />
      </div>
      <CertificationsSection />
    </>
  );
}
