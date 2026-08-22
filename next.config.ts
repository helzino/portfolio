import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 rejects any quality not listed here.
    qualities: [60, 72, 75, 82, 85],
    // Content images may be supplied as remote URLs through environment
    // variables (see CONTENT.md), so any https host is allowed.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
