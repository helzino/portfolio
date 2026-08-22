import Link from "next/link";
import { site } from "@/config/content";
import { FilmList } from "@/components/work/FilmList";

export function FilmPreview() {
  return (
    <section className="film-section" aria-labelledby="film-preview-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="film-preview-title" className="meta">
            Film &amp; TV
          </h2>
          <Link href="/film" className="meta meta-dim link-underline">
            All projects
          </Link>
        </div>

        <FilmList films={site.films.slice(0, 3)} />
      </div>
    </section>
  );
}
