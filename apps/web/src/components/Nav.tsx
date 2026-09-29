"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RESUME } from "@/lib/site";
import { DownloadIcon } from "./icons";
import { buttonClass } from "./ui";

// Homepage sections; "Contact" is reached through the "Get in touch" button.
const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const active = pathname.startsWith("/blog") ? "blog" : activeSection;
  // Section links jump in place on the homepage and navigate there from other pages.
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const links = [
    ...sections.map((section) => ({ ...section, href: sectionHref(section.id) })),
    { id: "blog", label: "Blog", href: "/blog" },
  ];

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-6 pb-2">
      <nav className="flex items-center gap-6 rounded-full border border-line bg-surface/95 py-2 pr-2 pl-3 shadow-[0_10px_30px_rgb(0_0_0/0.35)] md:bg-surface/70 md:backdrop-blur-xl sm:gap-10 sm:pl-5">
        <a href={onHome ? "#top" : "/"} className="flex items-center gap-2.5 font-semibold text-fg">
          <span className="grid size-8 place-items-center rounded-[10px] bg-linear-to-br from-accent to-cyan text-[13px] font-extrabold">
            {initials(name)}
          </span>
          <span className="hidden text-[15px] sm:inline">{name}</span>
        </a>
        <ul className="hidden gap-7 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={`transition hover:text-fg ${active === link.id ? "text-fg" : "text-muted"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          {/* Section links are hidden on phones; keep Blog reachable. */}
          <a
            href="/blog"
            aria-current={active === "blog" ? "true" : undefined}
            className={`rounded-full px-2.5 py-2 text-sm font-medium transition hover:text-fg md:hidden ${
              active === "blog" ? "text-fg" : "text-muted"
            }`}
          >
            Blog
          </a>
          <a
            {...RESUME}
            aria-label="Download résumé (PDF)"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-raised hover:text-fg"
          >
            <DownloadIcon size={16} />
            <span className="hidden sm:inline">Résumé</span>
          </a>
          <a href={sectionHref("contact")} className={buttonClass("primary", "pill")}>
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
