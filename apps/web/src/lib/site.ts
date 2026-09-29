// Canonical address of the site. Search engines are told this is the one true
// URL (canonical tags, sitemap, structured data), whichever host served the page.
export const SITE_URL = (process.env.SITE_URL ?? "https://anshulakotkar.is-a.dev").replace(/\/$/, "");

export const SITE_TITLE = "Anshul Akotkar — Senior Software Engineer (React, Next.js, Node.js, AI)";

export const SITE_DESCRIPTION =
  "Anshul Akotkar is a Senior Software Engineer in Bengaluru building AI-powered, agentic experiences with React, Next.js, React Native and Node.js at scale.";

/** Only the production deployment should be indexed; previews and local runs are not. */
export const IS_INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
