import Link from "next/link";
import { site } from "@/config/content";
import { NAV_LINKS } from "@/config/nav";
import { LocalTime } from "@/components/chrome/LocalTime";
import { MaskText } from "@/components/media/MaskText";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <hr className="rule" />

        <div className="footer-top">
          <span className="meta meta-dim">Get in touch</span>
          <span className="meta meta-dim">{site.availability}</span>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="footer-mail"
          data-cursor="write"
          data-cursor-label="Email"
        >
          <MaskText
            className="display display-lg"
            lines={[site.email]}
            stagger={0}
          />
        </a>

        <div className="footer-grid grid-12">
          <div className="footer-col">
            <span className="meta meta-dim">Index</span>
            <ul className="footer-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <span className="meta meta-dim">Elsewhere</span>
            <ul className="footer-list">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                    data-cursor="open"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col-wide">
            <span className="meta meta-dim">Based</span>
            <p className="footer-place">
              {site.location}
              <br />
              <span className="meta meta-dim">
                Local time <LocalTime />
              </span>
            </p>
          </div>
        </div>

        <div className="footer-base">
          <span className="meta meta-dim">
            © {year} {site.name}
          </span>
          <span className="meta meta-dim">All photography by {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
