import type { MetadataRoute } from "next";

/**
 * Web app manifest for PWA / installability.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asad Ali Zaffar — Senior Software Engineer",
    short_name: "Asad.dev",
    description: "Portfolio of Asad Ali Zaffar — Senior Software Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
