import { CinematicHero } from "@/components/sections/CinematicHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { EnterpriseImpactSection } from "@/components/sections/EnterpriseImpactSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ModernDataStackSection } from "@/components/sections/ModernDataStackSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerEvolutionSection } from "@/components/sections/CareerEvolutionSection";
import { ConsultingLeadershipSection } from "@/components/sections/ConsultingLeadershipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
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
      <EnterpriseImpactSection />
      <Divider />
      <AboutSection />
      <Divider />
      <ModernDataStackSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerEvolutionSection />
      <Divider />
      <ConsultingLeadershipSection />
      <Divider />
      <TestimonialsSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
