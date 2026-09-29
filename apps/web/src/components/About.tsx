import Image from "next/image";
import type { Profile } from "@/lib/types";
import photo from "@/assets/anshul-akotkar.jpg";
import { Reveal } from "./motion/Reveal";
import { Chips, Eyebrow } from "./ui";

const CORE_STACK = ["React", "Next.js", "React Native", "Node.js"];

function Portrait({ name }: { name: string }) {
  return (
    // Gradient ring in the brand colours around a rounded photo.
    <div className="w-44 rounded-[28px] bg-linear-to-br from-accent via-violet-500 to-cyan p-[2px] shadow-[0_20px_50px_-12px_rgb(99_102_241/0.45)] sm:w-56">
      <Image
        src={photo}
        alt={`Photo of ${name}`}
        placeholder="blur"
        sizes="(min-width: 640px) 224px, 176px"
        className="aspect-square rounded-[26px] object-cover"
      />
    </div>
  );
}

function OffTheClock({ personal }: { personal: NonNullable<Profile["personal"]> }) {
  return (
    <div className="space-y-5 rounded-3xl border border-line bg-surface/70 p-6 sm:p-7">
      <Eyebrow className="text-xs text-cyan">Off the clock</Eyebrow>
      <p className="text-[16px] leading-relaxed text-fg">{personal.intro}</p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {personal.passions.map((passion) => (
          <li
            key={passion.name}
            className="rounded-2xl border border-line bg-raised px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-accent/50"
          >
            <p className="flex items-center gap-2 font-semibold text-fg">
              <span aria-hidden className="text-lg">
                {passion.emoji}
              </span>
              {passion.name}
            </p>
            <p className="mt-1 text-sm leading-snug text-muted">{passion.note}</p>
          </li>
        ))}
      </ul>
      {personal.outro && <p className="text-[15px] text-muted">{personal.outro}</p>}
    </div>
  );
}

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="container-page scroll-mt-24 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-20">
        <Reveal className="space-y-3.5">
          <div className="pb-5">
            <Portrait name={profile.name} />
          </div>
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
          {profile.personal && (
            <Reveal delay={profile.about.length * 60}>
              <div className="pt-4">
                <OffTheClock personal={profile.personal} />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
