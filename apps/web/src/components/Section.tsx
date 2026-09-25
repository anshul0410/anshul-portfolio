import { Reveal } from "./motion/Reveal";
import { Eyebrow } from "./ui";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container-page scroll-mt-24 py-20 sm:py-28">
      <Reveal className="space-y-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] text-fg sm:text-5xl sm:leading-[1.1]">{title}</h2>
        {subtitle && <p className="max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>}
      </Reveal>
      <div className="mt-14">{children}</div>
    </section>
  );
}
