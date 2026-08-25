import { site } from "@/config/content";
import { HorizontalGallery } from "@/components/media/HorizontalGallery";

export function SelectedPhotography() {
  // A taster on the home page, not the whole set: the rest is on /photography.
  const photos = site.photos.slice(0, 5);
  const categories = new Set(site.photos.map((photo) => photo.category));

  return (
    <section className="selected" aria-labelledby="selected-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="selected-title" className="meta">
            Selected photography
          </h2>
          <p className="meta meta-dim">
            {categories.size === 1
              ? [...categories][0]
              : [...categories].join(" · ")}
          </p>
        </div>
      </div>

      <HorizontalGallery photos={photos} />
    </section>
  );
}
