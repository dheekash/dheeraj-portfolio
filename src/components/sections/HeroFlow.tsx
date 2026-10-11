import { Server } from "lucide-react";
import { Mark } from "@/components/common/Mark";

/* The path a typical build takes, left to right. Labels name the stages;
   the moving dots are decoration only. */
const stages = [
  { label: "Sources", icon: <Server size={18} strokeWidth={1.9} className="mark mark-neutral" aria-hidden /> },
  { label: "Fabric lakehouse", icon: <Mark name="Microsoft Fabric" size={18} /> },
  { label: "Semantic model", icon: <Mark name="DAX" size={18} /> },
  { label: "Power BI report", icon: <Mark name="Power BI" size={18} /> },
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
            {s.icon}
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
