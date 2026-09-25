import type { Profile } from "@/lib/types";
import { Reveal } from "./motion/Reveal";
import { Chips, Eyebrow } from "./ui";

const CORE_STACK = ["React", "Next.js", "React Native", "Node.js"];

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="container-page scroll-mt-24 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-20">
        <Reveal className="space-y-3.5">
          <Eyebrow>About me</Eyebrow>
          <h2 className="text-4xl font-bold tracking-[-0.03em] text-fg sm:text-[44px] sm:leading-[1.1]">
            {profile.yearsOfExperience} years of shipping products people use
          </h2>
          <div className="pt-3">
            <Chips items={CORE_STACK} />
          </div>
        </Reveal>
        <div className="space-y-5 text-[17px] leading-relaxed">
          {profile.about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className={i === 0 ? "text-fg" : "text-muted"}>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
