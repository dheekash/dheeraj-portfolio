import { CinematicHero } from "@/components/sections/CinematicHero";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { FabricExpertiseSection } from "@/components/sections/FabricExpertiseSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <AboutSection />
      <div className="section-alt">
        <TechStackSection />
      </div>
      <CaseStudiesSection />
      <div className="section-alt">
        <CareerEvolutionSection />
      </div>
      <CertificationsSection />
      <div className="section-alt">
        <FabricExpertiseSection />
      </div>
    </>
  );
}
