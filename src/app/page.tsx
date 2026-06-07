import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactNumbersSection } from "@/components/sections/ImpactNumbersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { DashboardGallerySection } from "@/components/sections/DashboardGallerySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";

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

      {/* 3 — About (education cards inline) */}
      <AboutSection />

      <Divider />

      {/* 4 — Business Impact */}
      <div className="section-alt2">
        <BusinessImpactSection />
      </div>

      <Divider />

      {/* 5 — Dashboard Gallery */}
      <DashboardGallerySection />

      <Divider />

      {/* 6 — Featured Case Studies */}
      <div className="section-alt">
        <ProjectsSection />
      </div>

      <Divider />

      {/* 7 — Professional Journey */}
      <ExperienceSection />

      <Divider />

      {/* 8 — Tech Stack */}
      <div className="section-alt2">
        <SkillsSection />
      </div>

      <Divider />

      {/* 9 — Featured Certifications */}
      <CertificationsSection />

      <Divider />

      {/* 10 — Contact */}
      <ContactSection />
    </>
  );
}
