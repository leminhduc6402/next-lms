import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.fullstack.edu.vn"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10gb",
    },
  },
};

export default nextConfig;
