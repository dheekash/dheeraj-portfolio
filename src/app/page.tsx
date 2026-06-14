import { CinematicHero } from "@/components/sections/CinematicHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { ConsultingLeadershipSection } from "@/components/sections/ConsultingLeadershipSection";
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
      <TechStackSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <ConsultingLeadershipSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
