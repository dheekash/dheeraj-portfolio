"use client";

import { useEffect, useState } from "react";
import { CV_PDF, CV_PDF_NAME } from "@/lib/site";

/**
 * The CV download as an animated pill (after a Uiverse.io button by
 * nazar-gavrylyk): on click the arrow drops into the circle, the circle
 * fills and the label rolls from "Download CV" to "Downloaded", then it
 * resets. It is a real download link, so it works without JavaScript.
 */
export function DownloadButton({ className = "", label = "Download CV" }: { className?: string; label?: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setDone(false), 2600);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <a
      href={CV_PDF}
      download={CV_PDF_NAME}
      className={`dlb${done ? " is-done" : ""} ${className}`.trim()}
      onClick={() => setDone(true)}
    >
      <span className="dlb-circle" aria-hidden>
        <svg className="dlb-icon" viewBox="0 0 24 24" fill="none">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19V5m0 14-4-4m4 4 4-4" />
        </svg>
        <span className="dlb-square" />
      </span>
      <span className="dlb-titles">
        <span className="dlb-title">{label}</span>
        <span className="dlb-title" aria-hidden>Downloaded</span>
      </span>
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}
