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

export interface WorkItem {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string;
  metrics?: Highlight[];
  tags: string[];
  featured?: boolean;
}

export interface Role {
  company: string;
  location: string;
  title: string;
  start: string;
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
