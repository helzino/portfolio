import Link from "next/link";
import { Frame } from "@/components/media/Frame";
import { formatPostDate, type JournalPost } from "@/lib/posts";

export function JournalPreview({ posts }: { posts: JournalPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="journal-preview" aria-labelledby="journal-preview-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="journal-preview-title" className="meta">
            Journal
          </h2>
          <Link href="/journal" className="meta meta-dim link-underline">
            All notes
          </Link>
        </div>

        <ul className="journal-rows">
          {posts.slice(0, 2).map((post) => (
            <li key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="journal-row group" data-cursor="read">
                {post.image && (
                  <div className="journal-row-media">
                    <Frame
                      src={post.image}
                      alt=""
                      ratio={16 / 10}
                      sizes="(max-width: 900px) 90vw, 30vw"
                    />
                  </div>
                )}
                <div className="journal-row-body">
                  <span className="meta meta-dim">{formatPostDate(post.date)}</span>
                  <h3 className="display display-sm">{post.title}</h3>
                  <p className="body journal-row-preview">{post.preview}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
