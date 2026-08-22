import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filmBySlug, filmNeighbours, site } from "@/config/content";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { Parallax } from "@/components/media/Parallax";
import { MaskText } from "@/components/media/MaskText";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.films.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) return {};
  return {
    title: film.title,
    description: film.description,
    openGraph: { title: film.title, description: film.description, images: [film.poster] },
  };
}

export default async function FilmProjectPage({ params }: Params) {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) notFound();

  const neighbours = filmNeighbours(slug);

  return (
    <article className="project">
      <header className="project-hero">
        <Frame
          src={film.poster}
          alt={film.title}
          ratio="auto"
          sizes="100vw"
          priority
          zoom={false}
          className="project-hero-media"
        />
        <div className="project-hero-scrim" aria-hidden />

        <div className="project-hero-content shell">
          <p className="meta meta-dim">{film.format}</p>
          <h1 className="display display-lg">
            <MaskText lines={[film.title]} />
          </h1>
        </div>
      </header>

      <div className="shell">
        <dl className="project-facts grid-12">
          <div className="project-fact">
            <dt className="meta meta-dim">Role</dt>
            <dd>{film.role}</dd>
          </div>
          <div className="project-fact">
            <dt className="meta meta-dim">Year</dt>
            <dd className="numeral">{film.year}</dd>
          </div>
          <div className="project-fact">
            <dt className="meta meta-dim">Format</dt>
            <dd>{film.format}</dd>
          </div>
          {film.link && (
            <div className="project-fact">
              <dt className="meta meta-dim">Link</dt>
              <dd>
                <a
                  href={film.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                  data-cursor="open"
                >
                  Watch / read
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="project-body grid-12">
          <Reveal className="project-lede-wrap">
            <p className="lede project-lede">{film.description}</p>
          </Reveal>

          <Reveal className="project-narrative" delay={120}>
            {film.body.map((paragraph) => (
              <p key={paragraph} className="body">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      {film.stills.length > 0 && (
        <section className="project-stills" aria-label="Stills">
          {film.stills.map((still, index) => (
            <figure key={still} className="project-still" data-index={index % 2}>
              <Parallax speed={index % 2 === 0 ? 0.05 : 0.09}>
                <Frame
                  src={still}
                  alt={`${film.title}, still ${index + 1}`}
                  sizes="(max-width: 900px) 92vw, 60vw"
                />
              </Parallax>
            </figure>
          ))}
        </section>
      )}

      {neighbours && (
        <nav className="project-nav shell" aria-label="Project navigation">
          <hr className="rule" />
          <div className="project-nav-row">
            <Link href={`/film/${neighbours.previous.slug}`} className="project-nav-link" data-cursor="prev">
              <span className="meta meta-dim">Previous</span>
              <span className="display display-sm">{neighbours.previous.title}</span>
            </Link>
            <Link href="/film" className="meta link-underline project-nav-index">
              All projects
            </Link>
            <Link href={`/film/${neighbours.next.slug}`} className="project-nav-link project-nav-next" data-cursor="next">
              <span className="meta meta-dim">Next</span>
              <span className="display display-sm">{neighbours.next.title}</span>
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
