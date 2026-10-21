import type { MetadataRoute } from "next";
import { blog, botSource, devSource } from "@/lib/sourcer";
import { absoluteUrl } from "@/lib/site";

export const revalidate = false;

const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/plans", priority: 0.9, changeFrequency: "monthly" },
  { path: "/v4", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bot-exclusivo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...botSource.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      changeFrequency: "weekly" as const,
      priority: page.slugs.length === 0 ? 0.9 : 0.8,
    })),
    ...devSource.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blog.getPages().map((post) => ({
      url: absoluteUrl(post.url),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
