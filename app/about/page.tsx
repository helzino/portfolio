import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/content";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { Parallax } from "@/components/media/Parallax";
import { MaskText } from "@/components/media/MaskText";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "About",
  description: site.about.intro,
};

export default function AboutPage() {
  // A photograph to sit against the quote, never the same frame as the portrait
  // directly above it.
  const quoteImage =
    site.photos.find((photo) => photo.src !== site.about.portrait) ?? site.photos[0];

  return (
    <>
      <PageIntro
        eyebrow="03 / About"
        title={site.name.split(" ")}
        lede={site.about.intro}
        meta={[
          { label: "Based", value: site.location },
          { label: "Discipline", value: site.role },
          { label: "Background", value: "BSc Zoology, University of Bristol" },
        ]}
      />

      <section className="about-portrait" aria-label="Portrait">
        <Parallax speed={0.05}>
          <Frame
            src={site.about.portrait}
            alt={`${site.name} on location`}
            ratio={16 / 9}
            sizes="100vw"
            priority
          />
        </Parallax>
      </section>

      <section className="shell about-story grid-12" aria-labelledby="story-title">
        <h2 id="story-title" className="meta about-story-label">
          The story
        </h2>
        <div className="about-story-body">
          {site.about.body.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 90}>
              <p className={index === 0 ? "lede" : "body"}>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell about-quote grid-12" aria-label="In her words">
        <blockquote className="about-quote-body">
          <MaskText
            className="display display-md"
            lines={[`\u201C${site.about.quote}\u201D`]}
          />
          <footer className="meta meta-dim about-quote-by">{site.name}</footer>
        </blockquote>

        {quoteImage && (
          <figure className="about-quote-media">
            <Parallax speed={0.07}>
              <Frame
                src={quoteImage.src}
                alt={quoteImage.caption || quoteImage.title}
                ratio={4 / 5}
                sizes="(max-width: 900px) 86vw, 30vw"
              />
            </Parallax>
            <figcaption className="meta meta-dim about-quote-caption">
              {[quoteImage.title, quoteImage.location].filter(Boolean).join(" · ")}
            </figcaption>
          </figure>
        )}
      </section>

      <section className="shell about-timeline" aria-labelledby="timeline-title">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="timeline-title" className="meta">
            Path
          </h2>
          <p className="meta meta-dim">Study, crew roles and commissions</p>
        </div>

        <ol className="timeline">
          {site.timeline.map((entry, index) => (
            <li key={`${entry.title}-${entry.period}`}>
              <Reveal delay={index * 60} className="timeline-row">
                <span className="meta meta-dim numeral timeline-period">{entry.period}</span>
                <span className="timeline-main">
                  <span className="display display-sm">{entry.title}</span>
                  <span className="meta meta-dim">{entry.organisation}</span>
                </span>
                <span className="body timeline-detail">{entry.detail}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell about-capabilities" aria-labelledby="about-capability-title">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="about-capability-title" className="meta">
            Capabilities
          </h2>
          <p className="meta meta-dim">What I bring to a production</p>
        </div>

        <ul className="capability-grid">
          {site.capabilities.map((capability, index) => (
            <li key={capability.title}>
              <Reveal delay={index * 50}>
                <span className="meta meta-dim numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display display-sm capability-title">{capability.title}</h3>
                <p className="body capability-body">{capability.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {site.awards.length > 0 && (
        <section className="shell about-awards" aria-labelledby="awards-title">
          <hr className="rule" />
          <div className="section-head">
            <h2 id="awards-title" className="meta">
              Recognition
            </h2>
          </div>

          <ul className="awards">
            {site.awards.map((award) => (
              <li key={award.title} className="award">
                <span className="display display-sm award-title">{award.title}</span>
                <span className="meta meta-dim">{award.detail}</span>
                <span className="meta meta-dim numeral">{award.year}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="shell about-cta">
        <hr className="rule" />
        <div className="about-cta-row">
          <p className="lede about-cta-line">
            Working on something with an animal, a landscape or a scientist in it?
          </p>
          <Link href="/film" className="meta link-underline">
            See the film work
          </Link>
        </div>
      </section>
    </>
  );
}
