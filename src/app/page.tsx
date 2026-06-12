import { CinematicHero } from "@/components/sections/CinematicHero";
import { ImpactMetricsSection } from "@/components/sections/ImpactMetricsSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CareerJourneySection } from "@/components/sections/CareerJourneySection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

function Divider() {
  return <div className="hairline container-page" />;
}

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ImpactMetricsSection />
      <Divider />
      <IntroSection />
      <Divider />
      <CaseStudiesSection />
      <Divider />
      <CareerJourneySection />
      <Divider />
      <EcosystemSection />
      <Divider />
      <CertificationsSection />
    </>
  );
}
