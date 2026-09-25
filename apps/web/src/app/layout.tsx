import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anshul Akotkar — Senior Software Engineer",
  description:
    "Frontend-heavy full-stack engineer (React, Next.js, React Native, Node.js) building AI-powered experiences at scale.",
  openGraph: {
    title: "Anshul Akotkar — Senior Software Engineer",
    description: "Portfolio, skills and impact.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
