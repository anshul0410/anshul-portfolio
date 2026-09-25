"use client";

import { useEffect, useRef } from "react";

/**
 * Fades and lifts its children into view the first time they scroll on screen.
 *
 * Content is visible in the server HTML. Hiding only starts once this effect
 * runs (it sets `data-reveal` on <html>), so a browser whose JavaScript fails
 * or never loads still shows the whole page. Anything already on screen at
 * that moment is marked visible first, so it never blinks out.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) el.dataset.visible = "";
    document.documentElement.dataset.reveal = "";
    if ("visible" in el.dataset) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "";
          observer.disconnect();
        }
      },
      // Start ~15% of a screen early so content is already fading in as it arrives.
      { rootMargin: "0px 0px 15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
