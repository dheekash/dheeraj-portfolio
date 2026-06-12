"use client";

import { motion } from "framer-motion";

/**
 * Career as a chronology with marginal years — the way an annual report
 * tells company history — rather than a dotted timeline of cards.
 */
const chapters = [
  {
    years: "2019–20",
    place: "Frontizo · Bengaluru",
    role: "Customer support, Amazon-operated facility",
    story:
      "Where the question first appeared. Answering escalations all day, I kept seeing patterns nobody upstream was measuring — the same failure modes, the same root causes. I started keeping score in Excel. The escalation rate dropped, and I learned the lesson that shaped everything after: the data already knows; someone just has to ask it.",
  },
  {
    years: "2020–24",
    place: "Amazon · Bengaluru",
    role: "Investigation specialist, then analytics lead",
    story:
      "Five years inside the marketplace's immune system. Fraud investigation taught me to interrogate data adversarially — every number is a claim, and claims get verified. By the end I was building the evidence itself: a forecasting dashboard over 100M+ records that surfaced $500K in revenue opportunities and ended up in senior leadership's weekly business review across eight markets.",
  },
  {
    years: "2025–",
    place: "Amplify Analytix · Bengaluru",
    role: "BI & analytics engineer, global clients",
    story:
      "The consulting years. Now I design the whole instrument — Fabric lakehouses, Databricks pipelines, Snowflake warehouses, Power BI semantic models with a hundred-plus measures — for clients who need their data platform to be boring, reliable, and quietly decisive. The Amazon habit remains: never present a number you can't defend under cross-examination.",
  },
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function PathSection() {
  return (
    <section id="path" className="bg-[#EFEAE0]">
      <div className="container-page section-pad">
        <motion.div {...reveal()} className="flex items-baseline gap-5 rule-thick pt-4 mb-4">
          <span className="font-mono text-xs text-rust">03</span>
          <h2 className="text-2xl lg:text-3xl">The path</h2>
        </motion.div>
        <motion.p {...reveal(0.05)} className="lede max-w-[40ch] mb-[clamp(3rem,2rem+4vw,5rem)] text-muted-foreground">
          From answering escalations to architecting the systems that prevent
          them — in three chapters.
        </motion.p>

        <div className="max-w-4xl">
          {chapters.map((c, i) => (
            <motion.article
              key={c.years}
              {...reveal(0.05 + i * 0.05)}
              className="grid sm:grid-cols-[minmax(7rem,9rem)_1fr] gap-x-[clamp(1.5rem,4vw,2.5rem)] gap-y-3 rule-thin py-[clamp(2rem,1.5rem+2vw,3rem)]"
            >
              <div>
                <p className="font-serif text-2xl font-semibold tracking-tight">{c.years}</p>
                <p className="font-mono text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  {c.place}
                </p>
              </div>
              <div>
                <h3 className="text-lg lg:text-xl mb-4">{c.role}</h3>
                <p className="text-[15px] leading-[1.85] text-foreground/85 max-w-prose">
                  {c.story}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
