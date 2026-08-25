import type { Metadata } from "next";
import { site } from "@/config/content";
import { FilmList } from "@/components/work/FilmList";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/media/Reveal";

export const metadata: Metadata = {
  title: "Film & TV",
  description: `Film and television work by ${site.name}: research, camera, aerial and edit.`,
  alternates: { canonical: "/film" },
};

export default function FilmPage() {
  return (
    <>
      <PageIntro
        eyebrow="01 / Film & TV"
        title={["Film", "& TV"]}
        lede="Research, camera (non broadcast), aerial and digital edit for documentary film and tv."
        meta={[
          { label: "Projects", value: String(site.films.length) },
          { label: "Roles", value: "Researcher · Camera Assistant · Drone Pilot" },
          { label: "Based", value: site.location },
        ]}
      />

      <section className="shell film-index" aria-label="Film and television projects">
        <FilmList films={site.films} />
      </section>

      <section className="shell capability-section" aria-labelledby="capability-title">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="capability-title" className="meta">
            Capabilities
          </h2>
          <p className="meta meta-dim">What I bring to a production</p>
        </div>

        <ul className="capability-grid">
          {site.capabilities
            .filter((capability) => !capability.aboutOnly)
            .map((capability, index) => (
              <li key={capability.title}>
                <Reveal delay={index * 60}>
                  <span className="meta meta-dim numeral">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display display-sm capability-title">
                    {capability.title}
                  </h3>
                  <p className="body capability-body">{capability.description}</p>
                </Reveal>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
