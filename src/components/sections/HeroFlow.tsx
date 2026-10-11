import { Mark } from "@/components/common/Mark";

/* Sources: a database with a document in front of it, as a line icon. */
function SourcesMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mark" aria-hidden fill="none" stroke="#255DCE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="9" cy="5" rx="6" ry="2.2" />
      <path d="M3 5v13c0 1.2 2.7 2.2 6 2.2h2.5M15 5v3.5" />
      <path d="M3 9.5c0 1.2 2.7 2.2 6 2.2h2.5M3 14c0 1.2 2.7 2.2 6 2.2h2.5" />
      <g fill="#255DCE" stroke="none">
        <circle cx="5.6" cy="18" r="0.85" />
        <circle cx="7.8" cy="18" r="0.85" />
        <circle cx="10" cy="18" r="0.85" />
      </g>
      <path d="M13 9h6.5a1 1 0 0 1 1 1v8.5l-3 3H13a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z" fill="#FFFFFF" />
      <path d="M20.5 18.5h-2a1 1 0 0 0-1 1v2M14.5 12h4M14.5 14.5h4M14.5 17h2.2" />
    </svg>
  );
}

/* Semantic model: a central table branching out to the tables it relates to. */
function SemanticModelMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mark" aria-hidden fill="none" stroke="#255DCE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 5.6c0 2.6 5 2.4 5 4.9M17.5 5.6c0 2.6-4 2.4-4 4.9M5.2 12h2.3M16.5 12h2.3M6 18.4c0-2.6 4.5-2.4 4.5-4.9M17.75 18.4c0-2.6-4.25-2.4-4.25-4.9" />
      <rect x="2.5" y="3" width="6" height="2.6" rx="1.3" />
      <rect x="14" y="3" width="7" height="2.6" rx="1.3" />
      <rect x="0.8" y="10.7" width="4.4" height="2.6" rx="1.3" />
      <rect x="18.8" y="10.7" width="4.4" height="2.6" rx="1.3" />
      <rect x="2.5" y="18.4" width="7" height="2.6" rx="1.3" />
      <rect x="14.5" y="18.4" width="6.5" height="2.6" rx="1.3" />
      <rect x="7.5" y="10.5" width="9" height="3" rx="1.5" fill="#DCE6FB" />
    </svg>
  );
}

/* The path a typical build takes, left to right. Labels name the stages;
   the moving dots are decoration only. */
const stages = [
  { label: "Sources", icon: <SourcesMark /> },
  { label: "Fabric lakehouse", icon: <Mark name="Microsoft Fabric" size={24} /> },
  { label: "Semantic model", icon: <SemanticModelMark /> },
  { label: "Power BI report", icon: <Mark name="Power BI" size={24} /> },
];

/**
 * Hero data-flow strip: data moving from sources through a lakehouse and
 * semantic model into a report. Wide screens only; static under reduced
 * motion.
 */
export function HeroFlow() {
  return (
    <div className="container hflow hero-anim" style={{ "--d": 4 } as React.CSSProperties} aria-hidden>
      {stages.map((s, i) => (
        <div key={s.label} className="hflow-step">
          {i > 0 && (
            <span className="hflow-link" style={{ "--i": i } as React.CSSProperties}>
              <span className="hflow-dot" />
              <span className="hflow-dot" />
              <span className="hflow-dot" />
            </span>
          )}
          <span className="hflow-node">
            <span className="hflow-ico">{s.icon}</span>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
