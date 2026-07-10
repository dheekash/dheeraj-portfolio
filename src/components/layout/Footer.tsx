"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

const quickLinks = [
  { href: "#about",        label: "About"      },
  { href: "#skills",       label: "Skills"     },
  { href: "#case-studies", label: "Projects"   },
  { href: "#journey",      label: "Experience" },
  { href: "#contact",      label: "Contact"    },
];

export function Footer() {
  const hireHref = `mailto:${profile.email}?subject=${encodeURIComponent("Full-time opportunity — BI & Analytics Engineer")}`;
  const consultHref = `mailto:${profile.email}?subject=${encodeURIComponent("Consulting engagement — Fabric / Databricks")}`;

  return (
    <footer id="contact" className="relative overflow-hidden text-foreground">
      {/* Sine-wave divider */}
      <svg aria-hidden viewBox="0 0 1440 64" preserveAspectRatio="none" className="block w-full h-12">
        <path
          d="M0 40 C 180 8, 360 8, 540 34 S 900 62, 1080 38 S 1350 10, 1440 26 L 1440 64 L 0 64 Z"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M0 40 C 180 8, 360 8, 540 34 S 900 62, 1080 38 S 1350 10, 1440 26"
          fill="none"
          stroke="url(#footwave)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="footwave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Single warm peach note in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 88% 115%, var(--nebula-1) 0%, var(--nebula-2) 45%, transparent 72%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container-page section-pad relative"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ── Connect / contact CTA ── */}
          <div className="lg:col-span-1">
            <p className="eyebrow mb-4">Get in touch</p>
            <h2
              className="mb-6"
              style={{ fontSize: "clamp(2.1rem,1.4rem+1.9vw,3rem)", lineHeight: 1.1 }}
            >
              Let&apos;s build analytics systems{" "}
              <span className="text-gradient">that scale.</span>
            </h2>

            {/* CTA split — full-time (shimmering) / consulting (dashed) */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={hireHref}
                className="gradient-btn shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Hire for full-time <ArrowRight size={15} />
              </a>
              <a
                href={consultHref}
                className="dash-btn inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Engage for consulting
              </a>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-[36ch]">
              Open to full-time BI &amp; Analytics Engineering roles and enterprise Fabric / Databricks consulting. Remote or Bengaluru-based.
            </p>

            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5" style={{ background: "color-mix(in srgb, var(--success) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 30%, transparent)" }}>
              <span className="relative flex w-2 h-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "var(--success)" }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: "var(--success)" }} />
              </span>
              <span className="text-[13px] font-medium" style={{ color: "var(--success)" }}>Currently available</span>
            </div>
          </div>

          {/* ── Explore ── */}
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <nav className="space-y-2.5 text-[15px]">
              {quickLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <address className="space-y-2.5 text-[15px] not-italic text-muted-foreground">
              <p>Bengaluru, India</p>
              <p>IST (UTC+5:30)</p>
              <a
                href={`mailto:${profile.email}`}
                className="block break-all transition-colors hover:text-foreground"
              >
                {profile.email}
              </a>
              <p className="pt-1 text-foreground">Usually replies within 24 hours.</p>
            </address>
          </div>

          {/* ── Follow ── */}
          <div>
            <p className="eyebrow mb-4">Follow</p>
            <div className="social-pill mb-6">
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-orb li">
                <svg viewBox="0 -2 44 44">
                  <g stroke="none" strokeWidth="1">
                    <g transform="translate(-702.000000, -265.000000)">
                      <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" />
                    </g>
                  </g>
                </svg>
              </a>

              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-orb gh">
                <svg viewBox="-2.5 0 19 19">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z" />
                </svg>
              </a>

              <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-orb ig">
                <svg viewBox="0 0 20 20">
                  <g stroke="none" strokeWidth="1">
                    <g transform="translate(-340.000000, -7439.000000)">
                      <g transform="translate(56.000000, 160.000000)">
                        <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" />
                      </g>
                    </g>
                  </g>
                </svg>
              </a>

              <a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-orb fb">
                <svg viewBox="0 0 310 310">
                  <path d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z" />
                </svg>
              </a>
            </div>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] text-foreground transition-opacity hover:opacity-70"
            >
              Download resume <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row md:text-left">
          <p className="text-[14px] text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap · Bengaluru, India
          </p>
          <p className="text-[13px] uppercase tracking-[0.12em]" style={{ color: "var(--ash)" }}>
            From raw data to executive decisions
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUp size={13} /> Back to top
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
