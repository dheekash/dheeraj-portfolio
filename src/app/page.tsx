import { CinematicHero } from "@/components/sections/CinematicHero";
import { RecruiterSnapshot } from "@/components/sections/RecruiterSnapshot";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsArchitectureSection } from "@/components/sections/SkillsArchitectureSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { FabricExpertiseSection } from "@/components/sections/FabricExpertiseSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

function Divider() {
  return <div className="hairline container-page" />;
}

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <RecruiterSnapshot />
      <Divider />
      <AboutSection />
      <Divider />
      <SkillsArchitectureSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <FabricExpertiseSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
