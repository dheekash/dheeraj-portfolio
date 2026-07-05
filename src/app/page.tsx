import { CinematicHero } from "@/components/sections/CinematicHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoreExpertiseSection, PlatformGuideSection } from "@/components/sections/TechStackSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <AboutSection />
      <div className="section-alt">
        <CoreExpertiseSection />
      </div>
      <CertificationsSection />
      <div className="section-alt">
        <PlatformGuideSection />
      </div>
      <CaseStudiesSection />
      <div className="section-alt">
        <CareerEvolutionSection />
      </div>
    </>
  );
}
