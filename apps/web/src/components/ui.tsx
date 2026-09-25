export type ButtonVariant = "primary" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold text-fg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-accent to-violet-500 shadow-[0_8px_24px_-6px_rgb(99_102_241/0.45)] hover:shadow-[0_10px_32px_-6px_rgb(99_102_241/0.7)] hover:brightness-110",
  ghost: "border border-line bg-surface/60 hover:border-accent/60 hover:bg-raised",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

/** Link props for a profile link: external links open in a new tab. */
export function linkProps(href: string) {
  return href.startsWith("http") ? { href, target: "_blank", rel: "noreferrer" } : { href };
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-raised px-3 py-1.5 text-[13px] font-medium text-fg transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent-soft">
      {children}
    </li>
  );
}

export function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}

export function Eyebrow({ children, className = "text-accent-soft" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-[13px] font-medium tracking-[0.12em] uppercase ${className}`}>{children}</p>;
}
