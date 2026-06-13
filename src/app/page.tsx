import { CinematicHero } from "@/components/sections/CinematicHero";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ThoughtProcessSection } from "@/components/sections/ThoughtProcessSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

function Divider() {
  return <div className="hairline container-page" />;
}

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ImpactSection />
      <Divider />
      <ThoughtProcessSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <ArchitectureSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
