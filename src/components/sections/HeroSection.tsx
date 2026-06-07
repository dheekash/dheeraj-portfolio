"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/common/LinkButton";
import { profile } from "@/data/profile";

const techLogos = [
  { name: "Fabric", color: "#0067C0", bg: "rgba(0,103,192,0.15)" },
  { name: "Databricks", color: "#FF3621", bg: "rgba(255,54,33,0.12)" },
  { name: "Snowflake", color: "#29B5E8", bg: "rgba(41,181,232,0.12)" },
  { name: "Power BI", color: "#F2C811", bg: "rgba(242,200,17,0.12)" },
  { name: "dbt", color: "#FF694B", bg: "rgba(255,105,75,0.12)" },
  { name: "Python", color: "#3776AB", bg: "rgba(55,118,171,0.12)" },
  { name: "Azure", color: "#0078D4", bg: "rgba(0,120,212,0.12)" },
  { name: "Delta", color: "#00ADD8", bg: "rgba(0,173,216,0.12)" },
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isDecimal = value.includes(".");
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (step >= steps) { setDisplay(value); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function HeroSection() {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-background" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Floating tech logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {techLogos.map((tech, i) => {
          const positions = [
            { top: "15%", left: "8%" },
            { top: "25%", right: "6%" },
            { top: "60%", left: "5%" },
            { top: "70%", right: "8%" },
            { top: "40%", right: "3%" },
            { top: "80%", left: "12%" },
            { top: "10%", right: "15%" },
            { top: "55%", left: "2%" },
          ];
          const pos = positions[i] || { top: "50%", left: "50%" };
          return (
            <motion.div
              key={tech.name}
              className="absolute hidden lg:flex items-center justify-center rounded-xl text-xs font-semibold px-3 py-1.5 border"
              style={{
                ...pos,
                color: tech.color,
                backgroundColor: tech.bg,
                borderColor: `${tech.color}30`,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
            >
              {tech.name}
            </motion.div>
          );
        })}
      </div>

      <div className="container-max section-padding !py-0 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
              <MapPin size={14} className="text-blue-400" />
              Bengaluru, India
              <span className="w-px h-3 bg-blue-500/40" />
              <Sparkles size={12} className="text-amber-400" />
              <span className="text-xs text-amber-300">Available for Senior Roles & Consulting</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Building Modern{" "}
            <span className="gradient-text">Data Platforms</span>,{" "}
            Analytics Products{" "}
            <span className="text-foreground/70">&amp;</span>{" "}
            <span className="gradient-text-amber">Executive Insights</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 hover:shadow-blue-500/30 transition-all gap-2 cursor-pointer"
              onClick={() => handleScroll("#projects")}
            >
              View Projects
              <ArrowRight size={16} />
            </Button>
            <LinkButton
              href={profile.resumeUrl}
              download
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 hover:bg-white/10 text-foreground gap-2 backdrop-blur-sm"
            >
              <Download size={16} />
              Download Resume
            </LinkButton>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-white/5"
              onClick={() => handleScroll("#contact")}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                className="glass rounded-xl p-4 text-center group hover:border-blue-500/30 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest opacity-60">Scroll</span>
        <ChevronDown size={16} className="opacity-60" />
      </motion.div>
    </section>
  );
}
