import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // AVIF first where supported, WebP fallback
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
