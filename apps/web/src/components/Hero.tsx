import type { Profile } from "@/lib/types";
import { AgentCard } from "./AgentCard";
import { CountUp } from "./motion/CountUp";
import { PointerGlow } from "./motion/PointerGlow";
import { Reveal } from "./motion/Reveal";
import { buttonClass, linkProps } from "./ui";

const HIGHLIGHT = "AI-powered experiences";

function Tagline({ text }: { text: string }) {
  const i = text.indexOf(HIGHLIGHT);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="bg-linear-to-r from-accent-soft to-cyan bg-clip-text text-transparent">{HIGHLIGHT}</span>
      {text.slice(i + HIGHLIGHT.length)}
    </>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -top-24 overflow-hidden">
      <div className="absolute top-[-160px] left-[12%] h-[420px] w-[620px] animate-drift rounded-full bg-accent/35 blur-[160px]" />
      <div className="absolute top-10 right-[5%] h-[380px] w-[520px] animate-drift rounded-full bg-cyan/15 blur-[160px] [animation-delay:-7s]" />
      <div className="absolute top-[420px] left-[36%] h-[260px] w-[420px] animate-drift rounded-full bg-violet-500/20 blur-[140px] [animation-delay:-13s]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    </div>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  const { currentRole } = profile;

  return (
    <section id="top" className="relative">
      <Backdrop />
      <PointerGlow />
      <div className="relative container-page pt-16 pb-24 sm:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_440px]">
          <Reveal className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1.5 pr-3.5 pl-3 text-[13px] font-medium text-muted">
              <span className="size-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
              {currentRole.title} · {currentRole.company} · {profile.location}
            </p>
            <h1 className="text-5xl leading-none font-extrabold tracking-[-0.04em] text-fg sm:text-7xl lg:text-[84px]">
              {profile.name}
            </h1>
            <p className="max-w-[600px] text-2xl leading-[1.3] font-medium tracking-[-0.01em] text-fg sm:text-[28px]">
              <Tagline text={profile.tagline} />
            </p>
            <p className="max-w-[580px] text-[17px] leading-relaxed text-muted">{profile.summary}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#work" className={buttonClass("primary")}>
                See my work <span aria-hidden>→</span>
              </a>
              {profile.links.map((link) => (
                <a key={link.label} {...linkProps(link.href)} className={buttonClass("ghost")}>
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <AgentCard />
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profile.highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-surface/70 p-6 transition hover:border-accent/60">
                <dd className="text-3xl font-bold tracking-[-0.02em] whitespace-nowrap text-fg sm:text-4xl">
                  <CountUp value={h.value} />
                </dd>
                <dt className="mt-2 text-sm text-muted">{h.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
