import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/config/content";
import { PhotoGrid } from "@/components/photography/PhotoGrid";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Photography",
  description: `Wildlife, landscape and travel photography by ${site.name}.`,
  alternates: { canonical: "/photography" },
};

export default function PhotographyPage() {
  return (
    <>
      <PageIntro
        eyebrow="02 / Photography"
        title={["Photography"]}
        lede="Wildlife, landscapes and the people met along the way, shot on location, on set and at events."
        meta={[{ label: "Kit", value: "Sony A7 IV · DJI Mavic 2 Zoom" }]}
      />

      <Suspense fallback={null}>
        <PhotoGrid photos={site.photos} />
      </Suspense>
    </>
  );
}
