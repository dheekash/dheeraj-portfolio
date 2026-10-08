/**
 * The site's public address, used for canonical URLs, link previews,
 * robots.txt and the sitemap. Set NEXT_PUBLIC_SITE_URL in Vercel when a
 * custom domain is connected; until then this is the live Vercel address.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://the-data-guy-dheeraj-portfolio.vercel.app").replace(/\/$/, "");
