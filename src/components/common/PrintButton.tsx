"use client";

import { Printer } from "lucide-react";

/** Opens the browser's print dialog for the web version of the CV. */
export function PrintButton() {
  return (
    <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
      <Printer size={16} aria-hidden /> Print this page
    </button>
  );
}
