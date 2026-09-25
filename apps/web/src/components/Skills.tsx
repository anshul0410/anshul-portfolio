import type { SkillCategory } from "@/lib/types";
import { Section } from "./Section";

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <Section id="skills" eyebrow="Core skills" title="What I work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.id}
            className="rounded-2xl border border-slate-200 p-6 transition hover:border-accent/60 dark:border-slate-800"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
