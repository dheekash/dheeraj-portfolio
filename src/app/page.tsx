import { CinematicHero } from "@/components/sections/CinematicHero";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { FabricExpertiseSection } from "@/components/sections/FabricExpertiseSection";

function Divider() {
  return <div className="hairline container-page" />;
}

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <Divider />
      <AboutSection />
      <Divider />
      <TechStackSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <CertificationsSection />
      <Divider />
      <FabricExpertiseSection />
    </>
  );
}
