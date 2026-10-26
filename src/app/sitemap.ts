import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { featureHref, features } from "@/content/features";
import { guides, tools } from "@/content/knowledge";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/funktionen"), changeFrequency: "monthly", priority: 0.8 },
    ...features.map((f) => ({ url: url(featureHref(f.slug)), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: url("/preise"), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Wissensbereiche erst aufnehmen, wenn sie Inhalte haben (sonst noindex).
  if (guides.length + tools.length > 0) pages.push({ url: url("/wissen"), changeFrequency: "weekly", priority: 0.6 });
  if (guides.length > 0) {
    pages.push({ url: url("/wissen/ratgeber"), changeFrequency: "weekly", priority: 0.6 });
    pages.push(
      ...guides.map((g) => ({ url: url(`/wissen/ratgeber/${g.slug}`), lastModified: g.updatedAt, priority: 0.6 })),
    );
  }
  if (tools.length > 0) {
    pages.push({ url: url("/wissen/rechner-vorlagen"), changeFrequency: "weekly", priority: 0.6 });
    pages.push(
      ...tools.map((t) => ({
        url: url(`/wissen/rechner-vorlagen/${t.slug}`),
        lastModified: t.updatedAt,
        priority: 0.6,
      })),
    );
  }
  return pages;
}
