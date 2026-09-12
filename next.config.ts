import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export",
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/signal-13-archive",
        assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "/signal-13-archive",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
