import type { MetadataRoute } from "next";
import { members } from "@/lib/data/members";
import { products } from "@/lib/data/products";
import { stories } from "@/lib/data/stories";
import { activities } from "@/lib/data/site";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const locales = ["id", "en", "zh", "ja"];

const pathnames: Record<string, Record<string, string>> = {
  "/": { id: "/", en: "/", zh: "/", ja: "/" },
  "/tentang": { id: "/tentang", en: "/about", zh: "/tentang", ja: "/tentang" },
  "/kelompok": { id: "/kelompok", en: "/groups", zh: "/kelompok", ja: "/kelompok" },
  "/produk": { id: "/produk", en: "/product", zh: "/produk", ja: "/produk" },
  "/cerita": { id: "/cerita", en: "/stories", zh: "/cerita", ja: "/cerita" },
  "/kegiatan": { id: "/kegiatan", en: "/activities", zh: "/kegiatan", ja: "/kegiatan" },
  "/mitra": { id: "/mitra", en: "/partners", zh: "/mitra", ja: "/mitra" },
  "/kontak": { id: "/kontak", en: "/contact", zh: "/kontak", ja: "/kontak" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const [internalPath, localePaths] of Object.entries(pathnames)) {
      const externalPath = localePaths[locale];
      entries.push({
        url: `${BASE_URL}/${locale}${externalPath === "/" ? "" : externalPath}`,
        lastModified: new Date(),
        changeFrequency: internalPath === "/" ? "daily" : "weekly",
        priority: internalPath === "/" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${BASE_URL}/${l}${localePaths[l] === "/" ? "" : localePaths[l]}`,
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
