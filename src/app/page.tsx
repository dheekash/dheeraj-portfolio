import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { PlatformJudgment } from "@/components/sections/PlatformJudgment";
import { Expertise } from "@/components/sections/Expertise";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AboutSection } from "@/components/sections/AboutSection";

/**
 * Order follows the questions a recruiter asks, in turn:
 *   Who are you, and what do you specialise in?     Hero, proof, results
 *   What have you built, and what changed?          Selected work
 *   How senior are you?                             Experience
 *   How do you think?                               Platform judgment
 *   What do you use?                                Expertise
 *   Is the credential bar cleared?                  Certifications
 *   Who are you behind the work?                    About
 *   How do I reach you?                             Contact (in the footer band)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <PlatformJudgment />
      <Expertise />
      <CertificationsSection />
      <AboutSection />
    </>
  );
}
