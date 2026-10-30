import type { MetadataRoute } from "next";
import { SITE_URL } from "./config";

// lastModified meniť len pri skutočnej zmene obsahu stránky.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: "2026-10-30" },
    { url: `${SITE_URL}/ochrana-osobnych-udajov`, lastModified: "2026-10-29" },
  ];
}
