import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Anshul Akotkar — Senior Software Engineer",
  description:
    "Frontend-heavy full-stack engineer (React, Next.js, React Native, Node.js) building AI-powered experiences at scale.",
  openGraph: {
    title: "Anshul Akotkar — Senior Software Engineer",
    description: "Portfolio, skills and impact.",
    type: "website",
  },
  // The preview image itself comes from app/opengraph-image.tsx.
  twitter: {
    card: "summary_large_image",
  },
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
