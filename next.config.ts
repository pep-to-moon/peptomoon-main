import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Link", value: '</llms.txt>; rel="alternate"; type="text/markdown"; title="Site summary for AI systems"' },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  // Two service pages were split into wholesale, dropshipping and 3PL pages. Permanent redirects keep old links working.
  async redirects() {
    return [
      { source: "/services/fulfillment-logistics", destination: "/services/peptide-3pl", permanent: true },
      { source: "/services/wholesale-dropshipping-3pl", destination: "/services/wholesale-peptides", permanent: true },
    ];
  },
  async headers() {
    const rules = [{ source: "/:path*", headers: securityHeaders }];
    // Preview and development deployments must never be indexed.
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      rules.push({ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] });
    }
    return rules;
  },
};

export default nextConfig;
