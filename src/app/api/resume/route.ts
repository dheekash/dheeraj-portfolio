import { NextResponse } from "next/server";

/* Old CV link, kept so anything that still points here lands on the
   printable CV page instead of a Google Drive sign-in. */
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/cv", request.url), 308);
}
