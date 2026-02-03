import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trqxlmj192.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
