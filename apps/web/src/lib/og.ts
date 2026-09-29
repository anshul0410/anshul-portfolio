import { readFile } from "node:fs/promises";
import { join } from "node:path";

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/** Inter 500/800 for ImageResponse (link preview) images. */
export async function ogFonts() {
  const [medium, extraBold] = await Promise.all([font("inter-latin-500-normal.woff"), font("inter-latin-800-normal.woff")]);
  return [
    { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: extraBold, weight: 800 as const, style: "normal" as const },
  ];
}

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_BACKGROUND = {
  backgroundColor: "#070a13",
  backgroundImage:
    "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.45), transparent 55%), radial-gradient(circle at 100% 35%, rgba(34,211,238,0.2), transparent 50%)",
};
