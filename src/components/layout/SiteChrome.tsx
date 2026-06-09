"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyResumeButton } from "@/components/common/StickyResumeButton";
import { GlassBackground } from "./GlassBackground";
import { ScrollEffects } from "@/components/common/ScrollEffects";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIsolated = pathname.startsWith("/deck");

  if (isIsolated) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollEffects />
      <GlassBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyResumeButton />
    </>
  );
}
