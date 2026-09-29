import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Add new pages here (e.g. /blog posts, /work case studies) as they are created.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
