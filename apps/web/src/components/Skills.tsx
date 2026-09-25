import type { SkillCategory } from "@/lib/types";
import { Reveal } from "./motion/Reveal";
import { SpotlightCard } from "./motion/SpotlightCard";
import { Chips } from "./ui";
import { Section } from "./Section";

// One accent per card, cycled if more categories are added.
const ACCENTS = ["#6366f1", "#8b5cf6", "#22d3ee", "#34d399", "#fbbf24", "#f472b6"];

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <Section id="skills" eyebrow="Core skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Reveal key={category.id} delay={(i % 3) * 60}>
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface/70 p-7 transition hover:border-accent/50">
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-10 place-items-center rounded-xl border font-mono text-[13px] font-medium"
                    style={{
                      color: accent,
                      background: `color-mix(in oklab, ${accent} 15%, transparent)`,
                      borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-muted">{category.skills.length} skills</span>
                </div>
                <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-fg">{category.title}</h3>
                <p className="text-[15px] text-muted">{category.description}</p>
                <Chips items={category.skills} />
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
