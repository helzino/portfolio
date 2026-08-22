import { MaskText } from "@/components/media/MaskText";
import { Reveal } from "@/components/media/Reveal";

/**
 * The shared opening block for interior pages: eyebrow, oversized title,
 * a single line of orientation, and a strip of hard facts.
 */
export function PageIntro({
  eyebrow,
  title,
  lede,
  meta = [],
}: {
  eyebrow: string;
  title: string[];
  lede: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="page-intro shell">
      <p className="meta meta-dim page-intro-eyebrow">{eyebrow}</p>

      <h1 className="display display-xl page-intro-title">
        <MaskText lines={title} stagger={100} />
      </h1>

      <div className="page-intro-foot grid-12">
        <Reveal className="page-intro-lede-wrap" delay={120}>
          <p className="lede page-intro-lede">{lede}</p>
        </Reveal>

        {meta.length > 0 && (
          <Reveal className="page-intro-meta" delay={220}>
            <dl className="page-intro-facts">
              {meta.map((fact) => (
                <div key={fact.label} className="page-intro-fact">
                  <dt className="meta meta-dim">{fact.label}</dt>
                  <dd className="meta">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </header>
  );
}
