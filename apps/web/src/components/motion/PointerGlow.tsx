"use client";

import { useEffect, useRef } from "react";

/** A blurred glow that eases toward the pointer inside its positioned parent. */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    let target = { x: parent.clientWidth * 0.3, y: parent.clientHeight * 0.3 };
    const pos = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      target = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.transform = `translate3d(${pos.x - 260}px, ${pos.y - 200}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    parent.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 hidden h-[400px] w-[520px] rounded-full bg-accent/20 blur-[120px] md:block"
    />
  );
}
