import Link from "next/link";
import { site } from "@/config/content";
import { Frame } from "@/components/media/Frame";
import { Parallax } from "@/components/media/Parallax";
import { MaskText } from "@/components/media/MaskText";
import { Reveal } from "@/components/media/Reveal";

/** A pull quote against a portrait — the story, not the CV. */
export function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="about-preview-title" className="meta">
            About
          </h2>
          <p className="meta meta-dim">Zoologist · {site.location}</p>
        </div>
      </div>

      <div className="about-preview-body shell grid-12">
        <div className="about-preview-media">
          <Parallax speed={0.08}>
            <Frame
              src={site.about.previewImage}
              alt=""
              ratio={4 / 5}
              sizes="(max-width: 900px) 88vw, 38vw"
            />
          </Parallax>
        </div>

        <div className="about-preview-quote">
          <MaskText className="display display-md" lines={[site.about.intro]} />
          <Reveal delay={180}>
            <p className="body about-preview-intro">{site.about.body[0]}</p>
            <Link href="/about" className="meta link-underline about-preview-link">
              Read the full story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
