import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/api";
import { MonogramTile } from "@/lib/brand";

// Link preview shown when the site is shared (LinkedIn, WhatsApp, Slack, X…).
// Built from the same API data as the page and refreshed on the same schedule.
export const alt = "Anshul Akotkar — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 300;

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export default async function OpengraphImage() {
  const [profile, medium, extraBold] = await Promise.all([
    getProfile(),
    font("inter-latin-500-normal.woff"),
    font("inter-latin-800-normal.woff"),
  ]);
  const { currentRole } = profile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#070a13",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.45), transparent 55%), radial-gradient(circle at 100% 35%, rgba(34,211,238,0.2), transparent 50%)",
          color: "#eef1f8",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <MonogramTile size={64} radius={16} />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "#8e97ad" }}>
            {currentRole.title} · {currentRole.company} · {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: "#a5b4fc", maxWidth: 980, lineHeight: 1.3 }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {profile.highlights.slice(0, 3).map((h) => (
            <div
              key={h.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                width: 330,
                padding: "20px 24px",
                borderRadius: 20,
                border: "1px solid #232b45",
                backgroundColor: "rgba(14,19,34,0.8)",
              }}
            >
              <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>{h.value}</div>
              <div style={{ display: "flex", fontSize: 18, fontWeight: 500, color: "#8e97ad" }}>{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Inter", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
