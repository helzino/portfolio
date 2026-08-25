import type { MetadataRoute } from "next";
import { site } from "@/config/content";

/** Served at /robots.txt, and points crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
