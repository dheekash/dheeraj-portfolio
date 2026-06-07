import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ThoughtLeadershipSection } from "@/components/sections/ThoughtLeadershipSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <EducationSection />
      <ConsultingSection />
      <TestimonialsSection />
      <ThoughtLeadershipSection />
      <ContactSection />
    </>
  );
}
