import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { Experience } from "@/components/sections/Experience";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

/**
 * A short, single-scroll portfolio:
 *   Hero → About → Work Experience → Technologies → Projects →
 *   Certifications → Contact (in the footer band).
 * Detail lives one click away: case-study pages and the full
 * certifications register.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Experience />
      <Technologies />
      <Projects />
      <CertificationsSection />
    </>
  );
}
