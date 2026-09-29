import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { Nav } from "@/components/Nav";
import { Eyebrow } from "@/components/ui";
import { getProfile } from "@/lib/api";
import { formatPostDate, getPosts } from "@/lib/blog";

export const revalidate = 300;

const DESCRIPTION =
  "Articles by Anshul Akotkar on building web platforms that hold up under load: frontend performance, scaling, reliability and AI agents.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title: "Blog · Anshul Akotkar", description: DESCRIPTION, url: "/blog", type: "website" },
};

export default async function BlogIndex() {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);

  return (
    <>
      <Nav name={profile.name} />
      <main className="container-page py-16 sm:py-24">
        <Reveal className="max-w-3xl space-y-4">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-fg sm:text-5xl sm:leading-[1.1]">
            Notes on building for scale
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Lessons from shipping web platforms that hold up under load: frontend performance, scaling, reliability and
            AI agents. <a href="/feed.xml" className="text-accent-soft underline underline-offset-4 hover:text-fg">RSS feed</a>
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-14 text-muted">The first article is on its way.</p>
        ) : (
          <ul className="mt-14 space-y-5">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-3xl border border-line bg-surface/70 p-6 transition hover:border-accent/50 sm:p-8"
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} min read</span>
                      {post.draft && (
                        <span className="rounded-full border border-amber-400/50 px-2 py-0.5 text-amber-300">Draft</span>
                      )}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-fg transition group-hover:text-accent-soft">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-3xl leading-relaxed text-muted">{post.description}</p>
                    {post.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li key={tag} className="rounded-full border border-line bg-raised px-3 py-1 text-xs text-muted">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </main>
      <Footer profile={profile} />
    </>
  );
}
