import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/media/Frame";
import { orientationOf } from "@/lib/media";
import { MaskText } from "@/components/media/MaskText";
import { formatPostDate, getJournalPost, getJournalPosts } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    alternates: { canonical: `/journal/${slug}` },
    description: post.preview,
    openGraph: {
      title: post.title,
      description: post.preview,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function JournalEntryPage({ params }: Params) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  const portrait = orientationOf(post.image) === "portrait";

  return (
    <article className="note">
      <header className="shell note-head">
        <p className="meta meta-dim">{formatPostDate(post.date)}</p>
        <h1 className="display display-lg note-title">
          <MaskText lines={[post.title]} />
        </h1>
        <p className="lede note-tagline">{post.tagline}</p>
      </header>

      {post.image && (
        // A tall frame is not cropped to a letterbox and blown across the full
        // width: it keeps its shape and sits at a size it actually has pixels for.
        <div className="note-media" data-portrait={portrait}>
          <Frame
            src={post.image}
            alt=""
            ratio={portrait ? 4 / 5 : 16 / 9}
            sizes={portrait ? "(max-width: 900px) 90vw, 34rem" : "100vw"}
            priority
          />
        </div>
      )}

      <div
        className="shell note-body markdown"
        dangerouslySetInnerHTML={{ __html: post.html ?? "" }}
      />

      <nav className="shell note-foot">
        <hr className="rule" />
        <Link href="/journal" className="meta link-underline">
          All notes
        </Link>
      </nav>
    </article>
  );
}
