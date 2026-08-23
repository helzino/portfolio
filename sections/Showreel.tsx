import { site } from "@/config/content";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { MaskText } from "@/components/media/MaskText";
import { Reveal } from "@/components/media/Reveal";
import { parseVideoUrl } from "@/lib/video";

/**
 * The showreel, directly beneath the hero: the first thing after the fold and
 * the strongest proof of the work. Renders nothing at all until a video is
 * configured, so an unset reel leaves no gap in the page.
 */
export function Showreel() {
  const source = parseVideoUrl(site.showreel.url);
  if (!source) return null;

  return (
    <section className="showreel" aria-labelledby="showreel-title">
      <div className="shell">
        <hr className="rule" />
        <div className="section-head">
          <h2 id="showreel-title" className="meta">
            {site.showreel.eyebrow}
          </h2>
          <p className="meta meta-dim">{site.showreel.caption}</p>
        </div>

        <p className="display display-lg showreel-title">
          <MaskText lines={[site.showreel.title]} />
        </p>
      </div>

      <Reveal className="showreel-media" delay={80}>
        <VideoEmbed
          source={source}
          poster={site.showreel.poster}
          title={site.showreel.title}
        />
      </Reveal>
    </section>
  );
}
