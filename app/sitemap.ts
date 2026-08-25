import type { MetadataRoute } from "next";
import { site } from "@/config/content";
import { getJournalPosts } from "@/lib/posts";

/**
 * Served at /sitemap.xml. Submitting it in Search Console is the quickest way
 * to get a page re-crawled after its content changes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getJournalPosts();

  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/film`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/photography`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/journal`, changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${site.url}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
