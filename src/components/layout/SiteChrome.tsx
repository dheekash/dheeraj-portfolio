"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollExperience } from "@/components/common/ScrollExperience";
import { CustomCursor } from "@/components/common/CustomCursor";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp size={15} />
    </button>
  );
}

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
      {/* Cosmic atmosphere — animated mesh, drifting dot grid, floating orbs */}
      <div className="cosmos-mesh" aria-hidden />
      <div className="cosmos-dots" aria-hidden />
      <div aria-hidden className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden">
        <span className="aurora w-[42vw] h-[42vw] -top-[12%] -left-[8%]" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 70%)" }} />
        <span className="aurora w-[36vw] h-[36vw] top-[30%] -right-[10%]" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)", animationDelay: "-8s", animationDuration: "28s" }} />
        <span className="aurora w-[30vw] h-[30vw] bottom-[-10%] left-[28%]" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)", animationDelay: "-15s", animationDuration: "34s" }} />
      </div>
      <div className="grain" aria-hidden />
      <CustomCursor />
      <ScrollExperience />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
