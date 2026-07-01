"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, motionValue, animate } from "framer-motion";

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function AnimatedCount({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReduced) {
      node.textContent = prefix + end.toFixed(decimals) + suffix;
      return;
    }
    const mv = motionValue(0);
    const unsub = mv.on("change", (v) => {
      if (node) node.textContent = prefix + v.toFixed(decimals) + suffix;
    });
    const controls = animate(mv, end, { duration: 2.0, delay, ease: [0.16, 1, 0.3, 1] });
    return () => { controls.stop(); unsub(); };
  }, [end, prefix, suffix, decimals, delay, prefersReduced]);

  return <span ref={ref}>{prefix}{(0).toFixed(decimals)}{suffix}</span>;
}

const metrics = [
  {
    value: 5,
    suffix: "M+",
    label: "Records processed daily",
    sub: "Real-Time Sales Platform",
    color: "rgba(0,120,212,0.12)",
    border: "rgba(0,120,212,0.22)",
    accent: "rgba(0,120,212,1)",
  },
  {
    value: 12,
    suffix: "%",
    label: "Pipeline failure rate before",
    sub: "Fabric Lakehouse Migration",
    color: "rgba(180,83,9,0.08)",
    border: "rgba(180,83,9,0.2)",
    accent: "rgba(180,83,9,1)",
    strikethrough: true,
    after: "now < 1%",
  },
  {
    value: 2,
    suffix: "M+",
    label: "Customers scored daily",
    sub: "Churn ML Platform",
    color: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    accent: "rgba(124,58,237,1)",
  },
  {
    value: 100,
    suffix: "M+",
    label: "Daily transaction records",
    sub: "Amazon Seller Analytics",
    color: "rgba(242,200,17,0.10)",
    border: "rgba(217,119,6,0.2)",
    accent: "rgba(217,119,6,1)",
  },
  {
    value: 1.2,
    prefix: "$",
    suffix: "M+",
    label: "Suspicious transactions flagged",
    sub: "Fraud Monitoring · first 90 days",
    color: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    accent: "rgba(239,68,68,1)",
    decimals: 1,
  },
];

export function LiveMetricsSection() {
  return (
    <section id="metrics">
      <div className="container-page section-pad">

        <motion.h2 {...reveal()} className="max-w-[20ch] mb-3">
          Real project impact
        </motion.h2>
        <motion.p {...reveal(0.05)} className="text-muted-foreground text-sm max-w-[52ch] mb-[clamp(2rem,3.5vw,3.5rem)]">
          Metrics pulled from delivered solutions. Every number is from a system in production.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              {...reveal(0.1 + i * 0.05)}
              className="rounded-2xl px-4 py-5 flex flex-col gap-2"
              style={{ background: m.color, border: `1px solid ${m.border}` }}
            >
              <p
                className="font-mono tabular-nums font-bold leading-none tracking-tight"
                style={{ fontSize: "clamp(1.6rem,1rem+1.8vw,2.4rem)", color: m.accent }}
              >
                <AnimatedCount
                  end={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals ?? 0}
                  delay={0.3 + i * 0.08}
                />
              </p>
              <div>
                <p className="text-[11.5px] font-medium text-foreground leading-snug mb-0.5">
                  {m.label}
                  {m.strikethrough && (
                    <span className="ml-1 text-muted-foreground/50 line-through text-[10px]">before</span>
                  )}
                </p>
                {m.after && (
                  <p className="text-[10.5px] font-mono font-semibold mb-0.5" style={{ color: m.accent }}>
                    {m.after}
                  </p>
                )}
                <p className="text-[10px] font-mono text-muted-foreground/60 leading-tight">{m.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
