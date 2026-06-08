import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactNumbersSection } from "@/components/sections/ImpactNumbersSection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { DashboardGallerySection } from "@/components/sections/DashboardGallerySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { AnalyticsPipelineSection } from "@/components/sections/AnalyticsPipelineSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { DomainExpertiseSection } from "@/components/sections/DomainExpertiseSection";
import { CompanyRecognitionStrip } from "@/components/sections/CompanyRecognitionStrip";

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* Tech logo marquee */}
      <TechMarquee />

      {/* 2 — Impact Metrics */}
      <div className="section-alt">
        <ImpactNumbersSection />
      </div>

      {/* Company recognition strip */}
      <CompanyRecognitionStrip />

      <Divider />

      {/* 3 — Analytics Pipeline (WOW section) */}
      <AnalyticsPipelineSection />

      <Divider />

      {/* 4 — Business Impact + Why Companies Hire Me */}
      <div className="section-alt2">
        <BusinessImpactSection />
      </div>

      <Divider />

      {/* 5 — Domain Expertise */}
      <DomainExpertiseSection />

      <Divider />

      {/* 6 — Dashboard Gallery */}
      <DashboardGallerySection />

      <Divider />

      {/* 7 — Case Studies */}
      <div className="section-alt">
        <ProjectsSection />
      </div>

      <Divider />

      {/* 8 — How I Work methodology */}
      <div className="section-alt2">
        <HowIWorkSection />
      </div>

      <Divider />

      {/* 9 — Professional Journey */}
      <ExperienceSection />

      <Divider />

      {/* 10 — Tech Stack */}
      <div className="section-alt">
        <SkillsSection />
      </div>

      <Divider />

      {/* 11 — Certifications */}
      <CertificationsSection />

    </>
  );
}
