import type { Profile } from "@/lib/types";
import { Section } from "./Section";

export function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about" eyebrow="About me" title={`${profile.yearsOfExperience} years of shipping products people use`}>
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {profile.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
