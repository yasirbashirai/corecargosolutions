import type { NextConfig } from "next";

// Static-friendly config: images are local, so no remote patterns needed
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
