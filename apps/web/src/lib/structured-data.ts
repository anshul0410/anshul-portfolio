import type { Experience, Profile, SkillCategory } from "./types";
import { SITE_URL } from "./site";

/**
 * schema.org Person + WebSite graph for the homepage. Helps search engines tie
 * searches for the name to this site and to the linked profiles (sameAs).
 */
export function personJsonLd(
  profile: Profile,
  skills: SkillCategory[],
  { experience, photoPath }: { experience?: Experience | null; photoPath?: string } = {},
) {
  const [city, country] = profile.location.split(",").map((part) => part.trim());
  const email = profile.links.find((link) => link.href.startsWith("mailto:"))?.href;
  const personId = `${SITE_URL}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: SITE_URL,
        jobTitle: profile.title,
        ...(photoPath && { image: `${SITE_URL}${photoPath}` }),
        description: profile.summary,
        worksFor: { "@type": "Organization", name: profile.currentRole.company },
        address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country },
        ...(email && { email }),
        sameAs: profile.links.filter((link) => link.href.startsWith("http")).map((link) => link.href),
        knowsAbout: skills.flatMap((category) => category.skills).slice(0, 20),
        ...(experience?.education.length && {
          alumniOf: experience.education.map((edu) => ({ "@type": "CollegeOrUniversity", name: edu.school })),
        }),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        author: { "@id": personId },
      },
    ],
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so it can't close the tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
