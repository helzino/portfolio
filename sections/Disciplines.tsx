import Link from "next/link";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { Parallax } from "@/components/media/Parallax";

/**
 * The split. Two panels, equal weight, no ambiguity about what the studio
 * offers — moving image on one side, stills on the other.
 */
const PANELS = [
  {
    href: "/film",
    index: "01",
    title: "Film & TV",
    line: "Research, camera (non-broadcast), aerial and digital editing for documentary film and TV.",
    keywords: ["XO Rental", "National Geographic", "Plimsoll Productions"],
    cover: "/images/national-geographic.jpg",
  },
  {
    href: "/photography",
    index: "02",
    title: "Photography",
    line: "Wildlife, landscapes and the people met along the way, shot on location, on set and at events.",
    keywords: ["Nature", "Events", "People"],
    cover: "/images/butterfly.jpg",
  },
] as const;

export function Disciplines() {
  return (
    <section className="disciplines" aria-labelledby="disciplines-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="disciplines-title" className="meta">
            What I do
          </h2>
          <p className="meta meta-dim">Two disciplines, one way of looking</p>
        </div>
      </div>

      <div className="discipline-list">
        {PANELS.map((panel) => (
          <Link key={panel.href} href={panel.href} className="discipline group" data-cursor="enter">
            <div className="discipline-media">
              <Parallax speed={0.06}>
                <Frame
                  src={panel.cover}
                  alt=""
                  ratio={4 / 5}
                  sizes="(max-width: 900px) 90vw, 34vw"
                />
              </Parallax>
            </div>

            <div className="discipline-body">
              <Reveal>
                <span className="meta meta-dim numeral">{panel.index}</span>
                <h3 className="display display-lg discipline-title">{panel.title}</h3>
                <p className="body discipline-line">{panel.line}</p>
                <ul className="discipline-keywords">
                  {panel.keywords.map((keyword) => (
                    <li key={keyword} className="meta meta-dim">
                      {keyword}
                    </li>
                  ))}
                </ul>
                <span className="discipline-cta meta">
                  More details
                  <span className="discipline-arrow" aria-hidden>
                    →
                  </span>
                </span>
              </Reveal>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
