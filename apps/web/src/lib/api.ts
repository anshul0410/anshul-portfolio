import type { Profile, SkillCategory, WorkItem } from "./types";

// Server-side only: read at request time on the Next.js server.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API request ${path} failed with ${res.status}`);
  }
  return (await res.json()) as T;
}

export const getProfile = () => get<Profile>("/api/profile");
export const getSkills = () => get<SkillCategory[]>("/api/skills");
export const getWork = () => get<WorkItem[]>("/api/work");
