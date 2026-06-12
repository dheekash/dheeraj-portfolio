import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactMetricsSection } from "@/components/sections/ImpactMetricsSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { CareerJourneySection } from "@/components/sections/CareerJourneySection";
import { SkillsArchitectureSection } from "@/components/sections/SkillsArchitectureSection";

function Divider() {
  return <div className="hairline container-max" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Brand statement + credibility */}
      <HeroSection />

      {/* 2 — Executive-level KPIs */}
      <ImpactMetricsSection />

      <Divider />

      {/* 3 — Case studies with before/after outcomes */}
      <FeaturedWorkSection />

      <Divider />

      {/* 4 — Career timeline */}
      <CareerJourneySection />

      <Divider />

      {/* 5 — Layered skills ecosystem */}
      <SkillsArchitectureSection />
    </>
  );
}
