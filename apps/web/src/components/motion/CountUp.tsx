"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const NUMBER = /\d+(?:\.\d+)?/g;
const DURATION_MS = 1400;

function render(template: string, progress: number) {
  return template.replace(NUMBER, (n) => {
    const target = Number(n);
    const decimals = n.includes(".") ? n.split(".")[1].length : 0;
    return (target * progress).toFixed(decimals);
  });
}

/**
 * Counts every number in `value` up from zero when it scrolls into view,
 * e.g. "$20–25M" or "50% → 30%". The server renders the final value.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useLayoutEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setText(render(value, 0));
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setText(render(value, 1 - (1 - t) ** 3)); // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
