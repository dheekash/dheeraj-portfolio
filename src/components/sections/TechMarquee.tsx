"use client";

import { MARQUEE_LOGOS } from "@/components/common/TechLogos";

/** Infinite scrolling tech logo strip */
export function TechMarquee() {
  // Duplicate for seamless loop
  const items = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

  return (
    <div className="relative py-5 border-y border-border glass overflow-hidden">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

      <div className="flex gap-0 marquee-track">
        {items.map((item, i) => {
          const { Logo } = item;
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-2.5 px-7 shrink-0 group cursor-default"
              title={item.name}
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                <Logo size={22} />
              </span>
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
