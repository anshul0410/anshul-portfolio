import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MermaidDiagrams } from "@/components/blog/MermaidDiagrams";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getProfile } from "@/lib/api";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/structured-data";

export const revalidate = 300;
// Only the slugs that exist at build time; anything else is a 404.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.tags,
    },
    ...(post.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const [post, profile] = await Promise.all([getPost(slug), getProfile()]);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: profile.name, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Nav name={profile.name} />
      <main className="container-page py-12 sm:py-20">
        <article className="mx-auto max-w-[72ch]">
          <Link href="/blog" className="font-mono text-sm text-muted transition hover:text-fg">
            ← All articles
          </Link>

          {post.draft && (
            <p className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Draft: visible in previews only, not on the live site.
            </p>
          )}

          <header className="mt-8 space-y-5">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-fg sm:text-5xl">{post.title}</h1>
            <p className="text-lg leading-relaxed text-muted">{post.description}</p>
            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line bg-raised px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <hr className="my-10 border-line" />

          {/* Rendered at build time from Markdown in content/blog (repo-owned, not user input). */}
          <div className="article prose max-w-none sm:prose-lg" dangerouslySetInnerHTML={{ __html: post.html }} />

          <hr className="my-12 border-line" />
          <p className="text-muted">
            Written by{" "}
            <Link href="/" className="text-accent-soft underline underline-offset-4 hover:text-fg">
              {profile.name}
            </Link>
            , {profile.title} in {profile.location}.{" "}
            <Link href="/blog" className="text-accent-soft underline underline-offset-4 hover:text-fg">
              More articles →
            </Link>
          </p>
        </article>
      </main>
      {post.hasDiagrams && <MermaidDiagrams />}
      <Footer profile={profile} />
    </>
  );
}
