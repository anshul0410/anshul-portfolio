import type { Profile } from "@/lib/types";
import { CopyEmailButton } from "./CopyEmailButton";
import { Reveal } from "./motion/Reveal";
import { buttonClass, Eyebrow, linkProps } from "./ui";

export function Contact({ profile }: { profile: Profile }) {
  const emailLink = profile.links.find((link) => link.href.startsWith("mailto:"));
  const email = emailLink?.href.replace("mailto:", "");
  const others = profile.links.filter((link) => link !== emailLink);

  return (
    <section id="contact" className="container-page scroll-mt-24 py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-indigo-400/40 bg-[linear-gradient(135deg,#312e81,#1e1b4b_55%,#0e3a48)] px-6 py-16 text-center sm:px-16 sm:py-[72px]">
          <div
            aria-hidden
            className="glow pointer-events-none absolute -top-64 left-1/2 h-[540px] w-[740px] -translate-x-1/2"
            style={{ "--glow": "rgb(34 211 238 / 0.25)" } as React.CSSProperties}
          />
          <div className="relative flex flex-col items-center gap-6">
            <Eyebrow className="text-cyan">Let&apos;s talk</Eyebrow>
            <h2 className="max-w-[720px] text-4xl font-bold tracking-[-0.03em] text-fg sm:text-[52px] sm:leading-[1.1]">
              Let&apos;s build something people rely on.
            </h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-muted">
              Open to conversations about frontend platforms, agentic AI and engineering leadership.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {email && (
                <>
                  <a href={`mailto:${email}`} className={buttonClass("primary")}>
                    {email}
                  </a>
                  <CopyEmailButton email={email} />
                </>
              )}
              {others.map((link) => (
                <a key={link.label} {...linkProps(link.href)} className={buttonClass("ghost")}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
