import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Évite les builds cassés si un package-lock.json existe dans le dossier parent
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
