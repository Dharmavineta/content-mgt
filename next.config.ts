import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Only allow HTTPS images (recommended for security)
        hostname: "images.firstpost.com",
      },
      {
        protocol: "https",
        hostname: "www.devdiscourse.com",
      },
    ],
  },
};

export default nextConfig;
