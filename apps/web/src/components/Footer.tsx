import type { Profile } from "@/lib/types";
import { linkProps } from "./ui";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line pt-8 pb-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-[13px] text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with Next.js and Node.js
        </p>
        <ul className="flex gap-6 font-medium">
          {profile.links.map((link) => (
            <li key={link.label}>
              <a {...linkProps(link.href)} className="transition hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
