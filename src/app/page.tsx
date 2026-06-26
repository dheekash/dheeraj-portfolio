import { CinematicHero } from "@/components/sections/CinematicHero";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FabricExpertiseSection } from "@/components/sections/FabricExpertiseSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <AboutSection />
      <div className="section-alt">
        <TechStackSection />
      </div>
      <FabricExpertiseSection />
      <div className="section-alt">
        <CaseStudiesSection />
      </div>
      <CareerEvolutionSection />
      <div className="section-alt">
        <CertificationsSection />
      </div>
    </>
  );
}
