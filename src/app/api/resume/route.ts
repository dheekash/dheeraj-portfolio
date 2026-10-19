import { NextResponse } from "next/server";
import { CV_PDF } from "@/lib/site";

/* Old CV link, kept so anything that still points here gets the résumé PDF
   instead of a Google Drive sign-in. */
export function GET(request: Request) {
  return NextResponse.redirect(new URL(CV_PDF, request.url), 308);
}
