import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  // Resolves relative URLs (canonical, Open Graph image) against the canonical domain.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Future pages (blog posts, case studies) become "Post title · Anshul Akotkar".
    template: "%s · Anshul Akotkar",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Anshul Akotkar", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Anshul Akotkar",
    locale: "en_IN",
    type: "profile",
  },
  // The preview image itself comes from app/opengraph-image.tsx.
  twitter: {
    card: "summary_large_image",
  },
  // Google Search Console ownership check (HTML tag method). Set in Vercel env vars.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#070a13",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        {children}
        {/* Vercel Web Analytics (visitors) and Speed Insights (real-user Core Web Vitals).
            Both are no-ops outside Vercel deployments. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
