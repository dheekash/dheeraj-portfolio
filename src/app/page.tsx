import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactNumbersSection } from "@/components/sections/ImpactNumbersSection";
import { ResumeSnapshotSection } from "@/components/sections/ResumeSnapshotSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DashboardGallerySection } from "@/components/sections/DashboardGallerySection";
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

      {/* 2 — Numbers + Snapshot (light alt bg) */}
      <div className="section-alt">
        <ImpactNumbersSection />
        <Divider />
        <ResumeSnapshotSection />
      </div>

      <Divider />

      {/* 3 — About (default bg) */}
      <AboutSection />

      <Divider />

      {/* 4 — Dashboards (alt2 bg) */}
      <div className="section-alt2">
        <DashboardGallerySection />
      </div>

      <Divider />

      {/* 5 — Projects (default bg) */}
      <ProjectsSection />

      <Divider />

      {/* 6 — Experience (alt bg) */}
      <div className="section-alt">
        <ExperienceSection />
      </div>

      <Divider />

      {/* 7 — Skills (default bg) */}
      <SkillsSection />

      <Divider />

      {/* 8 — Certifications (alt2 bg) */}
      <div className="section-alt2">
        <CertificationsSection />
      </div>

      <Divider />

      {/* 9 — Currently Learning (default bg) */}
      <CurrentlyLearningSection />

      <Divider />

      {/* 10 — Education + Consulting (alt bg) */}
      <div className="section-alt">
        <EducationSection />
        <Divider />
        <ConsultingSection />
      </div>

      <Divider />

      {/* 11 — Testimonials (default bg) */}
      <TestimonialsSection />

      <Divider />

      {/* 12 — Thought Leadership (alt2 bg) */}
      <div className="section-alt2">
        <ThoughtLeadershipSection />
      </div>

      <Divider />

      {/* 13 — Contact (default bg) */}
      <ContactSection />
    </>
  );
}
