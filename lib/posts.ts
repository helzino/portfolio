import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "_posts");

export interface JournalPost {
  slug: string;
  title: string;
  tagline: string;
  preview: string;
  image: string;
  date: string;
  html?: string;
}

async function readPost(file: string): Promise<JournalPost> {
  const slug = file.replace(/\.md$/, "");
  const raw = await readFile(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: String(data.title ?? slug),
    tagline: String(data.tagline ?? ""),
    preview: String(data.preview ?? ""),
    image: String(data.image ?? ""),
    date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
    html: processed.toString(),
  };
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(files.map(readPost));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  const posts = await getJournalPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}
