"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const contents = [
  { num: "01", label: "The brief", href: "#brief" },
  { num: "02", label: "Case files", href: "#case-files" },
  { num: "03", label: "The path", href: "#path" },
  { num: "04", label: "Method", href: "#method" },
  { num: "05", label: "Contact", href: "#contact" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function CoverSection() {
  return (
    <section id="top" className="relative">
      <div className="container-page pt-[clamp(2.5rem,1.5rem+4vw,6rem)] pb-[clamp(4rem,2.5rem+5vw,7rem)]">
        {/* Dateline */}
        <motion.div {...fadeUp(0)} className="flex items-baseline justify-between rule-thick pt-4 mb-[clamp(3rem,2rem+5vw,6rem)]">
          <p className="kicker">A portfolio of decisions, not dashboards</p>
          <p className="kicker hidden sm:block">Bengaluru · {new Date().getFullYear()}</p>
        </motion.div>

        {/* Cover statement */}
        <motion.h1 {...fadeUp(0.1)} className="max-w-[14ch] mb-[clamp(2.5rem,1.5rem+4vw,4rem)]">
          Numbers that change{" "}
          <span className="serif-italic text-rust">minds.</span>
        </motion.h1>

        {/* Asymmetric: lede offset right, TOC pinned left */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <motion.nav
            {...fadeUp(0.25)}
            aria-label="Contents"
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <p className="kicker mb-4">Contents</p>
            <ul>
              {contents.map((c) => (
                <li key={c.num} className="rule-thin">
                  <a
                    href={c.href}
                    className="group flex items-baseline gap-5 py-2.5 text-sm hover:text-rust transition-colors"
                  >
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-rust transition-colors">
                      {c.num}
                    </span>
                    <span className="font-medium">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div {...fadeUp(0.18)} className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2">
            <p className="lede mb-8">
              I&apos;m Dheeraj Kashyap, a business intelligence consultant. For six
              years — from Amazon&apos;s marketplace investigations to boardrooms in
              eight markets — I&apos;ve turned ambiguous business questions into
              evidence executives can act on, and defend.
            </p>
            <p className="text-sm text-muted-foreground">
              Currently at Amplify Analytix ·{" "}
              <a href={`mailto:${profile.email}`} className="link-editorial text-foreground">
                Open to senior analytics roles
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
