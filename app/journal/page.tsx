import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/media/Reveal";
import { PageIntro } from "@/components/ui/PageIntro";
import { formatPostDate, getJournalPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the field, the edit and the research desk.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <>
      <PageIntro
        eyebrow="04 / Journal"
        title={["Journal"]}
        lede="Notes from the field, the edit and the research desk."
        meta={[{ label: "Notes", value: String(posts.length) }]}
      />

      <section className="shell journal-index" aria-label="Journal entries">
        <ul className="journal-list">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 70}>
                <Link href={`/journal/${post.slug}`} className="journal-entry group" data-cursor="read">
                  <div className="journal-entry-body">
                    <span className="meta meta-dim">{formatPostDate(post.date)}</span>
                    <h2 className="display display-md">{post.title}</h2>
                    <p className="meta meta-dim">{post.tagline}</p>
                    <p className="body journal-entry-preview">{post.preview}</p>
                    <span className="meta journal-entry-cta">Read</span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
