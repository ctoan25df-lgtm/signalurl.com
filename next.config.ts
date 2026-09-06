import type { NextConfig } from "next";

/** 한 페이지로 합치면서 내린 경로. 검색엔진에 영구 이동으로 알린다. */
const RETIRED_ROUTES = ["/claims", "/names", "/signals", "/mirrors", "/desk"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return RETIRED_ROUTES.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
