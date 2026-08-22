import { site } from "@/config/content";
import { HorizontalGallery } from "@/components/media/HorizontalGallery";

export function SelectedPhotography() {
  const places = new Set(site.photos.map((photo) => photo.location).filter(Boolean));

  return (
    <section className="selected" aria-labelledby="selected-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="selected-title" className="meta">
            Selected photography
          </h2>
          <p className="meta meta-dim">
            {site.photos.length} frames · {places.size} places
          </p>
        </div>
      </div>

      <HorizontalGallery photos={site.photos} />
    </section>
  );
}
