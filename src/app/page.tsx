import { CinematicHero } from "@/components/sections/CinematicHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

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
      <CareerEvolutionSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
