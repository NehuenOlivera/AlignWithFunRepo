import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xtprzolahofaihkihtby.supabase.co",
      },
    ],
  },
};

export default nextConfig;
