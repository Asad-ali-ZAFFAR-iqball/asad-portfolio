import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { personalInfo } from "@/data";
import { SITE_URL, withBasePath } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Origin only: Next already adds basePath to file-based metadata (og image, icons).
  metadataBase: new URL(new URL(SITE_URL).origin),
  // Next 14 omits basePath on the auto-generated manifest link, so set it explicitly.
  manifest: withBasePath("/manifest.webmanifest"),
  title: {
    default: "Asad Ali Zaffar — Laravel Developer & Full-Stack Engineer",
    template: "%s | Asad Ali Zaffar",
  },
  description:
    "Laravel Developer and Full-Stack Engineer with 3+ years of experience building scalable web applications with PHP, Laravel, TypeScript, Vue.js and React.js. Based in Lahore, Pakistan.",
  keywords: [
    "Laravel Developer",
    "Full-Stack Engineer",
    "PHP",
    "Laravel",
    "Vue.js",
    "React.js",
    "TypeScript",
    "Inertia.js",
    "Redis",
    "Docker",
    "Pakistan",
    "Lahore",
    "Asad Ali Zaffar",
  ],
  authors: [{ name: "Asad Ali Zaffar", url: `${SITE_URL}/` }],
  creator: "Asad Ali Zaffar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: "Asad Ali Zaffar Portfolio",
    title: "Asad Ali Zaffar — Laravel Developer & Full-Stack Engineer",
    description:
      "Laravel Developer and Full-Stack Engineer building scalable web apps with PHP, Laravel, TypeScript, Vue.js and React.js.",
    // og:image comes from src/app/opengraph-image.png (file convention keeps basePath right).
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad Ali Zaffar — Laravel Developer & Full-Stack Engineer",
    description:
      "Laravel Developer and Full-Stack Engineer building scalable web apps with PHP, Laravel, TypeScript, Vue.js and React.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#101422" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  description: personalInfo.tagline,
  url: `${SITE_URL}/`,
  email: `mailto:${personalInfo.email}`,
  telephone: personalInfo.phone,
  address: { "@type": "PostalAddress", addressLocality: personalInfo.location },
  sameAs: personalInfo.socials.map((s) => s.url).filter((u) => u.startsWith("http")),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          // JSON-LD Person schema so search engines and AI answers can tie the name, role and profiles together.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-600 focus:text-on-brand focus:font-semibold"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div className="ambient-light" aria-hidden />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
