import type { Config } from "next";

const config: Config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_NAME: "WAVE Media",
    NEXT_PUBLIC_SITE_URL: "https://wavemedianj.com",
  },
  serverRuntimeConfig: {
    maxRequestSize: '50mb',
  },
};

export default config;
