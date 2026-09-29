import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Element, Root } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

// Articles are Markdown files in apps/web/content/blog/<slug>.md with front matter.
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** "YYYY-MM-DD" */
  date: string;
  tags: string[];
  /** Drafts are listed and readable in previews and locally, never in production. */
  draft: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
  hasDiagrams: boolean;
}

const SHOW_DRAFTS = process.env.VERCEL_ENV !== "production";

/**
 * Turns ```mermaid code blocks into a placeholder the MermaidDiagrams client
 * component renders in the browser. The source stays in a <pre> as a fallback
 * (and for search engines) if JavaScript never runs.
 */
function rehypeMermaidPlaceholder() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      const code = node.children[0];
      if (!code || code.type !== "element" || code.tagName !== "code") return;
      const classes = (code.properties.className as string[] | undefined) ?? [];
      if (!classes.includes("language-mermaid")) return;
      const source = code.children.map((child) => ("value" in child ? child.value : "")).join("");
      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: { className: ["mermaid-diagram"] },
        // Not a <pre><code>, so the syntax highlighter leaves it alone.
        children: [{ type: "element", tagName: "pre", properties: { className: ["mermaid-source"] }, children: [{ type: "text", value: source }] }],
      };
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeMermaidPlaceholder)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false })
  .use(rehypeStringify);

function readingMinutes(markdown: string) {
  const words = markdown.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function readPostFile(file: string) {
  const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: readingMinutes(content),
  };
  return { meta, content };
}

/** Published posts (plus drafts outside production), newest first. */
export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(files.map(async (file) => (await readPostFile(file)).meta));
  return posts.filter((post) => SHOW_DRAFTS || !post.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const { meta, content } = await readPostFile(`${slug}.md`);
    if (meta.draft && !SHOW_DRAFTS) return null;
    const html = String(await processor.process(content));
    return { ...meta, html, hasDiagrams: html.includes('class="mermaid-diagram"') };
  } catch {
    return null;
  }
}

const longDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
export const formatPostDate = (date: string) => longDate.format(new Date(`${date}T00:00:00Z`));
