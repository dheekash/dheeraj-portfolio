/**
 * The site's public address, used for canonical URLs, link previews,
 * robots.txt and the sitemap. Set NEXT_PUBLIC_SITE_URL in Vercel when a
 * custom domain is connected; until then this is the live Vercel address.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://the-data-guy-dheeraj-portfolio.vercel.app").replace(/\/$/, "");

/**
 * Metadata for an inner page. Next replaces the layout's openGraph and
 * twitter objects wholesale when a page sets them, and keeps the home
 * page's title, description and URL when it doesn't, so every inner page
 * states all three here. The page's opengraph-image file is still added.
 */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  const full = `${title} | Dheeraj Kashyap`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, locale: "en_US", siteName: "Dheeraj Kashyap", url: `${SITE_URL}${path}`, title: full, description },
    twitter: { card: "summary_large_image" as const, title: full, description },
  };
}
