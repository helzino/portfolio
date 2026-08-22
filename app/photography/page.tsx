import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/config/content";
import { PhotoGrid } from "@/components/photography/PhotoGrid";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Photography",
  description: `Wildlife, landscape and travel photography by ${site.name}.`,
};

export default function PhotographyPage() {
  const countries = new Set(site.photos.map((photo) => photo.location).filter(Boolean));

  return (
    <>
      <PageIntro
        eyebrow="02 / Photography"
        title={["Photography"]}
        lede="Wildlife, landscape and the people met along the way. Shot on location, exhibited in print."
        meta={[
          { label: "Frames", value: String(site.photos.length) },
          { label: "Places", value: String(countries.size) },
          { label: "Kit", value: "Sony A7 IV · Drone · Underwater" },
        ]}
      />

      <Suspense fallback={null}>
        <PhotoGrid photos={site.photos} />
      </Suspense>
    </>
  );
}
