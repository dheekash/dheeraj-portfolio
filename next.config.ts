import type { NextConfig } from "next";

/* Security headers. The CSP is deliberately limited to directives that
   cannot break the page (framing, plugins, base URL, form targets); a full
   script/style policy would need nonces for Next's inline scripts. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // The old /deck presentation was retired; send old links home.
    return [{ source: "/deck", destination: "/", permanent: true }];
  },
};

export default nextConfig;
