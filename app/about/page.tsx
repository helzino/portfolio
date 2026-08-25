import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/content";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { Parallax } from "@/components/media/Parallax";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "About",
  description: site.about.intro,
};

export default function AboutPage() {
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

      <section className="about-portrait" aria-hidden>
        <Parallax speed={0.05}>
          <Frame
            src={site.about.portrait}
            alt=""
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

      <section className="shell about-cta">
        <hr className="rule" />
        <div className="about-cta-row">
          <p className="lede about-cta-line">Got a project in mind? Say hello!</p>
          <Link href="/#showreel" className="meta link-underline">
            My showreel
          </Link>
        </div>
      </section>
    </>
  );
}
