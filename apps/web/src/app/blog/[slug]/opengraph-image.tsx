import { ImageResponse } from "next/og";
import { getPost, getPosts, formatPostDate } from "@/lib/blog";
import { MonogramTile } from "@/lib/brand";
import { OG_BACKGROUND, OG_SIZE, ogFonts } from "@/lib/og";

// Per-article link preview: title, date and reading time on the site's background.
export const alt = "Article by Anshul Akotkar";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, fonts] = await Promise.all([getPost(slug), ogFonts()]);
  const title = post?.title ?? "Anshul Akotkar — Blog";

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
          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#a5b4fc" }}>Anshul Akotkar · Blog</div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 60 : 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 24, fontWeight: 500, color: "#8e97ad" }}>
          {post && <span>{formatPostDate(post.date)}</span>}
          {post && <span>·</span>}
          {post && <span>{post.readingMinutes} min read</span>}
          <span style={{ marginLeft: "auto" }}>anshulakotkar.is-a.dev</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
