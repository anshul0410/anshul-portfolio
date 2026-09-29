import type { Profile } from "@/lib/types";
import { RESUME } from "@/lib/site";
import { DownloadIcon, LinkIcon } from "./icons";
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
              <a {...linkProps(link.href)} className="inline-flex items-center gap-1.5 transition hover:text-fg">
                <LinkIcon href={link.href} size={15} />
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a {...RESUME} className="inline-flex items-center gap-1.5 transition hover:text-fg">
              <DownloadIcon size={15} />
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
