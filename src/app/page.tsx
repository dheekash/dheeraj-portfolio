import { Hero } from "@/components/sections/Hero";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Technologies } from "@/components/sections/Technologies";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AboutSection } from "@/components/sections/AboutSection";

/**
 * Page order:
 *   01 Hero → 02 Impact & highlights → 03 Featured projects →
 *   04 Professional experience → 05 Technical expertise →
 *   06 Certifications & education → 07 About, then Contact (footer band).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactSection />
      <Projects />
      <Experience />
      <Technologies />
      <CertificationsSection />
      <AboutSection />
    </>
  );
}
