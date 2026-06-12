"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const figures = [
  { value: "6+", unit: "years", note: "in analytics & business intelligence" },
  { value: "100+", unit: "dashboards", note: "shipped to executives and operators" },
  { value: "100M+", unit: "records", note: "modelled across cloud platforms" },
  { value: "8", unit: "markets", note: "served from one semantic layer" },
  { value: "13", unit: "certifications", note: "Microsoft · Databricks · Snowflake" },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can 404 before hydration attaches onError — re-check on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <figure>
      <div className="aspect-[4/5] bg-secondary border border-border overflow-hidden">
        {failed ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-5xl text-muted-foreground/40">DK</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src="/images/headshot.jpg"
            alt="Dheeraj Kashyap"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground">
        Fig. 1 — Dheeraj Kashyap, Bengaluru.
      </figcaption>
    </figure>
  );
}

export function BriefSection() {
  return (
    <section id="brief">
      <div className="container-page section-pad">
        <motion.div {...reveal()} className="flex items-baseline gap-5 rule-thick pt-4 mb-[clamp(2.5rem,1.5rem+3vw,4rem)]">
          <span className="font-mono text-xs text-rust">01</span>
          <h2 className="text-2xl lg:text-3xl">The brief</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-12">
          {/* Narrative */}
          <motion.div {...reveal(0.05)} className="sm:col-span-2 lg:col-span-6 max-w-prose">
            <p className="dropcap text-base leading-[1.85] mb-6">
              Most analytics portfolios show you tools. This one shows you
              decisions. I started my career answering customer escalations at
              an Amazon-operated facility, where I kept noticing the same
              thing: the answers people argued about in meetings were sitting,
              unread, in the data. Learning to surface them — first with
              spreadsheets, then SQL, then full cloud data platforms — turned
              an operations job into an analytics career.
            </p>
            <p className="text-base leading-[1.85] mb-6">
              Today I design the full path from raw data to executive
              conviction: lakehouse architectures that don&apos;t fail at 2 a.m.,
              semantic models that survive contact with finance, and reporting
              that answers the question behind the question. The work spans
              Microsoft Fabric, Databricks, Snowflake and Power BI — but the
              tools have never been the point.
            </p>
            <p className="serif-italic text-lg text-muted-foreground">
              The point is what someone does differently on Monday morning.
            </p>
          </motion.div>

          {/* Key figures — ruled, static, annual-report style */}
          <motion.div {...reveal(0.1)} className="sm:col-span-1 lg:col-span-3 lg:col-start-8">
            <p className="kicker mb-4">In figures</p>
            <ul>
              {figures.map((f) => (
                <li key={f.unit} className="rule-thin py-4">
                  <span className="font-serif text-3xl font-semibold tracking-tight">
                    {f.value}
                  </span>{" "}
                  <span className="font-serif text-lg text-muted-foreground">{f.unit}</span>
                  <p className="text-xs text-muted-foreground mt-1">{f.note}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Portrait */}
          <motion.div {...reveal(0.15)} className="sm:col-span-1 lg:col-span-2 lg:col-start-11">
            <div className="max-w-[220px]">
              <Portrait />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
