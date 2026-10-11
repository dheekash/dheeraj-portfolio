import { Mark } from "@/components/common/Mark";

/* Sources: three source databases of different sizes, in the same drawing
   as the databases in the {DK} logo. */
function SourcesMark() {
  const db = (cx: number, top: number, bottom: number, body: string, cap: string) => (
    <g stroke="#021861" strokeWidth="0.8">
      <path d={`M${cx - 4.5} ${top}V${bottom}A4.5 1.6 0 0 0 ${cx + 4.5} ${bottom}V${top}Z`} fill={body} />
      <ellipse cx={cx} cy={top} rx="4.5" ry="1.6" fill={cap} />
    </g>
  );
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mark" aria-hidden>
      {db(6, 9, 19, "#2C4A9A", "#4F6FC4")}
      {db(18, 11, 19, "#4F86F0", "#8FB0F5")}
      {db(12, 5, 20, "#255DCE", "#6F9BF3")}
    </svg>
  );
}

/* Semantic model: a star schema, one fact table joined to four dimensions. */
function SemanticModelMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mark" aria-hidden>
      <g stroke="#6F9BF3" strokeWidth="1.4">
        <path d="M12 12L4.5 4.5M12 12L19.5 4.5M12 12L4.5 19.5M12 12L19.5 19.5" />
      </g>
      <g fill="#8FB0F5" stroke="#021861" strokeWidth="0.6">
        <rect x="1.5" y="1.5" width="6" height="5" rx="1.2" />
        <rect x="16.5" y="1.5" width="6" height="5" rx="1.2" />
        <rect x="1.5" y="17.5" width="6" height="5" rx="1.2" />
        <rect x="16.5" y="17.5" width="6" height="5" rx="1.2" />
      </g>
      <rect x="7.5" y="8.5" width="9" height="7" rx="1.6" fill="#255DCE" stroke="#021861" strokeWidth="0.6" />
      <path d="M9.5 11h5M9.5 13h3" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
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
