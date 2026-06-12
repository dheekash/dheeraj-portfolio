"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";

export function CareerJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 35%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="journey" className="relative">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <p className="eyebrow mb-5">Career journey</p>
          <h2 className="ink-gradient mb-5">From operations to analytics leadership.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I didn&apos;t start in data. I started answering customer escalations
            at an Amazon-operated facility — and kept noticing the answers were
            sitting in data nobody was looking at. That observation became a
            career.
          </p>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Scroll-driven timeline rail */}
          <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#4D8DFF] to-[#22D3EE]"
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-4">
            {experiences.map((exp, i) => {
              const isCurrent = exp.endYear === null;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="relative flex gap-8"
                >
                  {/* Node */}
                  <div className="relative mt-8 shrink-0">
                    <div
                      className={`relative z-10 w-[15px] h-[15px] rounded-full border-2 border-background ${
                        isCurrent ? "bg-primary glow-primary" : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>

                  {/* Entry */}
                  <div className="flex-1 glass-card card-lift rounded-2xl p-7 lg:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/25 text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Current
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-5">
                      <span className="font-medium text-secondary-foreground">{exp.company}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        <MapPin size={11} /> {exp.location}
                      </span>
                      {isCurrent && (
                        <span className="font-mono text-xs">{exp.period}</span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {exp.highlights.slice(0, 4).map((h) => (
                        <li
                          key={h}
                          className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>

                    <p className="font-mono text-xs text-muted-foreground/70 leading-relaxed">
                      {exp.techStack.join("  ·  ")}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
