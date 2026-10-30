import type { MetadataRoute } from "next";
import { SITE_URL } from "./config";

// Všetci roboti vrátane AI vyhľadávačov aj tréningových robotov (rozhodnutie 30. 10. 2026).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
