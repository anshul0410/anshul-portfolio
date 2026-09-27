// The "AA" monogram, drawn as paths so it never depends on a font being
// available. Shared by the favicon, the Apple touch icon and the link preview.

export const BRAND_GRADIENT = "linear-gradient(135deg, #6366f1, #22d3ee)";

// One "A" in a 32×32 box, starting at x: outer shape plus the triangular counter.
const letterA = (x: number) =>
  `M${x} 22 L${x + 3.3} 10 L${x + 5.7} 10 L${x + 9} 22 L${x + 6.6} 22 L${x + 5.95} 19.6 L${x + 3.05} 19.6 L${x + 2.4} 22 Z ` +
  `M${x + 3.75} 17.3 L${x + 4.5} 14.4 L${x + 5.25} 17.3 Z`;

export const MONOGRAM_PATH = `${letterA(6.25)} ${letterA(16.75)}`;

/** The white letters only; place on a gradient tile. */
export function MonogramLetters({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d={MONOGRAM_PATH} fill="#eef1f8" fillRule="evenodd" />
    </svg>
  );
}

/** Gradient tile with the monogram, for ImageResponse (Satori) images. */
export function MonogramTile({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundImage: BRAND_GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MonogramLetters size={size} />
    </div>
  );
}
