import { CinematicHero } from "@/components/sections/CinematicHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { ThoughtProcessSection } from "@/components/sections/ThoughtProcessSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

function Divider() {
  return <div className="hairline container-page" />;
}

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <TrustBar />
      <Divider />
      <AboutSection />
      <Divider />
      <ImpactSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <ThoughtProcessSection />
      <Divider />
      <ArchitectureSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
