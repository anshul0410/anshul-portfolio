import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/api";
import { MonogramTile } from "@/lib/brand";
import { OG_BACKGROUND, OG_SIZE, ogFonts } from "@/lib/og";

// Link preview shown when the site is shared (LinkedIn, WhatsApp, Slack, X…).
// Built from the same API data as the page and refreshed on the same schedule.
export const alt = "Anshul Akotkar — Senior Software Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 300;

export default async function OpengraphImage() {
  const [profile, fonts] = await Promise.all([getProfile(), ogFonts()]);
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
          ...OG_BACKGROUND,
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
    { ...size, fonts },
  );
}
