"use client";

import { Printer } from "lucide-react";

/** Opens the browser's print dialog, where "Save as PDF" is one of the options. */
export function PrintButton() {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()}>
      <Printer size={16} aria-hidden /> Print or save as PDF
    </button>
  );
}
