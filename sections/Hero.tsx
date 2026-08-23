import Link from "next/link";
import { site } from "@/config/content";
import { Frame } from "@/components/media/Frame";
import { MaskText } from "@/components/media/MaskText";
import { LazyHeroCanvas } from "@/components/webgl/LazyHeroCanvas";
import { ScrollCue } from "@/components/ui/ScrollCue";

/**
 * The opening frame: one photograph at full bleed, the name at the size it
 * deserves, and the two disciplines offered as the first thing you can act on.
 */
export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-media">
        {/* Still image carries the LCP; the shader fades in on top of it. */}
        <Frame
          src={site.heroImage}
          alt=""
          ratio="auto"
          sizes="100vw"
          priority
          zoom={false}
          className="hero-still"
        />
        <LazyHeroCanvas src={site.heroImage} />
        <div className="hero-scrim" aria-hidden />
      </div>

      <div className="hero-content shell">
        <div className="hero-top">
          <p className="meta hero-tagline">{site.tagline}</p>
        </div>

        <div className="hero-bottom grid-12">
          <div className="hero-name">
            <p className="meta meta-dim hero-role">
              {site.role}
              <span className="hero-role-place"> · {site.location}</span>
            </p>
            <h1 className="display display-xl">
              <MaskText lines={site.heroHeadline} delay={120} stagger={110} />
            </h1>
          </div>

          <nav className="hero-routes" aria-label="Disciplines">
            <Link href="/film" className="hero-route" data-cursor="enter">
              <span className="display display-sm">Film &amp; TV</span>
              <span className="meta meta-dim">Researching · Camera · Aerial</span>
            </Link>
            <Link href="/photography" className="hero-route" data-cursor="enter">
              <span className="display display-sm">Photography</span>
              <span className="meta meta-dim">Wildlife · Travel · Portrait</span>
            </Link>
          </nav>
        </div>

        <ScrollCue />
      </div>
    </section>
  );
}
