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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactNumbersSection />
      <ResumeSnapshotSection />
      <AboutSection />
      <DashboardGallerySection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <CurrentlyLearningSection />
      <EducationSection />
      <ConsultingSection />
      <TestimonialsSection />
      <ThoughtLeadershipSection />
      <ContactSection />
    </>
  );
}
