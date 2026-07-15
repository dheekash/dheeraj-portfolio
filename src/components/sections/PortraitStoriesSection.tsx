"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Gauge, Workflow, LineChart, type LucideIcon } from "lucide-react";
import { WebGLDotField } from "@/components/common/WebGLDotField";

const features: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Layers,
    title: "Lakehouse Architecture",
    body: "Medallion-layered Lakehouses on Microsoft Fabric and Databricks — one governed source of truth instead of a dozen disconnected reports.",
  },
  {
    Icon: Gauge,
    title: "Semantic Modeling",
    body: "Power BI datasets built for speed and trust: DAX measures, star schemas, and Direct Lake models that hold up under real usage.",
  },
  {
    Icon: Workflow,
    title: "Reliable Pipelines",
    body: "SQLMesh and dbt with automated quality gates, so schema drift and pipeline failures get caught before they reach a dashboard.",
  },
  {
    Icon: LineChart,
    title: "Executive-Ready Insights",
    body: "Reporting systems built for the people making the call — finance, operations, and leadership teams who need answers, not raw tables.",
  },
];

/**
 * "Portrait Stories" feature-highlight section — editorial Playfair Display
 * heading, Poppins body copy, glass gradient-border-shell cards on an 8px
 * spacing rhythm, over a WebGL dot-matrix field. Colors stay on the site's
 * own tokens; only the typography/spacing/card technique come from the
 * Portrait Stories design system. Reveal is GSAP ScrollTrigger per that
 * system's motion spec (elsewhere on the site uses Framer Motion — scoped
 * here on purpose).
 */
export function PortraitStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".ps-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <WebGLDotField />
      </div>

      <div className="container-page section-pad relative">
        <div className="max-w-[46rem] mb-[clamp(2rem,3vw,3rem)]">
          <p
            className="ps-reveal mb-3 text-[14px] font-medium uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-poppins), sans-serif", color: "var(--primary)" }}
          >
            How I work
          </p>
          <h2
            className="ps-reveal mb-4"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 600,
              fontSize: "clamp(2.1rem, 1.2rem + 3.4vw, 4.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
            }}
          >
            Every dataset has a story worth telling.
          </h2>
          <p
            className="ps-reveal text-[15px] leading-relaxed text-muted-foreground max-w-[42ch]"
            style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 300 }}
          >
            From messy source systems to boardroom-ready dashboards — four disciplines I lean on for every engagement.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="ps-reveal ps-shell rounded-[2rem] p-[1px]">
              <div className="ps-card h-full rounded-[calc(2rem-1px)] p-6 flex flex-col gap-4">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)" }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <p
                  style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "var(--foreground)" }}
                >
                  {title}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "24px" }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
