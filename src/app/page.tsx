import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero with Analytics Command Center */}
      <HeroSection />

      {/* 2 — Professional Journey (growing timeline animation) */}
      <ExperienceSection />

      <Divider />

      {/* 3 — Featured Projects (horizontal scroll showcase) */}
      <ProjectsShowcase />

      <Divider />

      {/* 4 — Business & Domain Expertise */}
      <BusinessImpactSection />

      <Divider />

      {/* 5 — How I Deliver Analytics */}
      <div className="section-alt2">
        <HowIWorkSection />
      </div>

      <Divider />

      {/* 6 — Certifications */}
      <div className="section-alt">
        <CertificationsSection />
      </div>
    </>
  );
}
