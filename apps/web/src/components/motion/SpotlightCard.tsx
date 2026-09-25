"use client";

/** A card with a soft accent spotlight that follows the pointer on hover. */
export function SpotlightCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`spotlight ${className}`}
      style={style}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}
