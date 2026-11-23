import type { NextConfig } from "next";

const desarrollo = process.env.NODE_ENV === "development";
const indexar = process.env.VERAX_INDEXAR === "si";

const politica = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${desarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const cabeceras = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ...(desarrollo ? [] : [{ key: "Content-Security-Policy", value: politica }]),
  ...(indexar ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const config: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: true,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: cabeceras }];
  },
};

export default config;
