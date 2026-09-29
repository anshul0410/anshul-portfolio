// Shared response shapes. Mirrored in apps/web/src/lib/types.ts —
// if this grows, move both into a packages/shared workspace.

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
  /** The "off the clock" bio shown in the About section. */
  personal: Personal;
}

export interface Personal {
  intro: string;
  passions: { emoji: string; name: string; note: string }[];
  outro?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface WorkItem {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Shown next to the eyebrow on the featured card, e.g. company and role. */
  meta?: string;
  metrics?: Highlight[];
  tags: string[];
  featured?: boolean;
}

export interface Role {
  company: string;
  location: string;
  title: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or omitted for the current role */
  end?: string;
  summary: string;
  tech: string[];
}

export interface Education {
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface Experience {
  roles: Role[];
  education: Education[];
}
