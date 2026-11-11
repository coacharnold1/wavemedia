import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { portfolioItems } from "@/lib/portfolio";

const staticRoutes = [
  "",
  "/cinematography",
  "/photography",
  "/services",
  "/about",
  "/contact",
  "/booking",
  "/academy",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...portfolioItems.map((item) => ({ url: `${siteConfig.url}/work/${item.slug}` })),
  ];
}
