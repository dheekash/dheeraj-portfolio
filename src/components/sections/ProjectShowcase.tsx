"use client";

import { useRef, useState } from "react";

/**
 * Product-card showcase: the coloured panel and the details on the right
 * show one project at a time; the thumbnails along the bottom of the panel
 * switch between them. The slides are rendered on the server and passed in,
 * so this only owns which one is showing. Tabs pattern: arrow keys, Home
 * and End move between thumbnails.
 */
export function ProjectShowcase({
  covers,
  thumbs,
  infos,
  labels,
}: {
  covers: React.ReactNode[];
  thumbs: React.ReactNode[];
  infos: React.ReactNode[];
  labels: string[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + labels.length) % labels.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: labels.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      go(keys[e.key]);
    }
  };

  return (
    <div className="pc">
      <div className="pc-photo">
        {covers.map((c, i) => (
          <div key={i} className="pc-main" hidden={i !== active} aria-hidden>
            {c}
          </div>
        ))}
        <div className="pc-album" role="tablist" aria-label="Choose a project" onKeyDown={onKey}>
          {thumbs.map((t, i) => (
            <button
              key={i}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`pc-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`pc-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              className="pc-thumb"
              onClick={() => setActive(i)}
            >
              {t}
              <span className="sr-only">{labels[i]}</span>
            </button>
          ))}
        </div>
      </div>
      {infos.map((n, i) => (
        <div key={i} id={`pc-panel-${i}`} role="tabpanel" aria-labelledby={`pc-tab-${i}`} className="pc-info" hidden={i !== active}>
          {n}
        </div>
      ))}
    </div>
  );
}
