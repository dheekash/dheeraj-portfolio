import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactNumbersSection } from "@/components/sections/ImpactNumbersSection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { DashboardGallerySection } from "@/components/sections/DashboardGallerySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      <Divider />

      {/* 2 — Impact Metrics */}
      <div className="section-alt">
        <ImpactNumbersSection />
      </div>

      <Divider />

      {/* 3 — Business Impact + Why Companies Hire Me (merged) */}
      <div className="section-alt2">
        <BusinessImpactSection />
      </div>

      <Divider />

      {/* 4 — Dashboard Gallery */}
      <DashboardGallerySection />

      <Divider />

      {/* 5 — Case Studies */}
      <div className="section-alt">
        <ProjectsSection />
      </div>

      <Divider />

      {/* 6 — Professional Journey */}
      <ExperienceSection />

      <Divider />

      {/* 7 — Tech Stack */}
      <div className="section-alt2">
        <SkillsSection />
      </div>

      <Divider />

      {/* 8 — Certifications */}
      <CertificationsSection />

    </>
  );
}
