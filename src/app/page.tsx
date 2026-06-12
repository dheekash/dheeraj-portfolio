import { CoverSection } from "@/components/sections/CoverSection";
import { BriefSection } from "@/components/sections/BriefSection";
import { CaseFilesSection } from "@/components/sections/CaseFilesSection";
import { PathSection } from "@/components/sections/PathSection";
import { MethodSection } from "@/components/sections/MethodSection";

export default function HomePage() {
  return (
    <>
      {/* Cover — masthead statement + table of contents */}
      <CoverSection />

      {/* 01 — The brief: narrative intro, key figures, portrait */}
      <BriefSection />

      {/* 02 — Case files: outcome-led stories with drawn diagrams */}
      <CaseFilesSection />

      {/* 03 — The path: career told as a chronology */}
      <PathSection />

      {/* 04 — Method: principles + the instruments */}
      <MethodSection />

      {/* 05 — Contact lives in the footer (ink plate) */}
    </>
  );
}
