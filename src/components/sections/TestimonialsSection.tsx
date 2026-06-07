"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Clients & Colleagues"
          titleHighlight="Say"
          description="Feedback from stakeholders, managers, and clients across enterprise engagements."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-card/50 hover:border-blue-500/20 transition-all group"
            >
              {t.placeholder && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground/60">
                    Placeholder
                  </span>
                </div>
              )}

              <Quote size={24} className="text-blue-500/30 mb-4" />

              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/20 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-300 font-semibold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-blue-300 transition-colors">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground/70">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Testimonials are illustrative placeholders. Real testimonials will be added as they become available.
        </p>
      </div>
    </section>
  );
}
