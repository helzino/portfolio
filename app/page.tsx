import { Hero } from "@/sections/Hero";
import { Showreel } from "@/sections/Showreel";
import { Disciplines } from "@/sections/Disciplines";
import { SelectedPhotography } from "@/sections/SelectedPhotography";
import { AboutPreview } from "@/sections/AboutPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Showreel />
      <Disciplines />
      <SelectedPhotography />
      <AboutPreview />
    </>
  );
}
