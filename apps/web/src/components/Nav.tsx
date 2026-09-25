const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
];

export function Nav({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-semibold text-slate-900 dark:text-white">
          {name}
        </a>
        <ul className="flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-slate-600 hover:text-accent dark:text-slate-300">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
