import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { site } from "@/config/content";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Cursor } from "@/components/chrome/Cursor";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Preloader } from "@/components/chrome/Preloader";
import { themeScript } from "@/lib/theme";
import "@/styles/globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    images: [{ url: site.heroImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    images: [site.heroImage],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript(site.defaultTheme) }}
        />
        {/* Reveals start hidden and are shown by JS; without it, show them. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.mask-line>span{transform:none}`}</style>
        </noscript>
        <a href="#main" className="sr-only-focusable meta">
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader name={site.name} role={site.role} />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
