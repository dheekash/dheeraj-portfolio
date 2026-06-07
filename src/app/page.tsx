import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactNumbersSection } from "@/components/sections/ImpactNumbersSection";
import { ResumeSnapshotSection } from "@/components/sections/ResumeSnapshotSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DashboardGallerySection } from "@/components/sections/DashboardGallerySection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CurrentlyLearningSection } from "@/components/sections/CurrentlyLearningSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ThoughtLeadershipSection } from "@/components/sections/ThoughtLeadershipSection";
import { ContactSection } from "@/components/sections/ContactSection";

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Numbers + Snapshot */}
      <div className="section-alt">
        <ImpactNumbersSection />
        <Divider />
        <ResumeSnapshotSection />
      </div>

      <Divider />

      {/* 3 — About */}
      <AboutSection />

      <Divider />

      {/* 4 — Business Impact (alt2) */}
      <div className="section-alt2">
        <BusinessImpactSection />
      </div>

      <Divider />

      {/* 5 — Dashboards */}
      <DashboardGallerySection />

      <Divider />

      {/* 6 — Projects (alt bg) */}
      <div className="section-alt">
        <ProjectsSection />
      </div>

      <Divider />

      {/* 7 — Experience */}
      <ExperienceSection />

      <Divider />

      {/* 8 — Skills (alt2 bg) */}
      <div className="section-alt2">
        <SkillsSection />
      </div>

      <Divider />

      {/* 9 — Certifications */}
      <CertificationsSection />

      <Divider />

      {/* 10 — Currently Learning (alt bg) */}
      <div className="section-alt">
        <CurrentlyLearningSection />
      </div>

      <Divider />

      {/* 11 — Education + Consulting (alt2) */}
      <div className="section-alt2">
        <EducationSection />
        <Divider />
        <ConsultingSection />
      </div>

      <Divider />

      {/* 12 — Testimonials */}
      <TestimonialsSection />

      <Divider />

      {/* 13 — Thought Leadership (alt) */}
      <div className="section-alt">
        <ThoughtLeadershipSection />
      </div>

      <Divider />

      {/* 14 — Contact */}
      <ContactSection />
    </>
  );
}
