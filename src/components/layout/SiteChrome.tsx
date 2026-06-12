"use client";

import { usePathname } from "next/navigation";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIsolated = pathname.startsWith("/deck");

  if (isIsolated) {
    return <>{children}</>;
  }

  return (
    <main>{children}</main>
  );
}
