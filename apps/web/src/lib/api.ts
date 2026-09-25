import type { Profile, SkillCategory, WorkItem } from "./types";

// Server-side only: read at build time and on background revalidation.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

// Keep in sync with `revalidate` in app/page.tsx.
const REVALIDATE_SECONDS = 300;

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error(`API request ${path} failed with ${res.status}`);
  }
  return (await res.json()) as T;
}

export const getProfile = () => get<Profile>("/api/profile");
export const getSkills = () => get<SkillCategory[]>("/api/skills");
export const getWork = () => get<WorkItem[]>("/api/work");
