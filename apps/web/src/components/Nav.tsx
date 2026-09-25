"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "./ui";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
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
  const [active, setActive] = useState<string | null>(null);

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-6 pb-2">
      <nav className="flex items-center gap-6 rounded-full border border-line bg-surface/95 py-2 pr-2 pl-3 shadow-[0_10px_30px_rgb(0_0_0/0.35)] md:bg-surface/70 md:backdrop-blur-xl sm:gap-10 sm:pl-5">
        <a href="#top" className="flex items-center gap-2.5 font-semibold text-fg">
          <span className="grid size-8 place-items-center rounded-[10px] bg-linear-to-br from-accent to-cyan text-[13px] font-extrabold">
            {initials(name)}
          </span>
          <span className="hidden text-[15px] sm:inline">{name}</span>
        </a>
        <ul className="hidden gap-7 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`transition hover:text-fg ${active === link.id ? "text-fg" : "text-muted"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={buttonClass("primary", "rounded-full px-4 py-2 text-sm")}>
          Get in touch
        </a>
      </nav>
    </header>
  );
}
