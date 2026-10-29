import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

// XML sitemap for search engines: core pages plus every blog article
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/about", "/blog", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const articles = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...articles];
}
