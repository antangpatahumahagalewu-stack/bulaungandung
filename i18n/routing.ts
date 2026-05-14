import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["id", "en", "zh", "ja"],
  defaultLocale: "id",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/tentang": {
      id: "/tentang",
      en: "/about",
      zh: "/tentang",
      ja: "/tentang",
    },
    "/produk": {
      id: "/produk",
      en: "/product",
      zh: "/produk",
      ja: "/produk",
    },
    "/kelompok": {
      id: "/kelompok",
      en: "/groups",
      zh: "/kelompok",
      ja: "/kelompok",
    },
    "/cerita": {
      id: "/cerita",
      en: "/stories",
      zh: "/cerita",
      ja: "/cerita",
    },
    "/kegiatan": {
      id: "/kegiatan",
      en: "/activities",
      zh: "/kegiatan",
      ja: "/kegiatan",
    },
    "/kontak": {
      id: "/kontak",
      en: "/contact",
      zh: "/kontak",
      ja: "/kontak",
    },
    "/mitra": {
      id: "/mitra",
      en: "/partners",
      zh: "/mitra",
      ja: "/mitra",
    },
    "/produk/[slug]": {
      id: "/produk/[slug]",
      en: "/product/[slug]",
      zh: "/produk/[slug]",
      ja: "/produk/[slug]",
    },
    "/cerita/[slug]": {
      id: "/cerita/[slug]",
      en: "/stories/[slug]",
      zh: "/cerita/[slug]",
      ja: "/cerita/[slug]",
    },
    "/kegiatan/[slug]": {
      id: "/kegiatan/[slug]",
      en: "/activities/[slug]",
      zh: "/kegiatan/[slug]",
      ja: "/kegiatan/[slug]",
    },
    "/kelompok/[slug]": {
      id: "/kelompok/[slug]",
      en: "/groups/[slug]",
      zh: "/kelompok/[slug]",
      ja: "/kelompok/[slug]",
    },
    "/kebijakan-privasi": {
      id: "/kebijakan-privasi",
      en: "/privacy-policy",
      zh: "/kebijakan-privasi",
      ja: "/kebijakan-privasi",
    },
    "/syarat-ketentuan": {
      id: "/syarat-ketentuan",
      en: "/terms-conditions",
      zh: "/syarat-ketentuan",
      ja: "/syarat-ketentuan",
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
