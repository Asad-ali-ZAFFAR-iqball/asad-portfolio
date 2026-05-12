import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asadalizado.dev"),
  title: {
    default: "Asad Ali Zaffar — Senior Software Engineer",
    template: "%s | Asad Ali Zaffar",
  },
  description:
    "Senior Software Engineer with 8+ years of experience architecting scalable cloud-native systems, full-stack applications, and fintech platforms. Based in Lahore, Pakistan.",
  keywords: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Node.js",
    "React",
    "TypeScript",
    "Cloud Architecture",
    "AWS",
    "Kubernetes",
    "Fintech",
    "Pakistan",
    "Lahore",
    "Asad Ali Zaffar",
  ],
  authors: [{ name: "Asad Ali Zaffar", url: "https://asadalizado.dev" }],
  creator: "Asad Ali Zaffar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asadalizado.dev",
    siteName: "Asad Ali Zaffar Portfolio",
    title: "Asad Ali Zaffar — Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in distributed systems, cloud architecture, and enterprise full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asad Ali Zaffar — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad Ali Zaffar — Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in distributed systems, cloud architecture, and enterprise full-stack development.",
    images: ["/og-image.png"],
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
    canonical: "https://asadalizado.dev",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
