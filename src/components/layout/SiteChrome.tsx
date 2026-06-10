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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <ScrollEffects />
      <GlassBackground />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyResumeButton />
    </>
  );
}
