"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="container-page section-pad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-5 border-t-[3px] border-paper/90 pt-4 mb-[clamp(2.5rem,1.5rem+3vw,4rem)]">
            <span className="font-mono text-xs text-[#E08A6F]">05</span>
            <p className="font-serif text-2xl lg:text-3xl">Contact</p>
          </div>

          <h2 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.0] max-w-[16ch] mb-12">
            Bring me a decision that needs{" "}
            <span className="serif-italic text-[#E08A6F]">evidence.</span>
          </h2>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6">
              <p className="text-base leading-relaxed text-paper/70 max-w-prose mb-8">
                I&apos;m open to senior BI &amp; analytics roles, contract
                engagements and consulting. Write to me with the problem —
                I&apos;ll reply with how I&apos;d approach it.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="font-serif text-xl lg:text-2xl underline decoration-1 underline-offset-8 decoration-paper/40 hover:decoration-[#E08A6F] hover:text-[#E08A6F] transition-colors break-all"
              >
                {profile.email}
              </a>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <ul className="text-sm">
                {[
                  { label: "LinkedIn", href: profile.linkedinUrl },
                  { label: "GitHub", href: profile.githubUrl },
                  { label: "Book a 30-minute call", href: profile.calendlyUrl },
                  { label: "Résumé (PDF)", href: profile.resumeUrl },
                ].map((l) => (
                  <li key={l.label} className="border-t border-paper/20">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-3.5 text-paper/80 hover:text-[#E08A6F] transition-colors"
                    >
                      {l.label} <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Colophon */}
      <div className="border-t border-paper/20">
        <div className="container-page py-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-mono text-[11px] text-paper/50">
            © {new Date().getFullYear()} Dheeraj Kashyap · Bengaluru, India
          </p>
          <p className="font-mono text-[11px] text-paper/50">
            Set in Fraunces &amp; Inter · Designed and written by hand
          </p>
        </div>
      </div>
    </footer>
  );
}
