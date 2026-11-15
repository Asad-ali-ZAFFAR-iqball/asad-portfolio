// GitHub Pages project site lives under /asad-portfolio. Set to "" once a custom domain is live.
const basePath = "/asad-portfolio"; // also hard-coded in public/manifest.webmanifest, public/robots.txt, public/llms.txt and SITE_URL (src/lib/utils.ts)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
