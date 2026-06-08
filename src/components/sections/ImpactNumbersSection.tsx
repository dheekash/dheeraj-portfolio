"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "7",   suffix: "+",  label: "Years Experience",       color: "text-blue-500",   bg: "bg-blue-500/10",   border: "border-blue-500/20" },
  { value: "13",  suffix: "",   label: "Certifications",         color: "text-amber-500",  bg: "bg-amber-500/10",  border: "border-amber-500/20" },
  { value: "50",  suffix: "+",  label: "Dashboards Delivered",   color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { value: "8",   suffix: "",   label: "Countries Supported",    color: "text-emerald-500",bg: "bg-emerald-500/10",border: "border-emerald-500/20" },
  { value: "100", suffix: "M+", label: "Records Processed",      color: "text-cyan-500",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20" },
  { value: "20",  suffix: "+",  label: "Stakeholders Supported", color: "text-rose-500",   bg: "bg-rose-500/10",   border: "border-rose-500/20" },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const target = parseInt(value);
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.floor(target * ease).toString());
      if (frame >= total) { setDisplay(value); clearInterval(id); }
    }, 18);
    return () => clearInterval(id);
  }, [started, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function ImpactNumbersSection() {
  return (
    <section className="relative py-14 overflow-hidden">
      {/* Subtle divider line top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background tint */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="relative container-max section-padding !py-0">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground mb-8"
        >
          By The Numbers
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" as const }}
              className={`glass-card glass-highlight group relative flex flex-col items-center justify-center gap-1.5 py-6 px-3 rounded-2xl border ${s.border} hover:scale-[1.05] transition-all duration-300 cursor-default hover:-translate-y-1 card-depth`}
            >
              <span className={`text-3xl sm:text-4xl font-black tabular-nums leading-none ${s.color}`}>
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-xs font-semibold text-muted-foreground text-center leading-tight">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
