import { Hero } from "@/sections/Hero";
import { Disciplines } from "@/sections/Disciplines";
import { SelectedPhotography } from "@/sections/SelectedPhotography";
import { FilmPreview } from "@/sections/FilmPreview";
import { AboutPreview } from "@/sections/AboutPreview";
import { JournalPreview } from "@/sections/JournalPreview";
import { getJournalPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getJournalPosts();

  return (
    <>
      <Hero />
      <Disciplines />
      <SelectedPhotography />
      <FilmPreview />
      <AboutPreview />
      <JournalPreview posts={posts} />
    </>
  );
}
