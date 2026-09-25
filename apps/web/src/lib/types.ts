// Mirrors apps/api/src/types.ts.
export interface Highlight {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  yearsOfExperience: number;
  currentRole: { title: string; company: string };
  summary: string;
  about: string[];
  highlights: Highlight[];
  links: SocialLink[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}
