import { HeroSection } from "@/components/sections/HeroSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { GlobalFootprintSection } from "@/components/sections/GlobalFootprintSection";

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero (dark / command center) */}
      <HeroSection />

      {/* Tech logo marquee separator */}
      <TechMarquee />

      {/* 2 — Professional Journey */}
      <ExperienceSection />

      <Divider />

      {/* 3 — Featured Projects (case studies) */}
      <div className="section-alt">
        <ProjectsSection />
      </div>

      <Divider />

      {/* 4 — Business & Domain Expertise */}
      <BusinessImpactSection />

      <Divider />

      {/* 5 — How I Deliver Analytics */}
      <div className="section-alt2">
        <HowIWorkSection />
      </div>

      <Divider />

      {/* 6 — Tech Stack */}
      <SkillsSection />

      <Divider />

      {/* 7 — Certifications */}
      <div className="section-alt">
        <CertificationsSection />
      </div>

      <Divider />

      {/* 8 — Global Analytics Footprint */}
      <GlobalFootprintSection />

    </>
  );
}
