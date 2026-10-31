"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Figure } from "@/components/common/Figure";

export type ReportStudy = {
  slug: string;
  tab: string;
  title: string;
  meta: string;
  lead: { value: string; label: string; ratio: number | null };
  more: { value: string; label: string }[];
  /** Server-rendered lead-technology mark (Mark reads the filesystem). */
  mark: React.ReactNode;
};

/**
 * The hero's "report page": KPI cards across the top, a slicer of featured
 * case studies, and the selected study's headline result as a before/after
 * bar visual with two supporting cards. It behaves like a small report:
 * the slicer is a group of toggle buttons and the visual area announces
 * its change politely.
 */
export function ReportCanvas({ kpis, studies }: { kpis: { value: string; label: string }[]; studies: ReportStudy[] }) {
  const [i, setI] = useState(0);
  const s = studies[i];
  const vid = useId();

  return (
    <figure className="rc" aria-label="Impact report">
      <div className="rc-bar" aria-hidden>
        <span className="rc-dots"><span /><span /><span /></span>
        <span className="rc-file">impact-report</span>
        <span className="rc-live"><span className="rc-live-dot" /> Live</span>
      </div>

      <dl className="rc-kpis">
        {kpis.map((k) => (
          <div key={k.label} className="rc-kpi">
            <dt>{k.label}</dt>
            <dd>{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="rc-slicer" role="group" aria-label="Choose a case study" aria-controls={vid}>
        {studies.map((st, n) => (
          <button key={st.slug} type="button" aria-pressed={n === i} onClick={() => setI(n)} className="rc-chip">
            {st.tab}
          </button>
        ))}
      </div>

      <div id={vid} className="rc-visual" aria-live="polite">
        <div key={s.slug} className="rc-main">
          <p className="rc-meta"><span className="rc-mark">{s.mark}</span>{s.meta}</p>
          <p className="rc-lead"><Figure value={s.lead.value} /></p>
          <p className="rc-label">{s.lead.label}</p>
          {s.lead.ratio !== null && (
            <div className="rc-bars" style={{ "--r": Math.max(s.lead.ratio, 0.02) } as React.CSSProperties} aria-hidden>
              <span className="rc-bar-row"><span className="rc-bar-name">Before</span><span className="rc-bar-track"><span className="rc-bar-fill" /></span></span>
              <span className="rc-bar-row is-after"><span className="rc-bar-name">After</span><span className="rc-bar-track"><span className="rc-bar-fill" /></span></span>
            </div>
          )}
        </div>
        <dl key={s.slug + "-more"} className="rc-more">
          {s.more.map((m) => (
            <div key={m.label} className="rc-tile">
              <dt>{m.label}</dt>
              <dd><Figure value={m.value} /></dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="rc-foot">
        <span className="rc-title">{s.title}</span>
        <Link href={`/work/${s.slug}`} className="rc-open">
          Read case study <ArrowRight size={15} aria-hidden />
        </Link>
      </figcaption>
    </figure>
  );
}
