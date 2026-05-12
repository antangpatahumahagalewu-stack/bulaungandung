import type { MetadataRoute } from "next";
import { members } from "@/lib/data/members";
import { products } from "@/lib/data/products";
import { stories } from "@/lib/data/stories";
import { activities } from "@/lib/data/site";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const locales = ["id", "en", "zh", "ja"];

const staticPages = [
  "/",
  "/tentang",
  "/kelompok",
  "/produk",
  "/cerita",
  "/kegiatan",
  "/mitra",
  "/kontak",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page === "/" ? "" : page}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "daily" : "weekly",
        priority: page === "/" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${BASE_URL}/${l}${page === "/" ? "" : page}`,
            ])
          ),
        },
      });
    }

    for (const member of members) {
      entries.push({
        url: `${BASE_URL}/${locale}/kelompok/${member.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/produk/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }

    for (const story of stories) {
      entries.push({
        url: `${BASE_URL}/${locale}/cerita/${story.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }

    for (const activity of activities) {
      entries.push({
        url: `${BASE_URL}/${locale}/kegiatan/${activity.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
