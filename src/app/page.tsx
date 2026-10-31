import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Technologies } from "@/components/sections/Technologies";
import { AboutSection } from "@/components/sections/AboutSection";

/**
 * A short, single-scroll portfolio, results first:
 *   Hero (live impact report) → Projects → Work Experience →
 *   Skills & certifications → About → Contact (in the footer band).
 * Detail lives one click away: case-study pages and the full
 * certifications register.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Technologies />
      <AboutSection />
    </>
  );
}
