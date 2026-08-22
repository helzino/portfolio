import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/media/Frame";
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
    description: post.preview,
    openGraph: { title: post.title, description: post.preview, images: [post.image] },
  };
}

export default async function JournalEntryPage({ params }: Params) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="note">
      <header className="shell note-head">
        <p className="meta meta-dim">{formatPostDate(post.date)}</p>
        <h1 className="display display-lg note-title">
          <MaskText lines={[post.title]} />
        </h1>
        <p className="lede note-tagline">{post.tagline}</p>
      </header>

      <div className="note-media">
        <Frame src={post.image} alt="" ratio={16 / 9} sizes="100vw" priority />
      </div>

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
