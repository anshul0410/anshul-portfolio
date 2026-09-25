import type { WorkItem } from "@/lib/types";
import { Reveal } from "./motion/Reveal";
import { SpotlightCard } from "./motion/SpotlightCard";
import { Chips, Eyebrow } from "./ui";
import { Section } from "./Section";

function FeaturedCard({ item }: { item: WorkItem }) {
  return (
    <SpotlightCard className="flex h-full flex-col gap-5 rounded-3xl border border-accent/45 bg-[linear-gradient(135deg,#1b1f4b,var(--color-surface))] p-7 sm:p-9">
      <p className="font-mono text-xs">
        <span className="font-medium tracking-[0.12em] text-cyan uppercase">{item.eyebrow}</span>
        {item.meta && <span className="text-muted"> · {item.meta}</span>}
      </p>
      <h3 className="text-3xl font-bold tracking-[-0.02em] text-fg sm:text-[34px]">{item.title}</h3>
      <p className="text-base leading-relaxed text-muted">{item.summary}</p>
      {item.metrics && (
        <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <dd className="bg-linear-to-r from-accent-soft to-cyan bg-clip-text text-[28px] font-bold text-transparent">
                {m.value}
              </dd>
              <dt className="text-[13px] text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-auto pt-2">
        <Chips items={item.tags} />
      </div>
    </SpotlightCard>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <SpotlightCard className="flex h-full flex-col gap-3.5 rounded-3xl border border-line bg-surface/70 p-7 transition hover:border-accent/50">
      <Eyebrow className="text-xs text-accent-soft">{item.eyebrow}</Eyebrow>
      <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-fg">{item.title}</h3>
      <p className="text-[15px] leading-relaxed text-muted">{item.summary}</p>
      {item.tags.length > 0 && (
        <div className="mt-auto pt-1">
          <Chips items={item.tags} />
        </div>
      )}
    </SpotlightCard>
  );
}

export function Work({ items }: { items: WorkItem[] }) {
  const featured = items.find((item) => item.featured);
  const rest = items.filter((item) => item !== featured);

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Impact I’ve shipped"
      subtitle="Production systems, not side projects — built for millions of customers and the teams behind them."
    >
      {/* Bento: featured spans 2×2, the next two stack beside it, the rest fill rows of three. */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured && (
          <Reveal className="md:col-span-2 lg:row-span-2">
            <FeaturedCard item={featured} />
          </Reveal>
        )}
        {rest.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 60}>
            <WorkCard item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
