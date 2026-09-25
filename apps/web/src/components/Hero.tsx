import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="py-20 sm:py-28">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {profile.currentRole.title} · {profile.currentRole.company} · {profile.location}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
        {profile.name}
      </h1>
      <p className="mt-4 text-xl text-accent sm:text-2xl">{profile.tagline}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {profile.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#skills"
          className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white shadow-sm hover:bg-accent-soft"
        >
          See my skills
        </a>
        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {profile.highlights.map((h) => (
          <div key={h.label} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <dt className="text-sm text-slate-500 dark:text-slate-400">{h.label}</dt>
            <dd className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{h.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
